import { useState } from "react";
import { useCVContext } from "@/contexts/CVContext";
import type { CVFormData, ToneStyle, ExportFormat } from "@/types/cv";
import { generateSummary, suggestSkills, atsOptimize, generateCoverLetter, generateLinkedInSummary } from "@/lib/mockAI";
import CV from "@/components/CV";
import MinimalTemplate from "@/components/templates/MinimalTemplate";
import BoldTemplate from "@/components/templates/BoldTemplate";
import ElegantTemplate from "@/components/templates/ElegantTemplate";
import FormalTemplate from "@/components/templates/FormalTemplate";
import AppShell from "@/components/AppShell";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft, Download, FileText, Wand2, Target, Sparkles,
  Linkedin, Mail, Trash2, Copy, Check, Loader2,
  PanelLeftClose, PanelLeft, Eye,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const tones: { value: ToneStyle; label: string; desc: string }[] = [
  { value: "formal", label: "Formal", desc: "Professional & corporate" },
  { value: "modern", label: "Modern", desc: "Clean & contemporary" },
  { value: "hustle-forward", label: "Hustle", desc: "Bold & entrepreneurial" },
  { value: "community-friendly", label: "Community", desc: "Warm & approachable" },
];

const templates = [
  { id: "formal", label: "Formal CV" },
  { id: "blueprint", label: "Blueprint" },
  { id: "minimal", label: "Minimal" },
  { id: "bold", label: "Bold" },
  { id: "elegant", label: "Elegant" },
];

