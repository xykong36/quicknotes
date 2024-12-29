import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, BookOpen, Lightbulb, ArrowRight } from "lucide-react";
import Link from "next/link";
import { expressions } from "@/data/local/ep1-expression.json";

export default function ExpressionDetailPage({ params }) {
  const expression = expressions.find(
    (e) => e.text === decodeURIComponent(params.text)
  );

  if (!expression) {
    return <div>Expression not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <Link href="/expression">
        <Button variant="ghost" className="mb-6">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Expressions
        </Button>
      </Link>

      <div className="space-y-8">
        {/* Header Section */}
        <Card className="bg-purple-50">
          <CardContent className="p-6">
            <Badge variant="outline" className="mb-2">
              {expression.expression_id}
            </Badge>
            <h1 className="text-3xl font-bold text-purple-800 mb-3">
              {expression.text}
            </h1>
            <p className="text-2xl text-purple-600">{expression.translation}</p>
            <p className="text-gray-600 mt-4">{expression.meaning_en}</p>
          </CardContent>
        </Card>

        {/* Context Examples */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 text-purple-600" />
              Context Examples
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-gray-800">{expression.context_sentence_en}</p>
              <p className="text-purple-600 mt-2">
                {expression.context_sentence_cn}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Sample Sentences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="mr-2 text-purple-600" />
              Sample Sentences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {expression.sample_sentences.map((sample, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-800">{sample.sentence}</p>
                <p className="text-purple-600 mt-2">{sample.sentence_cn}</p>
                <Badge variant="outline" className="mt-2 text-xs">
                  {sample.source}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Related Expressions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ArrowRight className="mr-2 text-purple-600" />
              Related Expressions
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {expression.related_expressions.map((related, index) => (
              <div key={index} className="border p-4 rounded-lg">
                <h3 className="font-semibold text-lg text-purple-700">
                  {related.text}
                </h3>
                <p className="text-purple-600">{related.translation}</p>
                <p className="text-gray-600 text-sm mt-2">{related.meaning}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
