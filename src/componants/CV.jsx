import React, { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import ReactToPrint from "react-to-print";

import Bio from "./Bio";
import Skills from "./Skills";
import Contact from "./Contact";
import WorkExperience from "./WorkExperience";
import Education from "./Education";
import PageBreak from "./PageBreak";

import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

function CV() {
  const componentRef = React.useRef();
  const workExperience = useSelector(
    (state) => state.workExperienceReducer.workExperience
  );

  console.log(workExperience);

  return (
    <>
      {/* <button
        className=" m-4 bg-rose-600 rounded-full px-5 py-2 text-center drop-shadow-md my-2 hover:bg-rose-500 cursor-pointer text-white"
        onClick={handlePrint}
      >
        Download / Print
      </button> */}
      <div className=" flex justify-center">
        <ReactToPrint
          //         pageStyle={`
          // @page {
          //   size: auto;
          //   margin-top: 3mm;

          // }
          // `}
          trigger={() => (
            <button className="m-4 bg-rose-600 rounded-full px-5 py-2 text-center drop-shadow-md my-2 hover:bg-rose-500 cursor-pointer text-white">
              Download / Print
            </button>
          )}
          content={() => componentRef.current}
        />
      </div>
      <div className="flex justify-center border">
        <div ref={componentRef}>
          {/* <div className="w-[1000px] flex p-4 shadow-lg border-b-8 border-fuchsia-900 m-2"> */}
          <div className="shadow-lg ">
            <div className="w-[1000px] flex p-4  m-2">
              {/* left column */}
              <div className=" w-[300px] shadow-md p-4 overflow-x-hidden">
                <Bio />

                <Skills />
                {/* <PageBreak /> */}

                <Contact />
              </div>
              {/* right side */}
              <div className="px-6 w-[700px]">
                <WorkExperience />

                {workExperience.length > 3 && <PageBreak />}
                <Education />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CV;
