import React, { createContext, useContext, useState, useCallback } from "react";
import type { CVFormData } from "@/types/cv";

type AppStep = "intake" | "editor";

interface CVContextValue {
  step: AppStep;
  setStep: (s: AppStep) => void;
  cvData: CVFormData | null;
  setCvData: (d: CVFormData) => void;
  clearData: () => void;
}

const CVContext = createContext<CVContextValue | null>(null);

export function CVProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<AppStep>("intake");
  const [cvData, setCvDataState] = useState<CVFormData | null>(null);

  const setCvData = useCallback((d: CVFormData) => {
    setCvDataState(d);
    setStep("editor");
  }, []);

  const clearData = useCallback(() => {
    setCvDataState(null);
    setStep("intake");
  }, []);

  return (
    <CVContext.Provider value={{ step, setStep, cvData, setCvData, clearData }}>
      {children}
    </CVContext.Provider>
  );
}

export function useCVContext() {
  const ctx = useContext(CVContext);
  if (!ctx) throw new Error("useCVContext must be used within CVProvider");
  return ctx;
}
