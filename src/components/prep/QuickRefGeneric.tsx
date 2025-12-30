import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";

interface QuickRefGenericProps {
  opponent: {
    openingApproach?: string;
    closingApproach?: string;
    talkingPoints?: Array<{ id: string; content: string }>;
    keyPhrases?: Array<{ id: string; phrase: string }>;
    responseMap?: Array<{ id: string; trigger: string; response: string }>;
  };
}

export function QuickRefGeneric({ opponent }: QuickRefGenericProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Opening */}
      <Card>
        <CardHeader className="py-3 bg-blue-500/10">
          <CardTitle className="text-sm font-bold text-blue-600 dark:text-blue-400">
            OPENING
          </CardTitle>
        </CardHeader>
        <CardContent className="py-4">
          <p className="text-sm whitespace-pre-wrap">
            {opponent.openingApproach || (
              <span className="text-muted-foreground italic">
                No opening approach set
              </span>
            )}
          </p>
        </CardContent>
      </Card>

      {/* Closing */}
      <Card>
        <CardHeader className="py-3 bg-primary/10">
          <CardTitle className="text-sm font-bold text-primary dark:text-primary">
            CLOSING
          </CardTitle>
        </CardHeader>
        <CardContent className="py-4">
          <p className="text-sm whitespace-pre-wrap">
            {opponent.closingApproach || (
              <span className="text-muted-foreground italic">
                No closing approach set
              </span>
            )}
          </p>
        </CardContent>
      </Card>

      {/* Talking Points */}
      <Card>
        <CardHeader className="py-3 bg-green-500/10">
          <CardTitle className="text-sm font-bold text-green-600 dark:text-green-400">
            TALKING POINTS
          </CardTitle>
        </CardHeader>
        <CardContent className="py-4">
          {opponent.talkingPoints?.length ? (
            <ul className="space-y-2">
              {opponent.talkingPoints.map((point) => (
                <li key={point.id} className="text-sm flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  {point.content}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              No talking points
            </p>
          )}
        </CardContent>
      </Card>

      {/* Key Phrases */}
      <Card>
        <CardHeader className="py-3 bg-yellow-500/10">
          <CardTitle className="text-sm font-bold text-yellow-600 dark:text-yellow-400">
            KEY PHRASES
          </CardTitle>
        </CardHeader>
        <CardContent className="py-4">
          {opponent.keyPhrases?.length ? (
            <div className="flex flex-wrap gap-2">
              {opponent.keyPhrases.map((item) => (
                <span
                  key={item.id}
                  className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded"
                >
                  "{item.phrase}"
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              No key phrases
            </p>
          )}
        </CardContent>
      </Card>

      {/* Response Map - Full Width */}
      <Card className="md:col-span-2">
        <CardHeader className="py-3 bg-primary/10">
          <CardTitle className="text-sm font-bold text-primary dark:text-primary">
            RESPONSE MAP
          </CardTitle>
        </CardHeader>
        <CardContent className="py-4">
          {opponent.responseMap?.length ? (
            <div className="space-y-3">
              {opponent.responseMap.map((item) => (
                <div key={item.id} className="text-sm">
                  <div className="font-medium text-muted-foreground">
                    If they say: "{item.trigger}"
                  </div>
                  <div className="ml-4 mt-1 border-l-2 border-primary/50 pl-3">
                    → {item.response}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              No response mappings
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
