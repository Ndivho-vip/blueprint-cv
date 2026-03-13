import { CVProvider, useCVContext } from "@/contexts/CVContext";
import IntakeForm from "@/components/intake/IntakeForm";
import CVEditor from "@/components/editor/CVEditor";

const CVApp = () => {
  const { step } = useCVContext();
  return step === "intake" ? <IntakeForm /> : <CVEditor />;
};

const Index = () => (
  <CVProvider>
    <CVApp />
  </CVProvider>
);

export default Index;
