import { useState } from "react";
import { Search, Shield, Upload, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { FileUpload } from "@/components/FileUpload";
import { LoadingState } from "@/components/LoadingState";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { LanguageToggle } from "@/components/LanguageToggle";
import heroImage from "@/assets/hero-image.jpg";

type AppState = "input" | "loading" | "results";

interface AnalysisResult {
  trustScore: number;
  verdict: "credible" | "uncertain" | "misleading";
  explanation: string;
  simplifiedExplanation: string;
  evidence: Array<{
    source: string;
    excerpt: string;
    url: string;
    date?: string;
    author?: string;
    credibilityRating?: "high" | "medium" | "low";
  }>;
}

export default function Satya() {
  const [appState, setAppState] = useState<AppState>("input");
  const [inputText, setInputText] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | undefined>();
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [results, setResults] = useState<AnalysisResult | null>(null);

  function getTrustScore() {
  let trustScore = Math.floor(Math.random() * 100);

  if (trustScore < 30) {
    console.log("Trust Score:", trustScore);
  } else {
    // Run again until condition is met
    getTrustScore();
  }
}

getTrustScore();




  const handleAnalysis = async () => {
    if (!inputText.trim() && !uploadedFile) return;
    
    setAppState("loading");

    
    
    // Simulate API call
    setTimeout(() => {
      // Mock results based on input
      const mockResults: AnalysisResult = {
        // trustScore: Math.floor(Math.random() * 100),
        trustScore: [12],
        verdict: ["credible", "uncertain", "misleading"][Math.floor(Math.random() * 3)] as any,
        explanation: "Based on our analysis of multiple verified sources, this information has been cross-referenced with established fact-checking databases and official statements from relevant authorities.",
        simplifiedExplanation: "We checked this information with trusted news sources and official websites. The facts don't match what reliable sources are saying.",
        evidence: [
          {
  "source": "Hindustan Times",
  "excerpt": "Live coverage and official briefings cited by Hindustan Times state there is no verified evidence that Pakistan carried out a border breach in Kashmir with preparations for a major attack; the newspaper’s reporting instead highlights denials, contradictory claims, and government/PIB fact-checks that debunk many viral posts. Rely on official statements and PIB fact-checks rather than unverified social media claims.",
  "url": "https://www.hindustantimes.com/india-news/india-pakistan-tension-live-updates-operation-sindoor-jammu-kashmir-loc-ballistic-missile-airports-noor-khan-latest-news-101746835729087.html",
  "date": "May 11, 2025",
  "author": "HT News Desk",
  "credibilityRating": "high"
}
,
{
  "source": "Press Information Bureau (PIB) — Fact Check Unit, Government of India",
  "excerpt": "PIB Fact Check has repeatedly flagged and debunked multiple viral claims and doctored videos circulated around the Operation 'Sindoor' / Kashmir incidents, labelling many such posts as false or propaganda; PIB’s fact-check documents show no official confirmation of a Pakistani ‘breach + planned major attack’ as described in the viral claim.",
  "url": "https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/may/doc2025510553101.pdf",
  "date": "May 2025",
  "author": "PIB Fact Check Unit, Press Information Bureau",
  "credibilityRating": "high"
}

        ]
      };
      
      setResults(mockResults);
      setAppState("results");
    }, 3000);
  };

  const handleReset = () => {
    setAppState("input");
    setInputText("");
    setUploadedFile(undefined);
    setResults(null);
  };

  const translations = {
    en: {
      title: "Satya",
      subtitle: "Verify Truth, Build Trust",
      description: "AI-powered fact-checking to combat misinformation. Get instant credibility analysis with evidence from reliable sources.",
      placeholder: "Paste news text, article link, or social media post here...",
      uploadText: "Or upload a screenshot/document",
      checkButton: "Check Credibility",
      newCheckButton: "Check New Content",
      features: {
        instant: "Instant Analysis",
        instantDesc: "Get results in seconds",
        reliable: "Verified Sources",
        reliableDesc: "Cross-referenced with trusted databases",
        multilingual: "Multilingual",
        multilingualDesc: "Available in multiple Indian languages"
      }
    },
    hi: {
      title: "सत्य",
      subtitle: "सत्य की जांच करें, विश्वास बनाएं",
      description: "गलत जानकारी से लड़ने के लिए AI-संचालित तथ्य-जांच। विश्वसनीय स्रोतों से प्रमाण के साथ तुरंत विश्वसनीयता विश्लेषण प्राप्त करें।",
      placeholder: "यहाँ समाचार पाठ, लेख लिंक, या सोशल मीडिया पोस्ट पेस्ट करें...",
      uploadText: "या स्क्रीनशॉट/दस्तावेज़ अपलोड करें",
      checkButton: "विश्वसनीयता जांचें",
      newCheckButton: "नई सामग्री जांचें",
      features: {
        instant: "तुरंत विश्लेषण",
        instantDesc: "सेकंडों में परिणाम पाएं",
        reliable: "सत्यापित स्रोत",
        reliableDesc: "विश्वसनीय डेटाबेस के साथ क्रॉस-रेफ़रेंस",
        multilingual: "बहुभाषी",
        multilingualDesc: "कई भारतीय भाषाओं में उपलब्ध"
      }
    }
  };

  const t = translations[language];

  if (appState === "loading") {
    return <LoadingState className="min-h-screen" />;
  }

  if (appState === "results" && results) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="mb-8 text-center">
            <Button
              variant="outline"
              onClick={handleReset}
              className="mb-4"
            >
              ← {t.newCheckButton}
            </Button>
            <h1 className="text-3xl font-bold gradient-text">{t.title}</h1>
          </div>
          
          <ResultsDisplay
            trustScore={results.trustScore}
            verdict={results.verdict}
            explanation={results.explanation}
            simplifiedExplanation={results.simplifiedExplanation}
            evidence={results.evidence}
            language={language}
            onLanguageChange={setLanguage}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">{t.title}</h1>
                <p className="text-sm text-muted-foreground">{t.subtitle}</p>
              </div>
            </div>
            <LanguageToggle
              currentLanguage={language}
              onLanguageChange={setLanguage}
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                {t.subtitle}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.description}
              </p>
              
              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-card border">
                  <Zap className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">{t.features.instant}</p>
                    <p className="text-xs text-muted-foreground">{t.features.instantDesc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-card border">
                  <Shield className="w-5 h-5 text-verified flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">{t.features.reliable}</p>
                    <p className="text-xs text-muted-foreground">{t.features.reliableDesc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-card border">
                  <Search className="w-5 h-5 text-accent flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">{t.features.multilingual}</p>
                    <p className="text-xs text-muted-foreground">{t.features.multilingualDesc}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src={heroImage}
                alt="Satya AI Fact Checking"
                className="w-full rounded-lg shadow-large"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Input Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="p-8 shadow-large">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold">Start Fact-Checking</h3>
                <p className="text-muted-foreground">
                  Enter content below to verify its credibility
                </p>
              </div>

              <div className="space-y-4">
                <Textarea
                  placeholder={t.placeholder}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[120px] resize-none"
                />

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      {t.uploadText}
                    </span>
                  </div>
                </div>

                <FileUpload
                  onFileUpload={setUploadedFile}
                  onRemoveFile={() => setUploadedFile(undefined)}
                  uploadedFile={uploadedFile}
                />

                <Button
                  onClick={handleAnalysis}
                  disabled={!inputText.trim() && !uploadedFile}
                  className="w-full h-12 text-lg font-semibold"
                  size="lg"
                >
                  <Search className="w-5 h-5 mr-2" />
                  {t.checkButton}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t bg-card">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Satya provides AI-powered credibility checks using reliable sources but does not replace human judgment.
          </p>
        </div>
      </footer>
    </div>
  );
}