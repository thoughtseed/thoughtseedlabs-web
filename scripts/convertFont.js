const opentype = require('opentype.js');
const fs = require('fs');
const path = require('path');

// Convert SubjectivitySerif-Bold to Three.js JSON format
const fontPath = path.join(__dirname, '../src/fonts/SubjectivitySerif-Bold.woff2');
const outputPath = path.join(__dirname, '../public/fonts/SubjectivitySerif-Bold.json');

// Ensure output directory exists
if (!fs.existsSync(path.dirname(outputPath))) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
}

// Read and convert font
opentype.load(fontPath, (err, font) => {
  if (err) {
    console.error('Error loading font:', err);
    return;
  }

  // Generate font data in Three.js JSON format
  const fontData = {
    glyphs: {},
    familyName: font.names.fontFamily.en,
    ascender: font.ascender,
    descender: font.descender,
    underlinePosition: font.tables.post.underlinePosition,
    underlineThickness: font.tables.post.underlineThickness,
    boundingBox: {
      yMin: font.tables.head.yMin,
      xMin: font.tables.head.xMin,
      yMax: font.tables.head.yMax,
      xMax: font.tables.head.xMax
    },
    resolution: 1000,
    original_font_information: font.tables.name
  };

  // Convert glyphs
  font.glyphs.forEach((glyph) => {
    if (glyph.unicode !== undefined) {
      const token = String.fromCharCode(glyph.unicode);
      const path = glyph.path.toPathData(2);
      
      fontData.glyphs[token] = {
        ha: glyph.advanceWidth,
        x_min: glyph.xMin,
        x_max: glyph.xMax,
        o: path
      };
    }
  });

  // Save to JSON file
  fs.writeFileSync(outputPath, JSON.stringify(fontData));
  console.log('Font converted successfully!');
});
