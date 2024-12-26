const TEXT_COLORS = [
  "text-green-600 underline decoration-green-600/30",
  "text-orange-500 underline decoration-orange-500/30",
  "text-blue-600 underline decoration-blue-600/30",
  "text-red-500 underline decoration-red-500/30",
  "text-pink-500 underline decoration-pink-500/30",
  "text-emerald-600 underline decoration-emerald-600/30",
];

function HighlightedText({
  text,
  highlights,
}: {
  text: string;
  highlights: string[];
}) {
  const pattern = new RegExp(
    `(${highlights
      .map((str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|")})`,
    "g"
  );
  const parts = text.split(pattern);

  return (
    <p className="text-lg leading-relaxed">
      {parts.map((part, i) => {
        const highlightIndex = highlights.indexOf(part);
        return highlightIndex !== -1 ? (
          <span
            key={i}
            className={TEXT_COLORS[highlightIndex % TEXT_COLORS.length]}
          >
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </p>
  );
}

export default function TranscriptView({
  transcript,
  highlights,
}: {
  transcript: { en: string; cn: string };
  highlights: { en: string[]; cn: string[] };
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-4">English</h2>
        <HighlightedText text={transcript.en} highlights={highlights.en} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">中文</h2>
        <HighlightedText text={transcript.cn} highlights={highlights.cn} />
      </section>

      <section className="border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Vocabulary</h3>
        <div className="grid grid-cols-2 gap-4">
          {highlights.en.map((highlight, index) => (
            <div
              key={highlight}
              className="rounded-lg border p-3 flex justify-between items-center"
            >
              <span className={TEXT_COLORS[index % TEXT_COLORS.length]}>
                {highlight}
              </span>
              <span className="text-gray-600">{highlights.cn[index]}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
