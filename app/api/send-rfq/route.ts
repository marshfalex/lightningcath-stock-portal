import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pdfBase64, fileName, customerData } = body;

    if (!pdfBase64 || !fileName || !customerData) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email to Amy with the RFQ PDF attached
    const amyEmail = await resend.emails.send({
      from: 'LightningCath Portal <onboarding@resend.dev>',
      to: 'marshfalex@gmail.com', // TODO: Change back to amy.oneil@lightningcath.com when ready for production
      subject: `New RFQ from ${customerData.companyName}`,
      html: `
        <h2>New Request for Quote</h2>
        <p>A new RFQ has been submitted through the LightningCath Stock Portal.</p>

        <h3>Customer Information:</h3>
        <ul>
          <li><strong>Company:</strong> ${customerData.companyName}</li>
          <li><strong>Contact:</strong> ${customerData.contactName}</li>
          <li><strong>Email:</strong> ${customerData.email}</li>
          <li><strong>Phone:</strong> ${customerData.phone}</li>
        </ul>

        ${customerData.projectName ? `<p><strong>Project:</strong> ${customerData.projectName}</p>` : ''}
        ${customerData.quantity ? `<p><strong>Quantity:</strong> ${customerData.quantity}</p>` : ''}

        <p><strong>Materials Requested:</strong> ${customerData.materialCount} item(s)</p>
        <p><strong>Services Required:</strong> ${customerData.serviceCount} service(s)</p>

        <p>Please review the attached PDF for complete details.</p>
      `,
      attachments: [
        {
          filename: fileName,
          content: pdfBase64,
        },
      ],
    });

    // Send confirmation email to customer
    const customerEmail = await resend.emails.send({
      from: 'LightningCath <onboarding@resend.dev>',
      to: customerData.email,
      subject: 'RFQ Received - LightningCath',
      html: `
        <h2>Thank you for your RFQ submission!</h2>
        <p>Dear ${customerData.contactName},</p>

        <p>We have received your Request for Quote for <strong>${customerData.companyName}</strong>.</p>

        <h3>What happens next?</h3>
        <ul>
          <li>Our team will review your requirements</li>
          <li>We will respond within 1-2 business days</li>
          <li>You will receive a detailed quote via email</li>
        </ul>

        <p>Your RFQ details:</p>
        <ul>
          <li><strong>Materials Selected:</strong> ${customerData.materialCount} item(s)</li>
          <li><strong>Services Required:</strong> ${customerData.serviceCount} service(s)</li>
          ${customerData.projectName ? `<li><strong>Project:</strong> ${customerData.projectName}</li>` : ''}
        </ul>

        <p>If you have any questions or need to make changes, please contact us at <a href="mailto:amy.oneil@lightningcath.com">amy.oneil@lightningcath.com</a>.</p>

        <p>Best regards,<br/>
        The LightningCath Team</p>
      `,
      attachments: [
        {
          filename: fileName,
          content: pdfBase64,
        },
      ],
    });

    return NextResponse.json({
      success: true,
      message: 'RFQ sent successfully',
      amyEmailId: amyEmail.data?.id,
      customerEmailId: customerEmail.data?.id,
    });
  } catch (error: any) {
    console.error('Error sending RFQ:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send RFQ' },
      { status: 500 }
    );
  }
}
