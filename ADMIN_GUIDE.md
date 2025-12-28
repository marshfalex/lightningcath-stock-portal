# 📚 LightningCath Admin Panel - User Guide for Amy

Welcome to your new stock management system! This guide will help you get the most out of all the features.

## 🚀 Getting Started

### Accessing the Admin Panel

1. Go to your website and click **"Admin Panel →"** in the header
2. Enter the password: `lightningcath2024`
3. You're in! The password persists for your session (until you close the browser)

### Changing the Password

To change the admin password:
1. Open `/app/admin/page.tsx` in your code editor
2. Find line 7: `const ADMIN_PASSWORD = 'lightningcath2024';`
3. Change to your new password
4. Save the file and redeploy

---

## ✨ Key Features

### 1. 💾 Auto-Save & Live Updates (Your New Best Friend!)

**No more lost work!** Every change you make is automatically saved AND instantly visible to customers!

- ✅ Changes save instantly when you update quantities
- ✅ **Customers see updates immediately** - no PDF upload needed!
- ✅ Data persists even if you close the browser
- ✅ See "✓ Auto-saved to browser" in admin panel
- ✅ See "✓ Live Updates" badge on customer page
- ✅ Works offline - no internet needed!

**How it works:**
1. You update a quantity in the admin panel → Auto-saved to browser storage
2. Customers visit the stock page → They see YOUR latest updates automatically!
3. Updates work on the same computer/device (browser localStorage)

**For multiple devices:**
If you want the same updates on your phone/tablet:
- Export CSV from your computer
- Import CSV on your phone/tablet
- Now both devices have the same data!

---

### 2. 📊 Quick Quantity Updates

The fastest way to update stock:

1. Find the item in the table
2. Click directly on the quantity number
3. Type the new number (or type `Coming Soon!`)
4. Press Enter or click anywhere else
5. Done! Auto-saved immediately

**Pro Tip:** You can update 50 items in under a minute this way!

---

### 3. 📥 Bulk Import from Excel/CSV

Got many items to update? Use CSV import:

**Step 1: Export current data**
- Click **"📊 Export CSV"**
- Opens in Excel/Google Sheets

**Step 2: Update in spreadsheet**
- Change quantities in the "Quantity" column
- Add new items (make sure ID is unique)
- Save as CSV

**Step 3: Import back**
- Click **"📥 Import CSV"**
- Select your updated file
- Done! All changes applied

**What happens:**
- Existing items (matching ID) get updated
- New items (new IDs) get added
- Nothing gets deleted

---

### 4. 📤 Export Options

**CSV Export** (📊 button)
- Best for sharing with others
- Opens in Excel, Google Sheets, etc.
- Easy to email or print
- **Use this weekly** to back up your inventory

**JSON Export** (📄 button)
- Complete technical backup
- Preserves all data perfectly
- Use for archiving

---

### 5. ↶ Undo Button (Your Safety Net)

Made a mistake? No problem!

- Click **"↶ Undo"** button
- Reverts last change instantly
- Keeps your last 10 changes
- Works for everything: edits, deletes, bulk updates

**Example:** "Oops, I deleted the wrong item!" → Click Undo → Item restored!

---

### 6. ✏️ Edit Individual Items

For detailed changes:

1. Click **"Edit"** on any item
2. Form appears with all fields
3. Make your changes
4. Click **"✓ Save"** or **"✕ Cancel"**

**Fields vary by category:**
- **Resin:** Material, description, notes
- **FEP Heat Shrink:** Exp ID, Rec ID, wall thickness, etc.
- **Single Lumen:** ID spec, wall thickness, OD, etc.

---

### 7. ➕ Adding New Items

1. Click **"+ Add New"** button
2. Fill in required fields (marked with *)
   - **ID**: Must be unique (e.g., `resin-037`, `fep-026`, `sle-027`)
   - **Category**: Resin / FEP Heat Shrink / Single Lumen Extrusions
   - **Material Family**: e.g., Pebax, Nylon
   - **Description**: Full product description
3. Fill category-specific fields if needed
4. Click **"✓ Save"**

**ID Naming Convention:**
- `resin-###` for resin products
- `fep-###` for FEP heat shrink
- `sle-###` for single lumen extrusions

---

### 8. 🖨️ Print View

Need a paper copy?

