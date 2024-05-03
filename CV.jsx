import React from "react";
import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";

import Bio from "./Bio";
import Skills from "./Skills";
import Contact from "./Contact";
import WorkExperience from "./WorkExperience";
import Education from "./Education";

function CV() {
  const firstPageRef = React.useRef();
  const secondPageRef = React.useRef();
  const [printingFirstPage, setPrintingFirstPage] = React.useState(true);

  const handlePrint = useReactToPrint({
    content: () => {
      if (printingFirstPage) return firstPageRef.current;
      else return secondPageRef.current;
    },
  });

  const printSecondPage = () => {
    setPrintingFirstPage(false);
    setTimeout(() => {
      handlePrint();
      setPrintingFirstPage(true);
    }, 1000); // Adjust this timeout value if necessary
  };

  return (
    <>
      <button
        className="m-4 bg-rose-600 rounded-full px-5 py-2 text-center drop-shadow-md my-2 hover:bg-rose-500 cursor-pointer text-white"
        onClick={() => {
          handlePrint();
          setTimeout(printSecondPage, 1000); // Print second page after a delay
        }}
      >
        Download / Print
      </button>

      <div ref={firstPageRef}>
        <div className="w-[1000px] flex p-4 shadow-lg  m-2">
          <div className=" w-[300px] shadow-md p-4 overflow-x-hidden">
            <Bio />
            <Skills />
            <Contact />
          </div>
        </div>
      </div>

      <div ref={secondPageRef}>
        <div className="w-[1000px] flex p-4 shadow-lg  m-2">
          <div className="px-6 w-[700px]">
            <WorkExperience />
            <Education />
          </div>
        </div>
      </div>
    </>
  );
}

export default CV;