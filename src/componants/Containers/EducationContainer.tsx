import Education from "../Education";
import { useState } from "react";

const EducationContainer = ({ onRemove } :any) => {
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  

  const handleMouseEnter = () => {
    setShowRemoveButton(true);
  };

  const handleMouseLeave = () => {
    setShowRemoveButton(false);
  };

  const handleRemoveEducation = () => {
    onRemove();
  };

  return (
    <div
      className={showRemoveButton ? `pb-4` : ``}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        <Education />
      </div>

      <button
        className="hideOnPrint m-2 bg-red-500 text-white px-2 py-1 rounded"
        onClick={handleRemoveEducation}
      >
        Remove
      </button>
    </div>
  );
};

export default EducationContainer;
