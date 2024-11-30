const fs = require('fs');

// 读取 JSON 文件
const subtitles = JSON.parse(fs.readFileSync('subtitles.json', 'utf8'));
const expressions = JSON.parse(fs.readFileSync('simple_expressions.json', 'utf8'));

// 查找 highlight 对应的 expression_id
function findExpressionId(highlight, expressions) {
  const expression = expressions.find(exp => exp.text === highlight);
  return expression ? expression.expression_id : null;
}

// 获取所有 video_id 并处理
const results = subtitles.map(subtitle => {
  // 获取该视频的所有highlights
  const highlights = subtitle.subtitle.flatMap(s => s.highlights.en);

  // 查找对应的 expression_id
  const highlightExpressions = highlights
    .map(highlight => {
      const id = findExpressionId(highlight, expressions);
      if (!id) console.log(`No match found for: "${highlight}"`);
      return id;
    })
    .filter(id => id !== null);

  return {
    video_id: subtitle.video_id,
    highlight_expressions: highlightExpressions
  };
});

// 打印结果到控制台
console.log(JSON.stringify(results, null, 2));

// 写入结果到文件
fs.writeFileSync('highlights.json', JSON.stringify(results, null, 2), 'utf8');
console.log('Results have been written to highlights.json');
