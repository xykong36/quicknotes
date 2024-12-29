import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { expressions } from "@/data/local/ep1-expression.json";

export default function ExpressionsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-purple-600">
        English Expressions
      </h1>

      <div className="grid gap-4">
        {expressions.map((expr) => (
          <Link
            href={`/expression/${encodeURIComponent(expr.text)}`}
            key={expr.expression_id}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline" className="bg-purple-50">
                        {expr.expression_id}
                      </Badge>
                      <h2 className="text-xl font-semibold text-purple-700">
                        {expr.text}
                      </h2>
                    </div>
                    <p className="text-lg text-gray-600">{expr.translation}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {expr.meaning_en}
                    </p>
                  </div>
                  <ChevronRight className="text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
