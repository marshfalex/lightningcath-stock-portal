// LightningCath Stock List - All Products
// Source: LightningCath Stock Lists (Resin, FEP Heat Shrink, Single Lumen Extrusions)

export type ProductCategory = 'Resin' | 'FEP Heat Shrink' | 'Single Lumen Extrusions';

export interface StockItem {
  id: string; // Unique identifier
  category: ProductCategory;
  materialFamily: string;
  description: string;
  notes: string;
  quantity: number | string; // Can be number or "Coming Soon!"

  // For FEP Heat Shrink
  expIdMin?: string;
  recIdMax?: string;
  recWall?: string;
  shrinkRatio?: string;
  length?: string;

  // For Single Lumen Extrusions
  material?: string;
  id_spec?: string; // ID specification
  wt?: string; // Wall thickness
  odRef?: string; // OD reference
}

export const stockList: StockItem[] = [
  // ==================== RESIN PRODUCTS ====================
  // Polyurethane
  {
    id: "resin-001",
    category: "Resin",
    materialFamily: "Polyurethane",
    description: "Pellethane 2363-75D, Natural",
    notes: "",
    quantity: 0
  },
  {
    id: "resin-002",
    category: "Resin",
    materialFamily: "Polyurethane",
    description: "Pellethane 2363-80AE, Natural",
    notes: "",
    quantity: 0
  },
  {
    id: "resin-003",
    category: "Resin",
    materialFamily: "Polyurethane",
    description: "Pellethane 2363-90AE, Natural",
    notes: "",
    quantity: 0
  },
  // Polyethylene
  {
    id: "resin-004",
    category: "Resin",
    materialFamily: "Polyethylene",
    description: "Repsol 55G HDPE, Natural",
    notes: "",
    quantity: 0
  },
  // Acetal
  {
    id: "resin-005",
    category: "Resin",
    materialFamily: "Acetal",
    description: "Celcon M50, Natural",
    notes: "",
    quantity: 0
  },
  // Pebax
  {
    id: "resin-006",
    category: "Resin",
    materialFamily: "Pebax",
    description: "Pebax 2533 SA01 MED, Natural",
    notes: "",
    quantity: 0
  },
  {
    id: "resin-007",
    category: "Resin",
    materialFamily: "Pebax",
    description: "Pebax 2533 SA01 MED, 20% BaSO4",
    notes: "",
    quantity: 0
  },
  {
    id: "resin-008",
    category: "Resin",
    materialFamily: "Pebax",
    description: "Pebax 3533 SA01 MED, Natural",
    notes: "",
    quantity: 0
  },
  {
    id: "resin-009",
    category: "Resin",
    materialFamily: "Pebax",
    description: "Pebax 3533 SA01 MED, 20% BaSO4",
    notes: "",
    quantity: 0
  },
  {
    id: "resin-010",
    category: "Resin",
    materialFamily: "Pebax",
    description: "Pebax 3533 SA01 MED, Cool Grey 7C",
    notes: "",
    quantity: 0
  },
  {
    id: "resin-011",
    category: "Resin",
    materialFamily: "Pebax",
    description: "Pebax 3533 SA01 MED, Dark Blue 295C",
    notes: "",
    quantity: 0
  },
  {
    id: "resin-012",
    category: "Resin",
    materialFamily: "Pebax",
    description: "Pebax 4033 SA01 MED, Natural",
    notes: "",
    quantity: 0
  },
  {
    id: "resin-013",
    category: "Resin",
    materialFamily: "Pebax",
    description: "Pebax 4533 SA01 MED, Natural",
    notes: "",
    quantity: 0
  },
  {
    id: "resin-014",
    category: "Resin",
    materialFamily: "Pebax",
    description: "Pebax 5533 SA01 MED, Natural",
    notes: "",
    quantity: 0
  },
  {
    id: "resin-015",
    category: "Resin",
    materialFamily: "Pebax",
    description: "Pebax 5533 SA01 MED, 20% BaSO4",
    notes: "",
    quantity: 0
  },
  {
    id: "resin-016",
    category: "Resin",
    materialFamily: "Pebax",
    description: "Pebax 5533 SA01 MED, Cool Grey 7C",
    notes: "",
    quantity: 0
  },
  {
    id: "resin-017",
    category: "Resin",
    materialFamily: "Pebax",
    description: "Pebax 5533 SA01 MED, Light Blue 2925C",
    notes: "",
    quantity: 0
  },
  {
    id: "resin-018",
    category: "Resin",
    materialFamily: "Pebax",
    description: "Pebax 6333 SA01 MED, Natural",
    notes: "",
    quantity: 0
  },
  {
    id: "resin-019",
    category: "Resin",
    materialFamily: "Pebax",
    description: "Pebax 6333 SA01 MED, Light Blue 2925C",
    notes: "",
    quantity: 0
  },
  {
    id: "resin-020",
    category: "Resin",
    materialFamily: "Pebax",
    description: "Pebax 7033 SA01 MED, Natural",
    notes: "",
    quantity: 0
  },
  {
    id: "resin-021",
    category: "Resin",
    materialFamily: "Pebax",
    description: "Pebax 7233 SA01 MED, Natural",
    notes: "",
    quantity: 0
  },
  {
    id: "resin-022",
    category: "Resin",
    materialFamily: "Pebax",
    description: "Pebax 7233 SA01 MED, 20% BaSO4",
    notes: "",
    quantity: 0
  },
  {
    id: "resin-023",
    category: "Resin",
    materialFamily: "Pebax",
    description: "Pebax 7233 SA01 MED, Dark Blue 295C",
    notes: "",
    quantity: 0
  },
  // Nylon
  {
    id: "resin-024",
    category: "Resin",
    materialFamily: "Nylon",
    description: "Besno MED, Natural",
    notes: "",
    quantity: 0
  },
  {
    id: "resin-025",
    category: "Resin",
    materialFamily: "Nylon",
    description: "Grilamid L25, Natural",
    notes: "",
    quantity: 0
  },
  {
    id: "resin-026",
    category: "Resin",
    materialFamily: "Nylon",
    description: "Grilamid TR90, Natural",
    notes: "",
    quantity: 0
  },
  {
    id: "resin-027",
    category: "Resin",
    materialFamily: "Nylon",
    description: "Vestamid CARE ML21, Natural",
    notes: "",
    quantity: 0
  },
  {
    id: "resin-028",
    category: "Resin",
    materialFamily: "Nylon",
    description: "Vestamid CARE ML21, 20% BaSO4",
    notes: "",
    quantity: 0
  },
  {
    id: "resin-029",
    category: "Resin",
    materialFamily: "Nylon",
    description: "Vestamid CARE ML21, Dark Blue 295C",
    notes: "",
    quantity: 0
  },
  {
    id: "resin-030",
    category: "Resin",
    materialFamily: "Nylon",
    description: "Vestamid CARE ML24, Natural",
    notes: "",
    quantity: 0
  },
  // Color Concentrate
  {
    id: "resin-031",
    category: "Resin",
    materialFamily: "Color Concentrate",
    description: "PurTone, Rx PEBA Color Concentrate, Black 7",
    notes: "Colorant that can be mixed with Pebax/Nylon resins",
    quantity: 0
  },
  {
    id: "resin-032",
    category: "Resin",
    materialFamily: "Color Concentrate",
    description: "PurTone, Rx PEBA Color Concentrate, Blue 2925C",
    notes: "Colorant that can be mixed with Pebax/Nylon resins",
    quantity: 0
  },
  {
    id: "resin-033",
    category: "Resin",
    materialFamily: "Color Concentrate",
    description: "PurTone, Rx PEBA Color Concentrate, Blue 295C",
    notes: "Colorant that can be mixed with Pebax/Nylon resins",
    quantity: 0
  },
  {
    id: "resin-034",
    category: "Resin",
    materialFamily: "Color Concentrate",
    description: "PurTone, Rx PEBA Color Concentrate, Cool Grey 7C",
    notes: "Colorant that can be mixed with Pebax/Nylon resins",
    quantity: 0
  },
  {
    id: "resin-035",
    category: "Resin",
    materialFamily: "Color Concentrate",
    description: "PurTone, Rx PEBA Color Concentrate, White",
    notes: "Colorant that can be mixed with Pebax/Nylon resins",
    quantity: 0
  },
  {
    id: "resin-036",
    category: "Resin",
    materialFamily: "Color Concentrate",
    description: "PurTone, Rx TPU Color Concentrate, Cool Grey 7C",
    notes: "Colorant that can be mixed with TPU resins",
    quantity: 0
  },

  // ==================== FEP HEAT SHRINK ====================
  {
    id: "fep-001",
    category: "FEP Heat Shrink",
    materialFamily: "FEP Heat Shrink",
    description: "FEP Heat Shrink, 0.068 Exp x 0.044 Rec",
    notes: "",
    quantity: "Coming Soon!",
    expIdMin: "0.068\"",
    recIdMax: "0.044\"",
    recWall: "0.008\"",
    shrinkRatio: "1.6:1",
    length: "72\""
  },
  {
    id: "fep-002",
    category: "FEP Heat Shrink",
    materialFamily: "FEP Heat Shrink",
    description: "FEP Heat Shrink, 0.074 Exp x 0.047 Rec",
    notes: "",
    quantity: "Coming Soon!",
    expIdMin: "0.074\"",
    recIdMax: "0.047\"",
    recWall: "0.008\"",
    shrinkRatio: "1.6:1",
    length: "72\""
  },
  {
    id: "fep-003",
    category: "FEP Heat Shrink",
    materialFamily: "FEP Heat Shrink",
    description: "FEP Heat Shrink, 0.085 Exp x 0.053 Rec",
    notes: "",
    quantity: "Coming Soon!",
    expIdMin: "0.085\"",
    recIdMax: "0.053\"",
    recWall: "0.008\"",
    shrinkRatio: "1.6:1",
    length: "72\""
  },
  {
    id: "fep-004",
    category: "FEP Heat Shrink",
    materialFamily: "FEP Heat Shrink",
    description: "FEP Heat Shrink, 0.090 Exp x 0.058 Rec",
    notes: "",
    quantity: 70,
    expIdMin: "0.090\"",
    recIdMax: "0.058\"",
    recWall: "0.008\"",
    shrinkRatio: "1.6:1",
    length: "72\""
  },
  {
    id: "fep-005",
    category: "FEP Heat Shrink",
    materialFamily: "FEP Heat Shrink",
    description: "FEP Heat Shrink, 0.094 Exp x 0.057 Rec",
    notes: "",
    quantity: "Coming Soon!",
    expIdMin: "0.094\"",
    recIdMax: "0.057\"",
    recWall: "0.008\"",
    shrinkRatio: "1.6:1",
    length: "72\""
  },
  {
    id: "fep-006",
    category: "FEP Heat Shrink",
    materialFamily: "FEP Heat Shrink",
    description: "FEP Heat Shrink, 0.110 Exp 0.068 Rec",
    notes: "",
    quantity: "Coming Soon!",
    expIdMin: "0.110\"",
    recIdMax: "0.068\"",
    recWall: "0.010\"",
    shrinkRatio: "1.6:1",
    length: "72\""
  },
  {
    id: "fep-007",
    category: "FEP Heat Shrink",
    materialFamily: "FEP Heat Shrink",
    description: "FEP Heat Shrink, 0.125 Exp x 0.075 Rec",
    notes: "",
    quantity: 135,
    expIdMin: "0.125\"",
    recIdMax: "0.075\"",
    recWall: "0.010\"",
    shrinkRatio: "1.6:1",
    length: "72\""
  },
  {
    id: "fep-008",
    category: "FEP Heat Shrink",
    materialFamily: "FEP Heat Shrink",
    description: "FEP Heat Shrink, 0.130 Exp x 0.081 Rec",
    notes: "",
    quantity: 100,
    expIdMin: "0.130\"",
    recIdMax: "0.081\"",
    recWall: "0.010\"",
    shrinkRatio: "1.6:1",
    length: "72\""
  },
  {
    id: "fep-009",
    category: "FEP Heat Shrink",
    materialFamily: "FEP Heat Shrink",
    description: "FEP Heat Shrink, 0.136 Exp x 0.085 Rec",
    notes: "",
    quantity: 351,
    expIdMin: "0.136\"",
    recIdMax: "0.085\"",
    recWall: "0.010\"",
    shrinkRatio: "1.6:1",
    length: "72\""
  },
  {
    id: "fep-010",
    category: "FEP Heat Shrink",
    materialFamily: "FEP Heat Shrink",
    description: "FEP Heat Shrink, 0.150 Exp x 0.095 Rec",
    notes: "",
    quantity: "Coming Soon!",
    expIdMin: "0.150\"",
    recIdMax: "0.095\"",
    recWall: "0.010\"",
    shrinkRatio: "1.6:1",
    length: "72\""
  },
  {
    id: "fep-011",
    category: "FEP Heat Shrink",
    materialFamily: "FEP Heat Shrink",
    description: "FEP Heat Shrink, 0.172 Exp x 0.110 Rec",
    notes: "",
    quantity: 28,
    expIdMin: "0.172\"",
    recIdMax: "0.110\"",
    recWall: "0.010\"",
    shrinkRatio: "1.6:1",
    length: "72\""
  },
  {
    id: "fep-012",
    category: "FEP Heat Shrink",
    materialFamily: "FEP Heat Shrink",
    description: "FEP Heat Shrink, 0.175 Exp x 0.109 Rec",
    notes: "",
    quantity: 92,
    expIdMin: "0.175\"",
    recIdMax: "0.109\"",
    recWall: "0.010\"",
    shrinkRatio: "1.6:1",
    length: "72\""
  },
  {
    id: "fep-013",
    category: "FEP Heat Shrink",
    materialFamily: "FEP Heat Shrink",
    description: "FEP Heat Shrink, 0.180 Exp x 0.113 Rec",
    notes: "",
    quantity: 58,
    expIdMin: "0.180\"",
    recIdMax: "0.113\"",
    recWall: "0.010\"",
    shrinkRatio: "1.6:1",
    length: "72\""
  },
  {
    id: "fep-014",
    category: "FEP Heat Shrink",
    materialFamily: "FEP Heat Shrink",
    description: "FEP Heat Shrink, 0.185 Exp x 0.115 Rec",
    notes: "",
    quantity: "Coming Soon!",
    expIdMin: "0.185\"",
    recIdMax: "0.115\"",
    recWall: "0.010\"",
    shrinkRatio: "1.6:1",
    length: "72\""
  },
  {
    id: "fep-015",
    category: "FEP Heat Shrink",
    materialFamily: "FEP Heat Shrink",
    description: "FEP Heat Shrink, 0.188 Exp x 0.118 Rec",
    notes: "",
    quantity: 66,
    expIdMin: "0.188\"",
    recIdMax: "0.118\"",
    recWall: "0.010\"",
    shrinkRatio: "1.6:1",
    length: "72\""
  },
  {
    id: "fep-016",
    category: "FEP Heat Shrink",
    materialFamily: "FEP Heat Shrink",
    description: "FEP Heat Shrink, 0.200 Exp x 0.125 Rec",
    notes: "",
    quantity: 80,
    expIdMin: "0.200\"",
    recIdMax: "0.125\"",
    recWall: "0.010\"",
    shrinkRatio: "1.6:1",
    length: "72\""
  },
  {
    id: "fep-017",
    category: "FEP Heat Shrink",
    materialFamily: "FEP Heat Shrink",
    description: "FEP Heat Shrink, 0.215 Exp x 0.135 Rec",
    notes: "",
    quantity: 141,
    expIdMin: "0.215\"",
    recIdMax: "0.135\"",
    recWall: "0.010\"",
    shrinkRatio: "1.6:1",
    length: "72\""
  },
  {
    id: "fep-018",
    category: "FEP Heat Shrink",
    materialFamily: "FEP Heat Shrink",
    description: "FEP Heat Shrink, 0.225 Exp x 0.140 Rec",
    notes: "",
    quantity: 5,
    expIdMin: "0.225\"",
    recIdMax: "0.140\"",
    recWall: "0.011\"",
    shrinkRatio: "1.6:1",
    length: "72\""
  },
  {
    id: "fep-019",
    category: "FEP Heat Shrink",
    materialFamily: "FEP Heat Shrink",
    description: "FEP Heat Shrink, 0.246 Exp x 0.153 Rec",
    notes: "",
    quantity: "Coming Soon!",
    expIdMin: "0.246\"",
    recIdMax: "0.153\"",
    recWall: "0.011\"",
    shrinkRatio: "1.6:1",
    length: "72\""
  },
  {
    id: "fep-020",
    category: "FEP Heat Shrink",
    materialFamily: "FEP Heat Shrink",
    description: "FEP Heat Shrink, 0.250 Exp x 0.157 Rec",
    notes: "",
    quantity: 357,
    expIdMin: "0.250\"",
    recIdMax: "0.157\"",
    recWall: "0.011\"",
    shrinkRatio: "1.6:1",
    length: "72\""
  },
  {
    id: "fep-021",
    category: "FEP Heat Shrink",
    materialFamily: "FEP Heat Shrink",
    description: "FEP Heat Shrink, 0.265 Exp x 0.166 Rec",
    notes: "",
    quantity: 38,
    expIdMin: "0.265\"",
    recIdMax: "0.166\"",
    recWall: "0.011\"",
    shrinkRatio: "1.6:1",
    length: "72\""
  },
  {
    id: "fep-022",
    category: "FEP Heat Shrink",
    materialFamily: "FEP Heat Shrink",
    description: "FEP Heat Shrink, 0.275 Exp x 0.166 Rec",
    notes: "",
    quantity: "Coming Soon!",
    expIdMin: "0.275\"",
    recIdMax: "0.172\"",
    recWall: "0.012\"",
    shrinkRatio: "1.6:1",
    length: "72\""
  },
  {
    id: "fep-023",
    category: "FEP Heat Shrink",
    materialFamily: "FEP Heat Shrink",
    description: "FEP Heat Shrink, 0.300 Exp x 0.188 Rec",
    notes: "",
    quantity: "Coming Soon!",
    expIdMin: "0.300\"",
    recIdMax: "0.188\"",
    recWall: "0.011\"",
    shrinkRatio: "1.6:1",
    length: "72\""
  },
  {
    id: "fep-024",
    category: "FEP Heat Shrink",
    materialFamily: "FEP Heat Shrink",
    description: "FEP Heat Shrink, 0.350 Exp x 0.219 Rec",
    notes: "",
    quantity: 380,
    expIdMin: "0.350\"",
    recIdMax: "0.219\"",
    recWall: "0.012\"",
    shrinkRatio: "1.6:1",
    length: "72\""
  },
  {
    id: "fep-025",
    category: "FEP Heat Shrink",
    materialFamily: "FEP Heat Shrink",
    description: "FEP Heat Shrink, 0.375 Exp x 0.234 Rec",
    notes: "",
    quantity: 90,
    expIdMin: "0.375\"",
    recIdMax: "0.234\"",
    recWall: "0.012\"",
    shrinkRatio: "1.6:1",
    length: "72\""
  },

  // ==================== SINGLE LUMEN EXTRUSIONS ====================
  {
    id: "sle-001",
    category: "Single Lumen Extrusions",
    materialFamily: "Pebax 72D Natural",
    description: "Pebax 72D Natural, 0.086\" ± .001\" ID, 0.005\" ± .0005\" WT, 0.096\" (ref) OD",
    notes: "",
    quantity: 230,
    material: "Pebax 72D Natural",
    id_spec: "0.086\" ± .001\"",
    wt: "0.005\" ± .0005\"",
    odRef: "0.096\" (ref)",
    length: "66\" + 1\" - 0\""
  },
  {
    id: "sle-002",
    category: "Single Lumen Extrusions",
    materialFamily: "Pebax 72D Natural",
    description: "Pebax 72D Natural, 0.092\" ± .001\" ID, 0.005\" ± .0005\" WT, 0.102\" (ref) OD",
    notes: "",
    quantity: 125,
    material: "Pebax 72D Natural",
    id_spec: "0.092\" ± .001\"",
    wt: "0.005\" ± .0005\"",
    odRef: "0.102\" (ref)",
    length: "66\" + 1\" - 0\""
  },
  {
    id: "sle-003",
    category: "Single Lumen Extrusions",
    materialFamily: "Pebax 72D Natural",
    description: "Pebax 72D Natural, 0.099\" ± .001\" ID, 0.005\" ± .0005\" WT, 0.109\" (ref) OD",
    notes: "",
    quantity: 228,
    material: "Pebax 72D Natural",
    id_spec: "0.099\" ± .001\"",
    wt: "0.005\" ± .0005\"",
    odRef: "0.109\" (ref)",
    length: "66\" + 1\" - 0\""
  },
  {
    id: "sle-004",
    category: "Single Lumen Extrusions",
    materialFamily: "Pebax 72D Natural",
    description: "Pebax 72D Natural, 0.105\" ± .001\" ID, 0.005\" ± .0005\" WT, 0.115\" (ref) OD",
    notes: "",
    quantity: 238,
    material: "Pebax 72D Natural",
    id_spec: "0.105\" ± .001\"",
    wt: "0.005\" ± .0005\"",
    odRef: "0.115\" (ref)",
    length: "66 + 1\" - 0\""
  },
  {
    id: "sle-005",
    category: "Single Lumen Extrusions",
    materialFamily: "Pebax 72D Natural",
    description: "Pebax 72D Natural, 0.112\" ± .001\" ID, 0.005\" ± .0005\" WT, 0.124\" (ref) OD",
    notes: "",
    quantity: 235,
    material: "Pebax 72D Natural",
    id_spec: "0.112\" ± .001\"",
    wt: "0.005\" ± .0005\"",
    odRef: "0.124\" (ref)",
    length: "66\" + 1\" - 0\""
  },
  {
    id: "sle-006",
    category: "Single Lumen Extrusions",
    materialFamily: "Pebax 72D Natural",
    description: "Pebax 72D Natural, 0.118\" ± .001\" ID, 0.005\" ± .0005\" WT, 0.128\" (ref) OD",
    notes: "",
    quantity: 245,
    material: "Pebax 72D Natural",
    id_spec: "0.118\" ± .001\"",
    wt: "0.005\" ± .0005\"",
    odRef: "0.128\" (ref)",
    length: "66\" + 1\" - 0\""
  },
  {
    id: "sle-007",
    category: "Single Lumen Extrusions",
    materialFamily: "Pebax 63D Natural",
    description: "Pebax 63D Natural, 0.170\" ± .001\" ID, 0.005\" ± .0005\" WT, 0.180\" (ref) OD",
    notes: "",
    quantity: 98,
    material: "Pebax 63D Natural",
    id_spec: "0.170\" ± .001\"",
    wt: "0.005\" ± .0005\"",
    odRef: "0.180\" (ref)",
    length: "60\" MIN"
  },
  {
    id: "sle-008",
    category: "Single Lumen Extrusions",
    materialFamily: "Pebax 63D Natural",
    description: "Pebax 63D Natural, 0.175\" ± .001\" ID, 0.005\" ± .0005\" WT, 0.185\" (ref) OD",
    notes: "",
    quantity: 98,
    material: "Pebax 63D Natural",
    id_spec: "0.175\" ± .001\"",
    wt: "0.005\" ± .0005\"",
    odRef: "0.185\" (ref)",
    length: "60\" MIN"
  },
  {
    id: "sle-009",
    category: "Single Lumen Extrusions",
    materialFamily: "Pebax 63D Natural",
    description: "Pebax 63D Natural, 0.180\" ± .001\" ID, 0.005\" ± .0005\" WT, 0.190\" (ref) OD",
    notes: "",
    quantity: 98,
    material: "Pebax 63D Natural",
    id_spec: "0.180\" ± .001\"",
    wt: "0.005\" ± .0005\"",
    odRef: "0.190\" (ref)",
    length: "60\" MIN"
  },
  {
    id: "sle-010",
    category: "Single Lumen Extrusions",
    materialFamily: "Pebax 63D Natural",
    description: "Pebax 63D Natural, 0.190\" ± .001\" ID, 0.005\" ± .0005\" WT, 0.200\" (ref) OD",
    notes: "",
    quantity: 97,
    material: "Pebax 63D Natural",
    id_spec: "0.190\" ± .001\"",
    wt: "0.005\" ± .0005\"",
    odRef: "0.200\" (ref)",
    length: "60\" MIN"
  },
  {
    id: "sle-011",
    category: "Single Lumen Extrusions",
    materialFamily: "Pebax 55D Natural",
    description: "Pebax 55D Natural, 0.053\" ± .001\" ID, 0.005\" ± .0005\" WT, 0.063\" (ref) OD",
    notes: "",
    quantity: 190,
    material: "Pebax 55D Natural",
    id_spec: "0.053\" ± .001\"",
    wt: "0.005\" ± .0005\"",
    odRef: "0.063\" (ref)",
    length: "66\" + 1\" - 0\""
  },
  {
    id: "sle-012",
    category: "Single Lumen Extrusions",
    materialFamily: "Pebax 55D Natural",
    description: "Pebax 55D Natural, 0.060\" ± .001\" ID, 0.005\" ± .0005\" WT, 0.070\" (ref) OD",
    notes: "",
    quantity: 174,
    material: "Pebax 55D Natural",
    id_spec: "0.060\" ± .001\"",
    wt: "0.005\" ± .0005\"",
    odRef: "0.070\" (ref)",
    length: "66\" + 1\" - 0\""
  },
  {
    id: "sle-013",
    category: "Single Lumen Extrusions",
    materialFamily: "Pebax 55D Natural",
    description: "Pebax 55D Natural, 0.066\" ± .001\" ID, 0.005\" ± .0005\" WT, 0.076\" (ref) OD",
    notes: "",
    quantity: 230,
    material: "Pebax 55D Natural",
    id_spec: "0.066\" ± .001\"",
    wt: "0.005\" ± .0005\"",
    odRef: "0.076\" (ref)",
    length: "66\" + 1\" - 0\""
  },
  {
    id: "sle-014",
    category: "Single Lumen Extrusions",
    materialFamily: "Pebax 35D 20% BaSO4",
    description: "Pebax 35D 20% BaSO4, 0.026\" ± .001\" ID, 0.002\" ± .0005\" WT, 0.030\" (ref) OD",
    notes: "",
    quantity: 701,
    material: "Pebax 35D 20% BaSO4",
    id_spec: "0.026\" ± .001\"",
    wt: "0.002\" ± .0005\"",
    odRef: "0.030\" (ref)",
    length: "60\" MIN"
  },
  {
    id: "sle-015",
    category: "Single Lumen Extrusions",
    materialFamily: "Pebax 35D 20% BaSO4",
    description: "Pebax 35D 20% BaSO4, 0.033\" ± .001\" ID, 0.002\" ± .0005\" WT, 0.037\" (ref) OD",
    notes: "",
    quantity: 80,
    material: "Pebax 35D 20% BaSO4",
    id_spec: "0.033\" ± .001\"",
    wt: "0.002\" ± .0005\"",
    odRef: "0.037\" (ref)",
    length: "60\" MIN"
  },
  {
    id: "sle-016",
    category: "Single Lumen Extrusions",
    materialFamily: "Pebax 35D 20% BaSO4",
    description: "Pebax 35D 20% BaSO4, 0.039\" ± .001\" ID, 0.002\" ± .0005\" WT, 0.043\" (ref) OD",
    notes: "",
    quantity: 85,
    material: "Pebax 35D 20% BaSO4",
    id_spec: "0.039\" ± .001\"",
    wt: "0.002\" ± .0005\"",
    odRef: "0.043\" (ref)",
    length: "60\" MIN"
  },
  {
    id: "sle-017",
    category: "Single Lumen Extrusions",
    materialFamily: "Pebax 35D 20% BaSO4",
    description: "Pebax 35D 20% BaSO4, 0.047\" ± .001\" ID, 0.002\" ± .0005\" WT, 0.051\" (ref) OD",
    notes: "",
    quantity: 100,
    material: "Pebax 35D 20% BaSO4",
    id_spec: "0.047\" ± .001\"",
    wt: "0.002\" ± .0005\"",
    odRef: "0.051\" (ref)",
    length: "60\" MIN"
  },
  {
    id: "sle-018",
    category: "Single Lumen Extrusions",
    materialFamily: "Pebax 35D 20% BaSO4",
    description: "Pebax 35D 20% BaSO4, 0.053\" ± .001\" ID, 0.002\" ± .0005\" WT, 0.057\" (ref) OD",
    notes: "",
    quantity: 45,
    material: "Pebax 35D 20% BaSO4",
    id_spec: "0.053\" ± .001\"",
    wt: "0.002\" ± .0005\"",
    odRef: "0.057\" (ref)",
    length: "60\" MIN"
  },
  {
    id: "sle-019",
    category: "Single Lumen Extrusions",
    materialFamily: "Pebax 35D 20% BaSO4",
    description: "Pebax 35D 20% BaSO4, 0.079\" ± .001\" ID, 0.002\" ± .0005\" WT, 0.083\" (ref) OD",
    notes: "",
    quantity: 85,
    material: "Pebax 35D 20% BaSO4",
    id_spec: "0.079\" ± .001\"",
    wt: "0.002\" ± .0005\"",
    odRef: "0.083\" (ref)",
    length: "60\" MIN"
  },
  {
    id: "sle-020",
    category: "Single Lumen Extrusions",
    materialFamily: "Pebax 35D 20% BaSO4",
    description: "Pebax 35D 20% BaSO4, 0.086\" ± .001\" ID, 0.002\" ± .0005\" WT, 0.090\" (ref) OD",
    notes: "",
    quantity: 85,
    material: "Pebax 35D 20% BaSO4",
    id_spec: "0.086\" ± .001\"",
    wt: "0.002\" ± .0005\"",
    odRef: "0.090\" (ref)",
    length: "60\" MIN"
  },
  {
    id: "sle-021",
    category: "Single Lumen Extrusions",
    materialFamily: "Pebax 35D 20% BaSO4",
    description: "Pebax 35D 20% BaSO4, 0.092\" ± .001\" ID, 0.002\" ± .0005\" WT, 0.096\" (ref) OD",
    notes: "",
    quantity: 80,
    material: "Pebax 35D 20% BaSO4",
    id_spec: "0.092\" ± .001\"",
    wt: "0.002\" ± .0005\"",
    odRef: "0.096\" (ref)",
    length: "60\" MIN"
  },
  {
    id: "sle-022",
    category: "Single Lumen Extrusions",
    materialFamily: "Pebax 35D 20% BaSO4",
    description: "Pebax 35D 20% BaSO4, 0.099\" ± .001\" ID, 0.002\" ± .0005\" WT, 0.103\" (ref) OD",
    notes: "",
    quantity: 100,
    material: "Pebax 35D 20% BaSO4",
    id_spec: "0.099\" ± .001\"",
    wt: "0.002\" ± .0005\"",
    odRef: "0.103\" (ref)",
    length: "60\" MIN"
  },
  {
    id: "sle-023",
    category: "Single Lumen Extrusions",
    materialFamily: "Pebax 35D 20% BaSO4",
    description: "Pebax 35D 20% BaSO4, 0.105\" ± .001\" ID, 0.002\" ± .0005\" WT, 0.109\" (ref) OD",
    notes: "",
    quantity: 100,
    material: "Pebax 35D 20% BaSO4",
    id_spec: "0.105\" ± .001\"",
    wt: "0.002\" ± .0005\"",
    odRef: "0.109\" (ref)",
    length: "60\" MIN"
  },
  {
    id: "sle-024",
    category: "Single Lumen Extrusions",
    materialFamily: "Pebax 35D 20% BaSO4",
    description: "Pebax 35D 20% BaSO4, 0.112\" ± .001\" ID, 0.002\" ± .0005\" WT, 0.116\" (ref) OD",
    notes: "",
    quantity: 80,
    material: "Pebax 35D 20% BaSO4",
    id_spec: "0.112\" ± .001\"",
    wt: "0.002\" ± .0005\"",
    odRef: "0.116\" (ref)",
    length: "60\" MIN"
  },
  {
    id: "sle-025",
    category: "Single Lumen Extrusions",
    materialFamily: "Pebax 35D 20% BaSO4",
    description: "Pebax 35D 20% BaSO4, 0.118\" ± .001\" ID, 0.002\" ± .0005\" WT, 0.122\" (ref) OD",
    notes: "",
    quantity: 80,
    material: "Pebax 35D 20% BaSO4",
    id_spec: "0.118\" ± .001\"",
    wt: "0.002\" ± .0005\"",
    odRef: "0.122\" (ref)",
    length: "60\" MIN"
  },
  {
    id: "sle-026",
    category: "Single Lumen Extrusions",
    materialFamily: "Pebax 25D 20% BaSO4",
    description: "Pebax 25D 20% BaSO4, 0.115\" ± .002\" ID, 0.0255\" (REF) WT, 0.166\" ± .003\" OD",
    notes: "",
    quantity: 50,
    material: "Pebax 25D 20% BaSO4",
    id_spec: "0.115\" ± .002\"",
    wt: "0.0255\" (REF)",
    odRef: "0.166\" ± .003\"",
    length: "48\" MIN"
  }
];

// Material families for filtering
export const materialFamilies = Array.from(
  new Set(stockList.map(item => item.materialFamily))
).sort();

// Product categories for filtering
export const productCategories: ProductCategory[] = ['Resin', 'FEP Heat Shrink', 'Single Lumen Extrusions'];
