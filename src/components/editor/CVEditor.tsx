import { useState } from "react";
import { useCVContext } from "@/contexts/CVContext";
import type { CVFormData, ToneStyle, ExportFormat } from "@/types/cv";
import { generateSummary, suggestSkills, atsOptimize, generateCoverLetter, generateLinkedInSummary } from "@/lib/mockAI";
import CV from "@/components/CV";
import MinimalTemplate from "@/components/templates/MinimalTemplate";
import BoldTemplate from "@/components/templates/BoldTemplate";
import ElegantTemplate from "@/components/templates/ElegantTemplate";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft, Download, FileText, Wand2, Target, Sparkles,
  Linkedin, Mail, Trash2, Copy, Check, Loader2,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const tones: { value: ToneStyle; label: string; desc: string }[] = [
  { value: "formal", label: "Formal", desc: "Professional & corporate" },
  { value: "modern", label: "Modern", desc: "Clean & contemporary" },
  { value: "hustle-forward", label: "Hustle", desc: "Bold & entrepreneurial" },
  { value: "community-friendly", label: "Community", desc: "Warm & approachable" },
];

const templates = [
  { id: "blueprint", label: "Blueprint" },
  { id: "minimal", label: "Minimal" },
  { id: "bold", label: "Bold" },
  { id: "elegant", label: "Elegant" },
];

