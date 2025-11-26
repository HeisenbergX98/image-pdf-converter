// Configuration constants
const A4_WIDTH = 210;
const A4_HEIGHT = 297;
const PAGE_MARGIN = 10; // Margin from page edge to first image/grid (mm)
const GUTTER = 5; // Spacing between images (mm)

const PRINTABLE_WIDTH = A4_WIDTH - 2 * PAGE_MARGIN;
const PRINTABLE_HEIGHT = A4_HEIGHT;

export const TEMPLATES = [
  {
    key: 1,
    name: "Página Inteira",
    id: "full",
    description: "Uma imagem cobrindo a página inteira.",
    // Full page layouts don't use internal gutters, just the page margin
    imagesPerPage: 1,
    getDimensions: (pw: number, ph: number) => ({
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
    getDimensions: (pw: number, ph: number) => {
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
    getDimensions: (pw: number, ph: number) => {
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
    getDimensions: (pw: number, ph: number) => {
      // 2 cols, 2 rows. Total space W = pw - 1*GUTTER. Total space H = ph - 1*GUTTER
      const w_total = pw - GUTTER;
      const h_total = ph - GUTTER;
      return { w: w_total / 2, h: h_total / 2, rows: 2, cols: 2 };
    },
  },
];
