// LightningCath Stock Resin List
// Source: LightningCath StockList (Thermo)

export interface StockItem {
  materialFamily: string;
  description: string;
  notes: string;
}

export const stockList: StockItem[] = [
  // Polyurethane
  {
    materialFamily: "Polyurethane",
    description: "Pellethane 2363-75D, Natural",
    notes: ""
  },
  {
    materialFamily: "Polyurethane",
    description: "Pellethane 2363-80AE, Natural",
    notes: ""
  },
  {
    materialFamily: "Polyurethane",
    description: "Pellethane 2363-90AE, Natural",
    notes: ""
  },
  // Polyethylene
  {
    materialFamily: "Polyethylene",
    description: "Repsol 55G HDPE, Natural",
    notes: ""
  },
  // Acetal
  {
    materialFamily: "Acetal",
    description: "Celcon M50, Natural",
    notes: ""
  },
  // Pebax
  {
    materialFamily: "Pebax",
    description: "Pebax 2533 SA01 MED, Natural",
    notes: ""
  },
  {
    materialFamily: "Pebax",
    description: "Pebax 2533 SA01 MED, 20% BaSO4",
    notes: ""
  },
  {
    materialFamily: "Pebax",
    description: "Pebax 3533 SA01 MED, Natural",
    notes: ""
  },
  {
    materialFamily: "Pebax",
    description: "Pebax 3533 SA01 MED, 20% BaSO4",
    notes: ""
  },
  {
    materialFamily: "Pebax",
    description: "Pebax 3533 SA01 MED, Cool Grey 7C",
    notes: ""
  },
  {
    materialFamily: "Pebax",
    description: "Pebax 3533 SA01 MED, Dark Blue 295C",
    notes: ""
  },
  {
    materialFamily: "Pebax",
    description: "Pebax 4033 SA01 MED, Natural",
    notes: ""
  },
  {
    materialFamily: "Pebax",
    description: "Pebax 4533 SA01 MED, Natural",
    notes: ""
  },
  {
    materialFamily: "Pebax",
    description: "Pebax 5533 SA01 MED, Natural",
    notes: ""
  },
  {
    materialFamily: "Pebax",
    description: "Pebax 5533 SA01 MED, 20% BaSO4",
    notes: ""
  },
  {
    materialFamily: "Pebax",
    description: "Pebax 5533 SA01 MED, Cool Grey 7C",
    notes: ""
  },
  {
    materialFamily: "Pebax",
    description: "Pebax 5533 SA01 MED, Light Blue 2925C",
    notes: ""
  },
  {
    materialFamily: "Pebax",
    description: "Pebax 6333 SA01 MED, Natural",
    notes: ""
  },
  {
    materialFamily: "Pebax",
    description: "Pebax 6333 SA01 MED, Light Blue 2925C",
    notes: ""
  },
  {
    materialFamily: "Pebax",
    description: "Pebax 7033 SA01 MED, Natural",
    notes: ""
  },
  {
    materialFamily: "Pebax",
    description: "Pebax 7233 SA01 MED, Natural",
    notes: ""
  },
  {
    materialFamily: "Pebax",
    description: "Pebax 7233 SA01 MED, 20% BaSO4",
    notes: ""
  },
  {
    materialFamily: "Pebax",
    description: "Pebax 7233 SA01 MED, Dark Blue 295C",
    notes: ""
  },
  // Nylon
  {
    materialFamily: "Nylon",
    description: "Besno MED, Natural",
    notes: ""
  },
  {
    materialFamily: "Nylon",
    description: "Grilamid L25, Natural",
    notes: ""
  },
  {
    materialFamily: "Nylon",
    description: "Grilamid TR90, Natural",
    notes: ""
  },
  {
    materialFamily: "Nylon",
    description: "Vestamid CARE ML21, Natural",
    notes: ""
  },
  {
    materialFamily: "Nylon",
    description: "Vestamid CARE ML21, 20% BaSO4",
    notes: ""
  },
  {
    materialFamily: "Nylon",
    description: "Vestamid CARE ML21, Dark Blue 295C",
    notes: ""
  },
  {
    materialFamily: "Nylon",
    description: "Vestamid CARE ML24, Natural",
    notes: ""
  },
  // Color Concentrate
  {
    materialFamily: "Color Concentrate",
    description: "PurTone, Rx PEBA Color Concentrate, Black 7",
    notes: "Colorant that can be mixed with Pebax/Nylon resins"
  },
  {
    materialFamily: "Color Concentrate",
    description: "PurTone, Rx PEBA Color Concentrate, Blue 2925C",
    notes: "Colorant that can be mixed with Pebax/Nylon resins"
  },
  {
    materialFamily: "Color Concentrate",
    description: "PurTone, Rx PEBA Color Concentrate, Blue 295C",
    notes: "Colorant that can be mixed with Pebax/Nylon resins"
  },
  {
    materialFamily: "Color Concentrate",
    description: "PurTone, Rx PEBA Color Concentrate, Cool Grey 7C",
    notes: "Colorant that can be mixed with Pebax/Nylon resins"
  },
  {
    materialFamily: "Color Concentrate",
    description: "PurTone, Rx PEBA Color Concentrate, White",
    notes: "Colorant that can be mixed with Pebax/Nylon resins"
  },
  {
    materialFamily: "Color Concentrate",
    description: "PurTone, Rx TPU Color Concentrate, Cool Grey 7C",
    notes: "Colorant that can be mixed with TPU resins"
  }
];

// Material families for filtering
export const materialFamilies = Array.from(
  new Set(stockList.map(item => item.materialFamily))
).sort();

