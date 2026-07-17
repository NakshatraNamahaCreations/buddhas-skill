// Bitmaps consumed by <PixelDissolve />. Each is an array of equal-length rows
// of "0" and "1" chars. "1" fragments are the ones that animate + render as red;
// "0" cells stay empty (they keep grid rhythm but are invisible).
//
// When the real logo lands, replace `logoB` with a rasterized version of the
// Buddha/B mark on the same grid so the assembly motion carries into production.

export const logoB = [
  "00000000000000",
  "00011111111000",
  "00011111111100",
  "00011000011100",
  "00011000011100",
  "00011111111000",
  "00011111111100",
  "00011000011100",
  "00011000011100",
  "00011000011100",
  "00011111111100",
  "00011111111000",
  "00000000000000",
  "00000000000000",
];

// Optional snow-colored accent pixels (row,col string set) — visual echo of the
// pixel-dissolve motif "punctuation" seen on the source logo.
export const logoBSnow = new Set(["3,12", "10,12"]);
