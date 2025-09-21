import { useState } from "react";
import { CheckCircle, AlertTriangle, XCircle, Eye, EyeOff, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrustMeter } from "./TrustMeter";
import { EvidenceCard } from "./EvidenceCard";
import { LanguageToggle } from "./LanguageToggle";
import { cn } from "@/lib/utils";

interface Evidence {
  source: string;
  excerpt: string;
  url: string;
  date?: string;
  author?: string;
  credibilityRating?: "high" | "medium" | "low";
}

interface ResultsDisplayProps {
  trustScore: number;
  verdict: "credible" | "uncertain" | "misleading";
  explanation: string;
  simplifiedExplanation: string;
  evidence: Evidence[];
  language: "en" | "hi";
  onLanguageChange: (language: "en" | "hi") => void;
  className?: string;
}

export function ResultsDisplay({
  trustScore,
  verdict,
  explanation,
  simplifiedExplanation,
  evidence,
  language,
  onLanguageChange,
  className
}: ResultsDisplayProps) {
  const [showSimplified, setShowSimplified] = useState(false);

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case "credible":
        return <CheckCircle className="w-6 h-6 text-verified" />;
      case "uncertain":
        return <AlertTriangle className="w-6 h-6 text-uncertain" />;
      case "misleading":
        return <XCircle className="w-6 h-6 text-false" />;
      default:
        return <AlertTriangle className="w-6 h-6 text-uncertain" />;
    }
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case "credible": return "verified";
      case "uncertain": return "uncertain";
      case "misleading": return "false";
      default: return "uncertain";
    }
  };

  const getVerdictText = (verdict: string) => {
    const texts = {
      en: {
        credible: "This information appears credible",
        uncertain: "This information is uncertain",
        misleading: "This information appears misleading"
      },
      hi: {
        credible: "यह जानकारी विश्वसनीय लगती है",
        uncertain: "यह जानकारी अनिश्चित है", 
        misleading: "यह जानकारी भ्रामक लगती है"
      }
    };
    return texts[language][verdict as keyof typeof texts.en] || texts[language].uncertain;
  };

  const verdictColor = getVerdictColor(verdict);

  const translations = {
    en: {
      explanation: "Detailed Explanation",
      simplified: "Simple Explanation",
      evidence: "Evidence from Reliable Sources",
      showSimple: "Show Simple Version",
      showDetailed: "Show Detailed Version",
      noEvidence: "No additional evidence found for this content."
    },
    hi: {
      explanation: "विस्तृत स्पष्टीकरण",
      simplified: "सरल स्पष्टीकरण",
      evidence: "विश्वसनीय स्रोतों से प्रमाण",
      showSimple: "सरल संस्करण दिखाएं",
      showDetailed: "विस्तृत संस्करण दिखाएं",
      noEvidence: "इस सामग्री के लिए कोई अतिरिक्त प्रमाण नहीं मिला।"
    }
  };

  const t = translations[language];

  return (
    <div className={cn("space-y-6", className)}>
      {/* Language Toggle */}
      <div className="flex justify-end">
        <LanguageToggle
          currentLanguage={language}
          onLanguageChange={onLanguageChange}
        />
      </div>

      {/* Verdict Card */}
      <Card className="p-6 space-y-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            {getVerdictIcon(verdict)}
          </div>
          <div className="flex-1 space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              {getVerdictText(verdict)}
            </h2>
            <TrustMeter score={trustScore} size="lg" />
          </div>
        </div>
      </Card>

      {/* Explanation Card */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-accent" />
            {showSimplified ? t.simplified : t.explanation}
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSimplified(!showSimplified)}
            className="flex items-center gap-2"
          >
            {showSimplified ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            {showSimplified ? t.showDetailed : t.showSimple}
          </Button>
        </div>
        
        <div className={cn(
          "p-4 rounded-lg border-l-4 transition-colors",
          verdictColor === "verified" && "bg-verified/5 border-verified",
          verdictColor === "uncertain" && "bg-uncertain/5 border-uncertain",
          verdictColor === "false" && "bg-false/5 border-false"
        )}>
          <p className="text-sm leading-relaxed">
            {showSimplified ? simplifiedExplanation : explanation}
          </p>
        </div>
      </Card>

      {/* Evidence Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{t.evidence}</h3>
        {evidence.length > 0 ? (
          <div className="grid gap-4">
            {evidence.map((item, index) => (
              <EvidenceCard
                key={index}
                source={item.source}
                excerpt={item.excerpt}
                url={item.url}
                date={item.date}
                author={item.author}
                credibilityRating={item.credibilityRating}
              />
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center">
            <p className="text-muted-foreground text-sm">{t.noEvidence}</p>
          </Card>
        )}
      </div>
    </div>
  );
}