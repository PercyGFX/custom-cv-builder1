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

  const education = useSelector((state) => state.educationReducer.education);

  const [workExperienceHeight, setWorkExperienceHeight] = useState(0);
  const [educationHeight, setEducationHeight] = useState(0);
  const [totalheight, settotalHeight] = useState(0);

  const workexp = useRef(null);
  const eduexp = useRef(null);

  useEffect(() => {
    const { offsetHeight } = workexp.current;
    setWorkExperienceHeight(offsetHeight);
    console.log(offsetHeight);
  }, [workExperience]);

  useEffect(() => {
    const { offsetHeight } = eduexp.current;
    setEducationHeight(offsetHeight);
    console.log(offsetHeight);
  }, [education]);

  useEffect(() => {
    const { offsetHeight } = componentRef.current;
    settotalHeight(offsetHeight);
    console.log(offsetHeight);
  }, [education, workExperience]);

  // useEffect(() => {
  //   if (componentRef.current) {
  //     const height = componentRef.current.getBoundingClientRect().height;
  //     console.log("Work Experience Height:", height);
  //     setWorkExperienceHeight(height);
  //   }
  // }, [workExperience]);

  return (
    <>
      <div className=" flex justify-center">
        <ReactToPrint
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
          <div className="shadow-lg ">
            <div className="w-[1000px] flex p-4  m-2">
              <div className=" w-[300px] shadow-md p-4 overflow-x-hidden">
                <Bio />
                <Skills />
                <Contact />
              </div>
              <div className="px-6 w-[700px]">
                <div ref={workexp}>
                  <WorkExperience />
                </div>
                {workExperienceHeight + educationHeight > totalheight- 200 && <PageBreak />}
                <div ref={eduexp}>
                  <Education />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CV;
