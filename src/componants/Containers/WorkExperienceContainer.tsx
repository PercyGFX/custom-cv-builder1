import { useEffect, useRef, useState } from "react";
import WorkExperience from "../WorkExperience";

// work experience compoannt
const WorkExperienceContainer = ({ onRemove  } : any) => {
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  


  const handleMouseEnter = () => {
    setShowRemoveButton(true);
  };

  const handleMouseLeave = () => {
    setShowRemoveButton(false);
  };

  const handleRemoveWorkExperience = () => {
    onRemove();
  };

  return (
    <div
      className={showRemoveButton ? `pb-4` : ``}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="m-2" >
        <WorkExperience />
      </div>

      <button
        className="hideOnPrint m-2 bg-red-500 text-white px-2 py-1 rounded"
        onClick={handleRemoveWorkExperience}
      >
        Remove
      </button>
    </div>
  );
};

export default WorkExperienceContainer;
