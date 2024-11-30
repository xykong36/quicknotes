const fs = require('fs');
const path = require('path');

const transformHighlightsToExpressions = (data) => {
  let expressions = [];
  let expressionId = 1;

  data.forEach(video => {
    video.subtitle.forEach(sub => {
      if (sub.highlights) {
        sub.highlights.en.forEach((en, index) => {
          const expression = {
            expression_id: `E${String(expressionId).padStart(3, '0')}`,
            text: en,
            translation: sub.highlights.cn[index]
          };
          expressions.push(expression);
          expressionId++;
        });
      }
    });
  });

  return expressions;
};

try {
  const scriptDir = path.dirname(__filename);
  const inputPath = path.join(scriptDir, 'subtitles.json');
  const outputPath = path.join(scriptDir, 'simple_expressions.json');

  const subtitles = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  const expressions = transformHighlightsToExpressions(subtitles);

  fs.writeFileSync(
    outputPath,
    JSON.stringify(expressions, null, 2)
  );

  console.log(`Generated ${expressions.length} expressions`);

} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
