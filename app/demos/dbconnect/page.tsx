"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@app/types/Supabase";

const Page = () => {
  const [words, setWords] = useState([]);
  const [error, setError] = useState(null);
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    const fetchWords = async () => {
      let { data: words, error } = await supabase.from("words").select("*");
      console.log("fetch the words from database", words);
      if (error) {
        setError(error);
      } else {
        setWords(words);
      }
    };

    fetchWords();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {words.map((word) => (
        <div key={word.id}>
          <h2>{word.word}</h2>
          <p>{word.translation}</p>
          <p>{word.pronunciation}</p>
          <p>{word.example}</p>
          <p>{word.difficulty}</p>
          <p>{word.tags.join(", ")}</p>
        </div>
      ))}
    </div>
  );
};

export default Page;
