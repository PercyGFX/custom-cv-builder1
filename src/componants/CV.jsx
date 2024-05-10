import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Bio from "./Bio";
import Skills from "./Skills";
import Contact from "./Contact";
import WorkExperience from "./WorkExperience";
import Education from "./Education";
import PageBreak from "./PageBreak";

function CV() {
  // print componant ref
  const componentRef = useRef();

  // -------------------- Right Side Componants -----------------------//
  // right side componants array
  const [components, setComponents] = useState([]);
  // show modal for right side
  const [showAddModal, setShowAddModal] = useState(false);
  // selected componant for right side
  const [selectedComponent, setSelectedComponent] = useState(null);

  // -------------------- Left Side Componants -----------------------//

  // right side componants array
  const [componentsLeft, setComponentsLeft] = useState([]);
  // show modal for right side
  const [showAddModalLeft, setShowAddModalLeft] = useState(false);
  // selected componant for right side
  const [selectedComponentLeft, setSelectedComponentLeft] = useState(null);

  //------------------------------------------------------------------//

  const [componentHeights, setComponentHeights] = useState([]);
  const [totalHeight, setTotalHeight] = useState(0);

  const [currentPageHeight, setCurrentPageHeight] = useState(0);

useEffect(() => {
  const updatedCurrentPageHeight =
    currentPageHeight + componentHeights[components.length - 1];
  setCurrentPageHeight(updatedCurrentPageHeight);
}, [components, componentHeights, currentPageHeight]);

  const handleAddComponent = () => {
    setShowAddModal(true);
  };

  const handleAddComponentLeft = () => {
    setShowAddModalLeft(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setSelectedComponent(null);
  };

  

    const handleCloseAddModalLeft = () => {
      setShowAddModalLeft(false);
      setSelectedComponentLeft(null);
    };

  const handleSelectComponent = (component) => {
    setSelectedComponent(component);
  };

   const handleSelectComponentLeft = (component) => {
     setSelectedComponentLeft(component);
   };

  const handleConfirmAddComponent = () => {
    if (selectedComponent === "WorkExperience") {
      setComponents([...components, WorkExperienceContainer]);
    } else if (selectedComponent === "Education") {
      setComponents([...components, EducationContainer]);
    }
    handleCloseAddModal();
  };

  const handleConfirmAddComponentLeft = () => {
    if (selectedComponentLeft === "Skills") {
      setComponentsLeft([...componentsLeft, SkillsContainer]);
    } else if (selectedComponentLeft === "Contact") {
      setComponentsLeft([...componentsLeft, ContactContainer]);
    }
    handleCloseAddModalLeft();
  };

  ;

  const handleRemoveComponent = (index) => {
    setComponents(components.filter((_, i) => i !== index));
    setComponentHeights((prevHeights) =>
      prevHeights.filter((_, i) => i !== index)
    );
  };

    const handleRemoveComponentLeft = (index) => {
      setComponentsLeft(componentsLeft.filter((_, i) => i !== index));
      setComponentHeights((prevHeights) =>
        prevHeights.filter((_, i) => i !== index)
      );
    };

  // print function
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
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
                {/* <Skills />
                <Contact /> */}
                {/* left side componants */}

                {componentsLeft.map((Component, index) => (
                  <React.Fragment key={index}>
                    <Component
                      onRemove={() => handleRemoveComponentLeft(index)}
                    />
                  </React.Fragment>
                ))}
                <div className="flex justify-center hideOnPrint border-4 border-dotted border-lime-500 py-10">
                  <button
                    onClick={handleAddComponentLeft}
                    className=" m-4 bg-lime-600 rounded-md px-5 py-2 text-center drop-shadow-md my-2 hover:bg-lime-700 cursor-pointer text-white"
                  >
                    Add Component
                  </button>
                </div>
              </div>
              <div className="px-6 w-[700px]">
                {/* array map right side componants */}
                {(() => {
                  let currentPageComponents = [];
                  let currentPageHeight = 0;
                  const renderedPages = [];

                  const addPageBreak = () => {
                    if (currentPageComponents.length > 0) {
                      renderedPages.push(
                        <React.Fragment key={`page-${renderedPages.length}`}>
                          {currentPageComponents}
                          <PageBreak />
                        </React.Fragment>
                      );
                      currentPageComponents = [];
                      currentPageHeight = 0;
                    }
                  };

                  for (let i = 0; i < components.length; i++) {
                    const Component = components[i];
                    const height = componentHeights[i];

                    if (i === 0) {
                      currentPageHeight += height;
                      currentPageComponents.push(
                        <Component
                          key={`component-${i}`}
                          onRemove={() => handleRemoveComponent(i)}
                          setHeight={(height) =>
                            setComponentHeights((prevHeights) => {
                              const newHeights = [...prevHeights];
                              newHeights[i] = height;
                              return newHeights;
                            })
                          }
                        />
                      );
                    } else if (currentPageHeight + height > 1200) {
                      addPageBreak();
                      currentPageHeight = height;
                      currentPageComponents.push(
                        <Component
                          key={`component-${i}`}
                          onRemove={() => handleRemoveComponent(i)}
                          setHeight={(height) =>
                            setComponentHeights((prevHeights) => {
                              const newHeights = [...prevHeights];
                              newHeights[i] = height;
                              return newHeights;
                            })
                          }
                        />
                      );
                    } else {
                      currentPageHeight += height;
                      currentPageComponents.push(
                        <Component
                          key={`component-${i}`}
                          onRemove={() => handleRemoveComponent(i)}
                          setHeight={(height) =>
                            setComponentHeights((prevHeights) => {
                              const newHeights = [...prevHeights];
                              newHeights[i] = height;
                              return newHeights;
                            })
                          }
                        />
                      );
                    }
                  }

                  if (currentPageComponents.length > 0) {
                    renderedPages.push(
                      <React.Fragment key={`page-${renderedPages.length}`}>
                        {currentPageComponents}
                      </React.Fragment>
                    );
                  }

                  return renderedPages;
                })()}
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
      {/* right side componant */}
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
      {/* right side modal */}

      {/* left side modal */}
      {showAddModalLeft && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Add Componant</h2>
            <div className="mb-4">
              <button
                className={`mr-4 px-4 py-2 rounded ${
                  selectedComponentLeft === "Skills"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleSelectComponentLeft("Skills")}
              >
                Skills
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  selectedComponentLeft === "Contact"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleSelectComponentLeft("Contact")}
              >
                Contact
              </button>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-200 px-4 py-2 rounded mr-2"
                onClick={handleCloseAddModalLeft}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleConfirmAddComponentLeft}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      {/* left side modal */}
    </>
  );
}

// education compoannt
const WorkExperienceContainer = ({ onRemove, setHeight }) => {
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const contentRef = useRef();

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.offsetHeight);
    }
  }, [setHeight]);

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
      <div className="m-2" ref={contentRef}>
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

// education compoannt
const EducationContainer = ({ onRemove, setHeight }) => {
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const contentRef = useRef();

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.offsetHeight);
    }
  }, [setHeight]);

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
      <div className="" ref={contentRef}>
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

// skills compoannt
const SkillsContainer = ({ onRemove,  }) => {
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const contentRef = useRef();

 

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
      <div className="" ref={contentRef}>
        <Skills />
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


// contact compoannt
const ContactContainer = ({ onRemove }) => {
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const contentRef = useRef();



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
      <div className="" ref={contentRef}>
        <Contact />
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

