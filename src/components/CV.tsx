import CVSidebar from "./CVSidebar";
import CVMain from "./CVMain";

const CV = ({ formData }: { formData?: any }) => {
  return (
    <div className="a4-page grid grid-cols-[30%_70%] bg-card">
      <CVSidebar data={formData} />
      <CVMain data={formData} />
    </div>
  );
};

export default CV;
