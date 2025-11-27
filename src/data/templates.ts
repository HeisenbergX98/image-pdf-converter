// Configuration constants
const A4_WIDTH = 210;
const A4_HEIGHT = 297;
export const PAGE_MARGIN = 10; // Margin from page edge to first image/grid (mm)
export const GUTTER = 5; // Spacing between images (mm)

export const PRINTABLE_WIDTH = A4_WIDTH - 2 * PAGE_MARGIN;
export const PRINTABLE_HEIGHT = A4_HEIGHT - 2 * PAGE_MARGIN;

// --- EXPORTED TYPES ---

export interface TemplateDimensions {
  w: number;
  h: number;
  rows: number;
  cols: number;
}

export interface Template {
  key: number;
  name: string;
  id: "3x4" | "half" | "full" | "2x2" | "id_card";
  description: string;
  imagesPerPage: number;
  getDimensions: (pw: number, ph: number) => TemplateDimensions;
}

export type TemplateId = Template["id"];

// --- EXPORTED TEMPLATES ARRAY ---

export const TEMPLATES: Template[] = [
  {
    key: 1,
    name: "Página Inteira",
    id: "full",
    description: "Uma imagem cobrindo a página inteira.",
    imagesPerPage: 1,
    getDimensions: (pw, ph) => ({
      w: pw,
      h: ph,
      rows: 1,
      cols: 1,
    }),
  },
  {
    key: 2,
    name: "Meia Página",
    id: "half",
    description: "Duas imagens posicionadas verticalmente em uma página.",
    imagesPerPage: 2,
    getDimensions: (pw, ph) => {
      // Two rows, one column. Total vertical space is ph - 1*GUTTER
      const h_total = ph - GUTTER;
      return { w: pw, h: h_total / 2, rows: 2, cols: 1 };
    },
  },
  {
    key: 3,
    name: "Passaporte (3x4 cm)",
    id: "3x4",
    description: "Uma grade de imagens 3cm x 4cm.",
    // Calculate actual maximum capacity for imagesPerPage based on print area with gutters
    imagesPerPage: (function () {
      const targetW = 30; // 30mm
      const targetH = 40; // 40mm
      // Calculate how many 30mm images plus 5mm gutter fit horizontally
      const cols = Math.floor((PRINTABLE_WIDTH + GUTTER) / (targetW + GUTTER));
      // Calculate how many 40mm images plus 5mm gutter fit vertically
      const rows = Math.floor((PRINTABLE_HEIGHT + GUTTER) / (targetH + GUTTER));
      return cols * rows;
    })(),
    getDimensions: (pw, ph) => {
      const targetW = 30; // 30mm
      const targetH = 40; // 40mm
      // Use the max fitted columns/rows for positioning (calculated above)
      const actualCols = Math.floor((pw + GUTTER) / (targetW + GUTTER));
      const actualRows = Math.floor((ph + GUTTER) / (targetH + GUTTER));

      // Note: Here, imgW and imgH are fixed by the template request (30x40mm)
      return { w: targetW, h: targetH, rows: actualRows, cols: actualCols };
    },
  },
  {
    key: 4,
    name: "Grade 2 x 2",
    id: "2x2",
    description: "Quatro imagens em uma grade 2 x 2.",
    imagesPerPage: 4,
    getDimensions: (pw, ph) => {
      // 2 cols, 2 rows. Total space W = pw - 1*GUTTER. Total space H = ph - 1*GUTTER
      const w_total = pw - GUTTER;
      const h_total = ph - GUTTER;
      return { w: w_total / 2, h: h_total / 2, rows: 2, cols: 2 };
    },
  },
  {
    key: 5,
    name: "Crachá / Cartão",
    id: "id_card",
    description: "Tamanho padrão de cartão (8,6cm x 5,4cm). 8 por página.",
    imagesPerPage: (function () {
      const targetW = 86;
      const targetH = 54;
      const cols = Math.floor((PRINTABLE_WIDTH + GUTTER) / (targetW + GUTTER));
      const rows = Math.floor((PRINTABLE_HEIGHT + GUTTER) / (targetH + GUTTER));
      return cols * rows;
    })(),
    getDimensions: (pw, ph) => {
      const targetW = 86;
      const targetH = 54;

      const actualCols = Math.floor((pw + GUTTER) / (targetW + GUTTER));
      const actualRows = Math.floor((ph + GUTTER) / (targetH + GUTTER));

      return { w: targetW, h: targetH, rows: actualRows, cols: actualCols };
    },
  },
];
