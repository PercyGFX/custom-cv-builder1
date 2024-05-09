import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import ReactToPrint from "react-to-print";
import Bio from "./Bio";
import Skills from "./Skills";
import Contact from "./Contact";
import WorkExperience from "./WorkExperience";
import Education from "./Education";
import PageBreak from "./PageBreak";

function CV() {
  const componentRef = React.useRef();
  const [components, setComponents] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const [rightHeight, setRightHeight] = useState(0);
  const [totalHeight, setTotalHeight] = useState(0);

  const rightSideRef = useRef(null);

  useEffect(() => {
    const { offsetHeight } = rightSideRef.current;
    setRightHeight(offsetHeight);
  }, [components]);

  useEffect(() => {
    const { offsetHeight } = componentRef.current;
    setTotalHeight(offsetHeight);
  }, [components]);

  const handleAddComponent = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setSelectedComponent(null);
  };

  const handleSelectComponent = (component) => {
    setSelectedComponent(component);
  };

  const handleConfirmAddComponent = () => {
    if (selectedComponent === "WorkExperience") {
      setComponents([
        ...components,
        <WorkExperienceContainer
          key={components.length}
          totalHeight={totalHeight}
        />,
      ]);
    } else if (selectedComponent === "Education") {
      setComponents([
        ...components,
        <EducationContainer key={components.length} />,
      ]);
    }
    handleCloseAddModal();
  };

  const handleRemoveComponent = (index) => {
    setComponents(components.filter((_, i) => i !== index));
  };

  const handlePrint = useReactToPrint({
    content: () => {
      return componentRef.current;
    },
  });

  return (
    <>
      <div className=" flex justify-center">
        <button
          className="m-4 bg-rose-600 rounded-full px-5 py-2 text-center drop-shadow-md my-2 hover:bg-rose-500 cursor-pointer text-white"
          onClick={handlePrint}
        >
          Download / Print
        </button>
      </div>
      <div className="flex justify-center border">
        <div ref={componentRef}>
          <div className="shadow-lg ">
            <div className="w-[1000px] flex p-4  m-2">
              <div className=" w-[300px] shadow-md p-4 overflow-x-hidden">
                <Bio />
                <Skills />
                <Contact />
              </div>
              <div className="px-6 w-[700px]" ref={rightSideRef}>
                {components.map((component, index) =>
                  React.cloneElement(component, {
                    key: index,
                    onRemove: () => handleRemoveComponent(index),
                  })
                )}
                {rightHeight > 1200 && <PageBreak />}
                <div className="flex justify-center hideOnPrint border-4 border-dotted border-lime-500 py-10">
                  <button
                    onClick={handleAddComponent}
                    className=" m-4 bg-lime-600 rounded-md px-5 py-2 text-center drop-shadow-md my-2 hover:bg-lime-700 cursor-pointer text-white"
                  >
                    Add Component
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Add</h2>
            <div className="mb-4">
              <button
                className={`mr-4 px-4 py-2 rounded ${
                  selectedComponent === "WorkExperience"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleSelectComponent("WorkExperience")}
              >
                Work Experience
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  selectedComponent === "Education"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleSelectComponent("Education")}
              >
                Education
              </button>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-200 px-4 py-2 rounded mr-2"
                onClick={handleCloseAddModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleConfirmAddComponent}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const WorkExperienceContainer = ({ onRemove }) => {
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
      <div className="m-2">
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

const EducationContainer = ({ onRemove }) => {
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
      <div className="">
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

export default CV;