export default function CVEditor() {
  const { cvData, clearData, setCvData } = useCVContext();
  const [activeTemplate, setActiveTemplate] = useState("blueprint");
  const [selectedTone, setSelectedTone] = useState<ToneStyle>("modern");
  const [atsEnabled, setAtsEnabled] = useState(false);
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [atsKeywords, setAtsKeywords] = useState<string[]>([]);
  const [loading, setLoading] = useState<string | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [linkedinSummary, setLinkedinSummary] = useState("");
  const [targetCompany, setTargetCompany] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [sidePanel, setSidePanel] = useState<"ai" | "export" | "ats" | null>("ai");

  if (!cvData) return null;

  // Update the shared cvData used by old templates via the data module
  const updateCvDataModule = (data: CVFormData) => {
    // Update the cvData export so templates pick it up
    (window as any).__cvData = data;
  };

  const handleGenerateSummary = async () => {
    setLoading("summary");
    const result = await generateSummary(cvData.name, cvData.title, selectedTone);
    const updated = { ...cvData, summary: result };
    setCvData(updated);
    toast({ title: "Summary Generated", description: `${selectedTone} tone applied.` });
    setLoading(null);
  };

  const handleSuggestSkills = async () => {
    setLoading("skills");
    const result = await suggestSkills(cvData.title);
    const updated = {
      ...cvData,
      hardSkills: result.hard.map((s, i) => ({ label: s, level: 90 - i * 5 })),
      softSkills: result.soft,
    };
    setCvData(updated);
    toast({ title: "Skills Suggested", description: `${result.hard.length} hard + ${result.soft.length} soft skills added.` });
    setLoading(null);
  };

  const handleAtsOptimize = async () => {
    setLoading("ats");
    const result = await atsOptimize(cvData.summary || "", cvData.title);
    const updated = { ...cvData, summary: result.optimized };
    setCvData(updated);
    setAtsScore(result.score);
    setAtsKeywords(result.keywords);
    setAtsEnabled(true);
    toast({ title: "ATS Optimized", description: `Score: ${result.score}%` });
    setLoading(null);
  };

  const handleCoverLetter = async () => {
    if (!targetCompany) {
      toast({ title: "Enter a company name", variant: "destructive" });
      return;
    }
    setLoading("cover");
    const result = await generateCoverLetter(cvData.name, cvData.title, targetCompany);
    setCoverLetter(result);
    setLoading(null);
  };

  const handleLinkedin = async () => {
    setLoading("linkedin");
    const result = await generateLinkedInSummary(cvData.name, cvData.title, cvData.summary || "");
    setLinkedinSummary(result);
    setLoading(null);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
    toast({ title: "Copied!", description: `${label} copied to clipboard.` });
  };

  const handleExport = (format: ExportFormat) => {
    if (format === "pdf") {
      window.print();
    } else if (format === "txt") {
      const txt = `${cvData.name}\n${cvData.title}\n\n${cvData.summary}\n\nExperience:\n${cvData.experience.map((e) => `${e.title} at ${e.org} (${e.period})\n${e.bullets.join("\n")}`).join("\n\n")}`;
      const blob = new Blob([txt], { type: "text/plain" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${cvData.name.replace(/\s+/g, "_")}_CV.txt`;
      a.click();
      toast({ title: "Exported", description: "Plain text CV downloaded." });
    } else {
      toast({ title: "Coming Soon", description: `${format.toUpperCase()} export will be available soon.` });
    }
  };

  const handleEraseData = () => {
    clearData();
    toast({ title: "Data Erased", description: "All your data has been deleted." });
  };

  // Map cvData to the format expected by templates
  const templateData = {
    ...cvData,
    contact: { phone: cvData.phone, email: cvData.email, location: cvData.location, website: cvData.website || "" },
  };
  // Inject into global for template consumption
  (window as any).__cvFormData = templateData;

  const renderTemplate = () => {
    switch (activeTemplate) {
      case "blueprint": return <CV formData={templateData} />;
      case "minimal": return <MinimalTemplate formData={templateData} />;
      case "bold": return <BoldTemplate formData={templateData} />;
      case "elegant": return <ElegantTemplate formData={templateData} />;
      default: return <CV formData={templateData} />;
    }
  };

  return (
    <div className="min-h-screen bg-muted">
      {/* Top Bar */}
      <div className="no-print sticky top-0 z-50 bg-card border-b border-border px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={clearData} className="gap-1">
            <ArrowLeft className="w-4 h-4" /> Edit Form
          </Button>
          <span className="text-sm font-medium text-foreground hidden md:inline">{cvData.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={sidePanel === "ai" ? "default" : "outline"} size="sm" onClick={() => setSidePanel(sidePanel === "ai" ? null : "ai")} className="gap-1">
            <Wand2 className="w-4 h-4" /> AI
          </Button>
          <Button variant={sidePanel === "ats" ? "default" : "outline"} size="sm" onClick={() => setSidePanel(sidePanel === "ats" ? null : "ats")} className="gap-1">
            <Target className="w-4 h-4" /> ATS
          </Button>
          <Button variant={sidePanel === "export" ? "default" : "outline"} size="sm" onClick={() => setSidePanel(sidePanel === "export" ? null : "export")} className="gap-1">
            <Download className="w-4 h-4" /> Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Side Panel */}
        {sidePanel && (
          <div className="no-print w-full lg:w-80 xl:w-96 bg-card border-b lg:border-b-0 lg:border-r border-border p-4 lg:min-h-[calc(100vh-57px)] overflow-y-auto">
            {/* AI Panel */}
            {sidePanel === "ai" && (
              <div className="space-y-5">
                <h3 className="font-[Oswald] text-lg font-semibold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" /> AI Assistant
                </h3>

                {/* Tone Selection */}
                <div>
                  <Label className="text-xs font-semibold mb-2 block">Tone & Style</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {tones.map((t) => (
                      <button
                        key={t.value}
                        onClick={() => setSelectedTone(t.value)}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          selectedTone === t.value
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-background hover:bg-muted"
                        }`}
                      >
                        <span className="text-sm font-medium block">{t.label}</span>
                        <span className="text-xs text-muted-foreground">{t.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <Button onClick={handleGenerateSummary} disabled={loading === "summary"} className="w-full gap-2 h-11">
                  {loading === "summary" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                  Generate Summary
                </Button>

                <Button onClick={handleSuggestSkills} disabled={loading === "skills"} variant="outline" className="w-full gap-2 h-11">
                  {loading === "skills" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  Suggest Skills
                </Button>

                <div className="border-t border-border pt-4">
                  <Label className="text-xs font-semibold mb-2 block">LinkedIn Summary</Label>
                  <Button onClick={handleLinkedin} disabled={loading === "linkedin"} variant="outline" className="w-full gap-2 h-11">
                    {loading === "linkedin" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Linkedin className="w-4 h-4" />}
                    Generate LinkedIn Summary
                  </Button>
                  {linkedinSummary && (
                    <div className="mt-3 p-3 bg-background rounded-lg border border-border">
                      <pre className="text-xs whitespace-pre-wrap text-foreground">{linkedinSummary}</pre>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(linkedinSummary, "LinkedIn Summary")} className="mt-2 gap-1">
                        {copied === "LinkedIn Summary" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} Copy
                      </Button>
                    </div>
                  )}
                </div>

                <div className="border-t border-border pt-4">
                  <Label className="text-xs font-semibold mb-2 block">Cover Letter</Label>
                  <Input
                    value={targetCompany}
                    onChange={(e) => setTargetCompany(e.target.value)}
                    placeholder="Target company name"
                    className="h-10 mb-2"
                  />
                  <Button onClick={handleCoverLetter} disabled={loading === "cover"} variant="outline" className="w-full gap-2 h-11">
                    {loading === "cover" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                    Generate Cover Letter
                  </Button>
                  {coverLetter && (
                    <div className="mt-3 p-3 bg-background rounded-lg border border-border">
                      <pre className="text-xs whitespace-pre-wrap text-foreground">{coverLetter}</pre>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(coverLetter, "Cover Letter")} className="mt-2 gap-1">
                        {copied === "Cover Letter" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} Copy
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ATS Panel */}
            {sidePanel === "ats" && (
              <div className="space-y-5">
                <h3 className="font-[Oswald] text-lg font-semibold flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" /> ATS Optimizer
                </h3>
                <div className="flex items-center gap-3">
                  <Switch checked={atsEnabled} onCheckedChange={setAtsEnabled} />
                  <Label className="text-sm">ATS Optimization</Label>
                </div>
                <Button onClick={handleAtsOptimize} disabled={loading === "ats"} className="w-full gap-2 h-11">
                  {loading === "ats" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Target className="w-4 h-4" />}
                  Optimize for ATS
                </Button>
                {atsScore !== null && (
                  <div className="space-y-3">
                    <div className="text-center p-4 bg-background rounded-lg border border-border">
                      <div className="text-4xl font-bold text-primary font-[Oswald]">{atsScore}%</div>
                      <div className="text-xs text-muted-foreground mt-1">ATS Compatibility Score</div>
                    </div>
                    <div>
                      <Label className="text-xs font-semibold mb-2 block">Keywords Found</Label>
                      <div className="flex flex-wrap gap-1.5">
                        {atsKeywords.map((k) => (
                          <span key={k} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{k}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Export Panel */}
            {sidePanel === "export" && (
              <div className="space-y-5">
                <h3 className="font-[Oswald] text-lg font-semibold flex items-center gap-2">
                  <Download className="w-5 h-5 text-primary" /> Export & Privacy
                </h3>
                <div className="space-y-2">
                  {(["pdf", "docx", "txt"] as ExportFormat[]).map((fmt) => (
                    <Button key={fmt} onClick={() => handleExport(fmt)} variant="outline" className="w-full justify-start gap-2 h-11">
                      <FileText className="w-4 h-4" /> Export as {fmt.toUpperCase()}
                    </Button>
                  ))}
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground mb-3">
                    🔒 All processing happens locally in your browser. No data is sent to any server.
                  </p>
                  <Button onClick={handleEraseData} variant="destructive" className="w-full gap-2 h-11">
                    <Trash2 className="w-4 h-4" /> Erase All Data & Start Over
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CV Preview */}
        <div className="flex-1 flex flex-col items-center py-4 print:py-0 print:bg-white overflow-auto">
          {/* Template Tabs */}
          <Tabs value={activeTemplate} onValueChange={setActiveTemplate} className="w-full flex flex-col items-center">
            <TabsList className="mb-4 no-print">
              {templates.map((t) => (
                <TabsTrigger key={t.id} value={t.id} className="text-xs px-4">
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {templates.map((t) => (
              <TabsContent key={t.id} value={t.id}>
                {activeTemplate === t.id && renderTemplate()}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
