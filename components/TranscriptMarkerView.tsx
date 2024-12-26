const COLORS = [
  "bg-blue-100",
  "bg-green-100",
  "bg-purple-100",
  "bg-yellow-100",
  "bg-pink-100",
  "bg-orange-100",
];

const escapeRegExp = (string: string) =>
  string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function HighlightedText({
  text,
  highlights,
}: {
  text: string;
  highlights: string[];
}) {
  const pattern = new RegExp(
    `(${highlights.map(escapeRegExp).join("|")})`,
    "g"
  );
  const parts = text.split(pattern);

  return (
    <p className="text-lg leading-relaxed">
      {parts.map((part, i) => {
        const highlightIndex = highlights.indexOf(part);
        if (highlightIndex === -1) return <span key={i}>{part}</span>;

        return (
          <mark
            key={i}
            className={`${
              COLORS[highlightIndex % COLORS.length]
            } px-1 rounded mx-0.5 marker:content-none`}
          >
            {part}
          </mark>
        );
      })}
    </p>
  );
}

export default function TranscriptMarkerView({
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
              className={`${
                COLORS[index % COLORS.length]
              } rounded-lg p-3 flex justify-between items-center`}
            >
              <span className="font-medium">{highlight}</span>
              <span className="text-gray-600">{highlights.cn[index]}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