1. Click **"🖨️ Print"** button
2. Browser print dialog opens
3. Print or save as PDF

**What you get:**
- Clean, professional format
- No buttons or edit fields
- Just the stock list
- Perfect for meetings or filing

---

### 9. 🔔 Notifications

You'll see friendly popups for:
- ✅ **Success** (green): "Updated resin-001"
- ❌ **Error** (red): "ID already exists"
- ⚠️ **Warning** (yellow): "Reset to defaults"
- ℹ️ **Info** (blue): "Loaded saved data"

They disappear after 5 seconds, or click **×** to dismiss.

---

### 10. 📈 Live Statistics

Top of the page shows real-time counts:
- 📦 **Total**: All products
- ✅ **In Stock**: Qty > 0
- ⚠️ **Low**: 0 < Qty < 50
- ❌ **Out**: Qty = 0
- 🔜 **Coming**: "Coming Soon!" items

Updates instantly as you make changes!

---

## 🎯 Common Workflows

### Morning Stock Check

```
1. Go to Admin Panel
2. Log in
3. Check statistics at top
4. Update any quantities that changed
5. Export CSV for your records
6. Done! (Everything auto-saved)
```

### Weekly Inventory Update

```
1. Export CSV
2. Open in Excel/Google Sheets
3. Update all quantities
4. Save as CSV
5. Import back to portal
6. Verify counts look correct
7. Export CSV again as backup
```

### Adding New Products (Batch)

```
1. Create CSV with new items
   (Columns: ID, Category, Material Family, Description, Quantity, Notes)
2. Click "Import CSV"
3. Select your file
4. New items automatically added
```

### Monthly Backup

```
1. Click "📊 Export CSV"
2. Save file as "LightningCath-Stock-YYYY-MM.csv"
3. Store in your backup folder
4. (Optional) Also export JSON
```

---

## 🔒 Security

- Password required for admin access
- Session-based (stays logged in until browser closes)
- Click **"🔒 Logout"** to log out manually
- Data stored locally in your browser
- No one else can access your changes without the password

---

## 💡 Pro Tips

### Speed Tips
1. **Use keyboard:** Tab between fields, Enter to save
2. **Quick quantity update:** Click number, type, click away
3. **Search is fast:** Type anything to filter instantly
4. **Undo often:** Don't worry about mistakes!

### Organization Tips
1. **Export weekly:** Keep CSV backups
2. **Consistent IDs:** Follow naming pattern (resin-037, fep-026)
3. **Use "Coming Soon!":** Better than leaving quantity at 0
4. **Add notes:** Helpful for special items or customer requests

### Efficiency Tips
1. **Bulk updates:** Use CSV import for 10+ changes
2. **Filter first:** Use category/family filters before searching
3. **Print monthly:** Keep paper backup for office
4. **Undo stack:** You have 10 undos - experiment freely!

---

## ❓ Troubleshooting

### "Changes disappeared after closing browser"

**Solution:** Changes ARE saved, but in YOUR browser. To persist permanently:
- Export CSV and save the file
- OR export JSON and update `/data/stockList.ts` in the code

### "Can't import my CSV"

**Common issues:**
- Make sure file is .csv format (not .xlsx)
- Keep same column headers as exported CSV
- IDs must be unique
- Check for typos in category names

**Solution:** Export a sample CSV first, use it as template

### "Undo button is disabled"

**Why:** No changes have been made yet, or undo stack is empty

**Solution:** Make a change first, then undo becomes available

### "Lost the admin password"

**Solution:**
- Open `/app/admin/page.tsx`
- Check line 7 for current password
- OR change it to a new one

### "Stock counts seem wrong"

**Solution:**
1. Click "🔄 Reset to Defaults"
2. Confirm the reset
3. Re-import your latest CSV backup
4. Verify counts

---

## 📞 Need Help?

Contact the developer (Marshall) or check:
- This guide
- Pro Tips section in the admin panel
- Tooltips and placeholder text in forms

---

## 🎉 You're All Set!

This system is designed to save you time and make inventory management easy. The more you use it, the faster you'll get.

**Remember:**
- Everything auto-saves ✓
- Undo is always there ↶
- Export weekly for backups 📊
- Have fun! 🚀

---

**Last Updated:** December 2024
**Version:** 2.0 (Super User-Friendly Edition)
