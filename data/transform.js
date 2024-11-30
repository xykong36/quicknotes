const fs = require('fs');
const path = require('path');

const transformData = (data) => {
  return data.map((video, index) => {
    return {
      transcript_id: `T${String(index + 1).padStart(3, '0')}`,
      video_id: video.video_id,
      subtitles: video.subtitle.map(sub => ({
        timestamp: sub.timestamp,
        en: sub.en,
        cn: sub.cn
      }))
    };
  });
};

try {
  // Get directory where script is located
  const scriptDir = path.dirname(__filename);

  // Input and output paths relative to script
  const inputPath = path.join(scriptDir, 'subtitles.json');
  const outputPath = path.join(scriptDir, 'transformed_subtitles.json');

  console.log(`Reading from: ${inputPath}`);

  const originalData = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  const transformedData = transformData(originalData);

  fs.writeFileSync(outputPath, JSON.stringify(transformedData, null, 2));
  console.log(`Successfully wrote transformed data to: ${outputPath}`);

} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