export default function CVEditor() {
  const { cvData, clearData, setCvData } = useCVContext();
  const [activeTemplate, setActiveTemplate] = useState("formal");
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

  const handleGenerateSummary = async () => {
    setLoading("summary");
    const result = await generateSummary(cvData.name, cvData.title, selectedTone);
    setCvData({ ...cvData, summary: result });
    toast({ title: "Summary Generated", description: `${selectedTone} tone applied.` });
    setLoading(null);
  };

  const handleSuggestSkills = async () => {
    setLoading("skills");
    const result = await suggestSkills(cvData.title);
    setCvData({
      ...cvData,
      hardSkills: result.hard.map((s, i) => ({ label: s, level: 90 - i * 5 })),
      softSkills: result.soft,
    });
    toast({ title: "Skills Suggested", description: `${result.hard.length} hard + ${result.soft.length} soft skills added.` });
    setLoading(null);
  };

  const handleAtsOptimize = async () => {
    setLoading("ats");
    const result = await atsOptimize(cvData.summary || "", cvData.title);
    setCvData({ ...cvData, summary: result.optimized });
    setAtsScore(result.score);
    setAtsKeywords(result.keywords);
    setAtsEnabled(true);
    toast({ title: "ATS Optimized", description: `Score: ${result.score}%` });
    setLoading(null);
  };

  const handleCoverLetter = async () => {
    if (!targetCompany) { toast({ title: "Enter a company name", variant: "destructive" }); return; }
    setLoading("cover");
    setCoverLetter(await generateCoverLetter(cvData.name, cvData.title, targetCompany));
    setLoading(null);
  };

  const handleLinkedin = async () => {
    setLoading("linkedin");
    setLinkedinSummary(await generateLinkedInSummary(cvData.name, cvData.title, cvData.summary || ""));
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

  const templateData = {
    ...cvData,
    contact: { phone: cvData.phone, email: cvData.email, location: cvData.location, website: cvData.website || "" },
  };

  const renderTemplate = () => {
    switch (activeTemplate) {
      case "formal": return <FormalTemplate formData={templateData} />;
      case "blueprint": return <CV formData={templateData} />;
      case "minimal": return <MinimalTemplate formData={templateData} />;
      case "bold": return <BoldTemplate formData={templateData} />;
      case "elegant": return <ElegantTemplate formData={templateData} />;
      default: return <FormalTemplate formData={templateData} />;
    }
  };

  return (
    <AppShell
      statusText={`Editing: ${cvData.name} — ${activeTemplate.charAt(0).toUpperCase() + activeTemplate.slice(1)} template`}
      actions={
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={clearData} className="h-7 text-[11px] text-secondary-foreground/80 gap-1 px-2 hover:bg-secondary-foreground/10">
            <ArrowLeft className="w-3 h-3" /> Edit Form
          </Button>
        </div>
      }
    >
      <div className="flex h-full">
        {/* ─── Toolbar (vertical) ─── */}
        <div className="w-10 bg-card border-r border-border flex flex-col items-center py-2 gap-1 shrink-0 no-print">
          <ToolbarBtn icon={Wand2} label="AI" active={sidePanel === "ai"} onClick={() => setSidePanel(sidePanel === "ai" ? null : "ai")} />
          <ToolbarBtn icon={Target} label="ATS" active={sidePanel === "ats"} onClick={() => setSidePanel(sidePanel === "ats" ? null : "ats")} />
          <ToolbarBtn icon={Download} label="Export" active={sidePanel === "export"} onClick={() => setSidePanel(sidePanel === "export" ? null : "export")} />
          <div className="flex-1" />
          <ToolbarBtn
            icon={sidePanel ? PanelLeftClose : PanelLeft}
            label={sidePanel ? "Hide" : "Show"}
            onClick={() => setSidePanel(sidePanel ? null : "ai")}
          />
        </div>

        {/* ─── Side Panel ─── */}
        {sidePanel && (
          <ScrollArea className="w-72 xl:w-80 bg-card border-r border-border no-print">
            <div className="p-4 space-y-4">
              {sidePanel === "ai" && (
                <>
                  <PanelTitle icon={Sparkles} label="AI Assistant" />
                  <div>
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Tone</Label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {tones.map((t) => (
                        <button
                          key={t.value}
                          onClick={() => setSelectedTone(t.value)}
                          className={`p-2 rounded border text-left transition-all ${
                            selectedTone === t.value
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border bg-background hover:bg-muted text-foreground"
                          }`}
                        >
                          <span className="text-xs font-medium block">{t.label}</span>
                          <span className="text-[10px] text-muted-foreground">{t.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button onClick={handleGenerateSummary} disabled={loading === "summary"} className="w-full gap-1.5 h-9 text-xs">
                    {loading === "summary" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                    Generate Summary
                  </Button>
                  <Button onClick={handleSuggestSkills} disabled={loading === "skills"} variant="outline" className="w-full gap-1.5 h-9 text-xs">
                    {loading === "skills" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                    Suggest Skills
                  </Button>
                  <div className="border-t border-border pt-3">
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">LinkedIn Summary</Label>
                    <Button onClick={handleLinkedin} disabled={loading === "linkedin"} variant="outline" className="w-full gap-1.5 h-9 text-xs">
                      {loading === "linkedin" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Linkedin className="w-3.5 h-3.5" />}
                      Generate
                    </Button>
                    {linkedinSummary && (
                      <div className="mt-2 p-2 bg-background rounded border border-border">
                        <pre className="text-[11px] whitespace-pre-wrap text-foreground">{linkedinSummary}</pre>
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(linkedinSummary, "LinkedIn Summary")} className="mt-1 gap-1 h-6 text-[10px]">
                          {copied === "LinkedIn Summary" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} Copy
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="border-t border-border pt-3">
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Cover Letter</Label>
                    <Input value={targetCompany} onChange={(e) => setTargetCompany(e.target.value)} placeholder="Target company" className="h-8 text-sm mb-1.5" />
                    <Button onClick={handleCoverLetter} disabled={loading === "cover"} variant="outline" className="w-full gap-1.5 h-9 text-xs">
                      {loading === "cover" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Mail className="w-3.5 h-3.5" />}
                      Generate
                    </Button>
                    {coverLetter && (
                      <div className="mt-2 p-2 bg-background rounded border border-border">
                        <pre className="text-[11px] whitespace-pre-wrap text-foreground">{coverLetter}</pre>
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(coverLetter, "Cover Letter")} className="mt-1 gap-1 h-6 text-[10px]">
                          {copied === "Cover Letter" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} Copy
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              )}

              {sidePanel === "ats" && (
                <>
                  <PanelTitle icon={Target} label="ATS Optimizer" />
                  <div className="flex items-center gap-2">
                    <Switch checked={atsEnabled} onCheckedChange={setAtsEnabled} />
                    <Label className="text-xs">ATS Optimization</Label>
                  </div>
                  <Button onClick={handleAtsOptimize} disabled={loading === "ats"} className="w-full gap-1.5 h-9 text-xs">
                    {loading === "ats" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Target className="w-3.5 h-3.5" />}
                    Optimize
                  </Button>
                  {atsScore !== null && (
                    <div className="space-y-3">
                      <div className="text-center p-3 bg-background rounded border border-border">
                        <div className="text-3xl font-bold text-primary font-[Oswald]">{atsScore}%</div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">Compatibility Score</div>
                      </div>
                      <div>
                        <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Keywords</Label>
                        <div className="flex flex-wrap gap-1">
                          {atsKeywords.map((k) => (
                            <span key={k} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">{k}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {sidePanel === "export" && (
                <>
                  <PanelTitle icon={Download} label="Export & Privacy" />
                  <div className="space-y-1.5">
                    {(["pdf", "docx", "txt"] as ExportFormat[]).map((fmt) => (
                      <Button key={fmt} onClick={() => handleExport(fmt)} variant="outline" className="w-full justify-start gap-2 h-9 text-xs">
                        <FileText className="w-3.5 h-3.5" /> Export as {fmt.toUpperCase()}
                      </Button>
                    ))}
                  </div>
                  <div className="border-t border-border pt-3">
                    <p className="text-[10px] text-muted-foreground mb-2">🔒 All processing happens locally. No data sent to any server.</p>
                    <Button onClick={() => { clearData(); toast({ title: "Data Erased" }); }} variant="destructive" className="w-full gap-1.5 h-9 text-xs">
                      <Trash2 className="w-3.5 h-3.5" /> Erase All Data
                    </Button>
                  </div>
                </>
              )}
            </div>
          </ScrollArea>
        )}

        {/* ─── CV Preview ─── */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Template Toolbar */}
          <div className="h-9 bg-muted border-b border-border flex items-center px-3 gap-2 shrink-0 no-print">
            <Eye className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mr-2">Preview</span>
            <Tabs value={activeTemplate} onValueChange={setActiveTemplate} className="flex-1">
              <TabsList className="h-7 bg-transparent p-0 gap-0">
                {templates.map((t) => (
                  <TabsTrigger
                    key={t.id}
                    value={t.id}
                    className="h-7 text-[11px] px-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    {t.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Scrollable Preview */}
          <ScrollArea className="flex-1 bg-muted/50">
            <div className="flex justify-center py-6 print:py-0 print:bg-card">
              {renderTemplate()}
            </div>
          </ScrollArea>
        </div>
      </div>
    </AppShell>
  );
}

function ToolbarBtn({ icon: Icon, label, active, onClick }: { icon: React.ElementType; label: string; active?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${
        active ? "bg-primary text-primary-foreground" : "text-foreground/60 hover:bg-muted hover:text-foreground"
      }`}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}

function PanelTitle({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <h3 className="font-[Oswald] text-sm font-semibold flex items-center gap-1.5 uppercase tracking-wide text-foreground">
      <Icon className="w-4 h-4 text-primary" /> {label}
    </h3>
  );
}
