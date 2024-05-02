import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { EducationType } from '../types/education-type';
import { updateEducation } from '../redux/education/education.slice';
import Modal from "react-modal";
import { FiEdit } from 'react-icons/fi';

function Education() {
  // hover check
  const [isHovered, setIsHovered] = React.useState(false);

  //modal open
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const dispatch = useDispatch();
  const education = useSelector(
    (state: RootState) => state.educationReducer.education
  );
  const [editExperience, setEditExperience] = React.useState<EducationType[]>(
    []
  );

  const openModal = () => {
    setIsModalOpen(true);
    setEditExperience([...education]);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // add experience
  const handleAddExperience = () => {
    if (editExperience.length < 4) {
      setEditExperience((prevExperience) => [
        ...prevExperience,
        { cource: "", institute: "", time: "", description: "" },
      ]);
    }
  };

  // delete experience
  const handleDeleteExperience = (index: number) => {
    if (editExperience.length > 1) {
      setEditExperience((prevExperience) =>
        // filter the resr without the index
        prevExperience.filter((_, i) => i !== index)
      );
    }
  };

  //experience input change
  const handleExperienceInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { value, name } = e.target;
    setEditExperience((prevExperience) => {
      const newExperience = [...prevExperience];
      newExperience[index] = {
        ...newExperience[index],
        [name]: value,
      };
      return newExperience;
    });
  };

  // submit bio
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //dispath bio and exp
    dispatch(updateEducation(editExperience));

    // Close the modal after submitting
    closeModal();
  };

  return (
    <>
      {/* Modal Experience */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          content: {
            // width: "50%", // Set the width of the modal
            // height: "50%", // Set the height of the modal
            maxWidth: "800px", // Set the maximum width of the modal
            maxHeight: "600px", // Set the maximum height of the modal
            margin: "auto", // Center the modal horizontally
            overflow: "auto", // Allow scrolling if content exceeds the size of the modal
          },
        }}
      >
        <h2 className=" font-semibold text-2xl text-slate-700">
          Edit Education
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col my-4">
            {/* Experience inputs */}
            <div className="flex flex-col my-4">
              {/* Display existing experience items */}
              {editExperience.map((exp, index) => (
                <div key={index} className="flex flex-col my-2  mx-4">
                  <p className=" font-semibold">Education {index + 1}:</p>
                  <br />
                  Cource
                  <input
                    type="text"
                    name="cource"
                    value={exp.cource}
                    onChange={(e) => handleExperienceInputChange(e, index)}
                    className="py-1 text-base drop-shadow-sm px-3 border-indigo-400 border-2 focus:outline-none"
                  />
                  Intitue
                  <input
                    type="text"
                    name="institute"
                    value={exp.institute}
                    onChange={(e) => handleExperienceInputChange(e, index)}
                    className="py-1 text-base drop-shadow-sm px-3 border-indigo-400 border-2 focus:outline-none"
                  />
                  Work Time
                  <input
                    type="text"
                    name="time"
                    value={exp.time}
                    onChange={(e) => handleExperienceInputChange(e, index)}
                    className="py-1 text-base drop-shadow-sm px-3 border-indigo-400 border-2 focus:outline-none"
                  />
                  Description
                  <textarea
                    name="description"
                    value={exp.description || ""}
                    onChange={(e) => handleExperienceInputChange(e, index)}
                    className=" py-1 text-base drop-shadow-sm px-3 border-indigo-400 border-2 focus:outline-none "
                    rows={5}
                  />
                  {/* delete */}
                  {editExperience.length > 1 && (
                    <div className=" flex justify-end">
                      <button
                        className="bg-red-600 rounded-md px-3 py-1 text-center drop-shadow-md my-2 hover:bg-red-500 cursor-pointer text-white"
                        onClick={() => handleDeleteExperience(index)}
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {/* add new experience up to 5 */}
              {editExperience.length < 4 && (
                <div className=" flex justify-end mx-4">
                  <button
                    className="bg-green-600 rounded-md px-3 py-1 text-center drop-shadow-md my-2 hover:bg-green-500 cursor-pointer text-white"
                    onClick={handleAddExperience}
                    type="button"
                  >
                    Add Education
                  </button>
                </div>
              )}
            </div>
          </div>
          <button
            className="mx-4 bg-indigo-600 rounded-full px-5 py-2 text-center drop-shadow-md my-2 hover:bg-indigo-500 cursor-pointer text-white"
            type="submit"
          >
            Save
          </button>
          <button
            className=" bg-rose-600 rounded-full px-5 py-2 text-center drop-shadow-md my-2 hover:bg-rose-500 cursor-pointer text-white"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
        </form>
      </Modal>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative ${
          isHovered
            ? "border-2 p-1 border-red-500 border-dotted cursor-pointer"
            : ""
        }`}
        onClick={openModal}
      >
        {isHovered && (
          <div className="absolute top-0 right-0 p-1">
            <FiEdit
              className=" text-2xl text-orange-700 shadow-lg cursor-pointer"
              onClick={openModal}
            />{" "}
          </div>
        )}
        {/* education */}
        <h2 className=" text-2xl font-bold mt-8 mb-3 text-slate-800 ">
          Education:
        </h2>

        {education.map((edu) => {
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
    </>
  );
}

export default Education