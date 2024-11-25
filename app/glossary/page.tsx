import glossaryTerms from "./words.json";

const GlossaryPage = () => {
  return (
    <div>
      <h1>Glossary</h1>
      <ul>
        {glossaryTerms.map((item, index) => (
          <li key={index}>
            <strong>{item.term}:</strong> {item.definition}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GlossaryPage;
