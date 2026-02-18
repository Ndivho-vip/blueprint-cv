import CVSidebar from "./CVSidebar";
import CVMain from "./CVMain";

const CV = () => {
  return (
    <div className="a4-page grid grid-cols-[30%_70%] bg-card">
      <CVSidebar />
      <CVMain />
    </div>
  );
};

export default CV;
