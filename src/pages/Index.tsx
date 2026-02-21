import { useState } from "react";
import CV from "@/components/CV";
import MinimalTemplate from "@/components/templates/MinimalTemplate";
import BoldTemplate from "@/components/templates/BoldTemplate";
import ElegantTemplate from "@/components/templates/ElegantTemplate";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const templates = [
  { id: "blueprint", label: "Blueprint", component: <CV /> },
  { id: "minimal", label: "Minimal", component: <MinimalTemplate /> },
  { id: "bold", label: "Bold", component: <BoldTemplate /> },
  { id: "elegant", label: "Elegant", component: <ElegantTemplate /> },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-muted flex flex-col items-center py-4 print:py-0 print:bg-white">
      <Tabs defaultValue="blueprint" className="w-full flex flex-col items-center">
        <TabsList className="mb-4 no-print">
          {templates.map((t) => (
            <TabsTrigger key={t.id} value={t.id} className="text-xs px-4">
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {templates.map((t) => (
          <TabsContent key={t.id} value={t.id}>
            {t.component}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Index;
