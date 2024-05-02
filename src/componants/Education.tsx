import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

function Education() {

     const education = useSelector(
       (state: RootState) => state.educationReducer.education
     );
  return (
    <div>
      {/* education */}
      <h2 className=" text-2xl font-bold mt-8 mb-3 text-slate-800 ">
        Education:
      </h2>

      {education.map((edu)=>{
        return (
          <div className="mb-6 pl-4 ">
            <h2 className=" text-lg font-semibold text-slate-700">
              {edu.cource}
            </h2>
            <h2 className=" text-normal font-semibold text-fuchsia-900">
              {edu.institute} | {edu.time}
            </h2>
            <p className=" text-justify">{edu.description}</p>
          </div>
        );
      })}

      

      {/* <div className="mb-6 pl-4 ">
        <h2 className=" text-lg font-semibold text-slate-700">
          Beng (Hons) in Software Engineering
        </h2>
        <h2 className=" text-normal font-semibold text-fuchsia-900">
          SLITT | 2017 - 2020
        </h2>
        <p className=" text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices
          mi tempus imperdiet nulla malesuada.
        </p>
      </div>

      <div className="mb-6 pl-4 ">
        <h2 className=" text-lg font-semibold text-slate-700">
          Diploma in Graphic Designing
        </h2>
        <h2 className=" text-normal font-semibold text-fuchsia-900">
          Wijaya Graphics | 2020 - 2021
        </h2>
        <p className=" text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices
          mi tempus imperdiet nulla malesuada.
        </p>
      </div> */}
    </div>
  );
}

export default Education