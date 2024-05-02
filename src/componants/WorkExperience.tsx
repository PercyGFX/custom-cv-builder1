import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Modal from "react-modal";
import { updateWorkExperience } from "../redux/work-experience/work-experience.slice";
import { FiEdit } from "react-icons/fi";
import { WorkExperienceType } from "../types/work-experience.type";

function WorkExperience() {
  // hover check
  const [isHovered, setIsHovered] = React.useState(false);

  //modal open
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const dispatch = useDispatch();
  const workExperience = useSelector(
    (state: RootState) => state.workExperienceReducer.workExperience
  );

  const [editExperience, setEditExperience] = React.useState<
    WorkExperienceType[]
  >([]);

  const openModal = () => {
    setIsModalOpen(true);
    setEditExperience([...workExperience]);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // add experience
  const handleAddExperience = () => {
    if (editExperience.length < 4) {
      setEditExperience((prevExperience) => [
        ...prevExperience,
        { position: "", company: "", time: "", description: "" },
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
    dispatch(updateWorkExperience(editExperience));

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
          Edit Work Experience
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col my-4">
            {/* Experience inputs */}
            <div className="flex flex-col my-4">
              {/* Display existing experience items */}
              {editExperience.map((exp, index) => (
                <div key={index} className="flex flex-col my-2  mx-4">
                  <p className=" font-semibold">Work Experience {index + 1}:</p>
                  <br />
                  Position
                  <input
                    type="text"
                    name="position"
                    value={exp.position}
                    onChange={(e) => handleExperienceInputChange(e, index)}
                    className="py-1 text-base drop-shadow-sm px-3 border-indigo-400 border-2 focus:outline-none"
                  />
                  Company
                  <input
                    type="text"
                    name="company"
                    value={exp.company}
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
                    Add Experience
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
        {/* experience */}
        <h2 className=" text-2xl font-bold mt-8 mb-3 text-slate-800 ">
          Experience:
        </h2>

        {workExperience.map((exp) => {
          return (
            <div className="mb-6 pl-4 border-l-4 border-purple-900">
              <h2 className=" text-lg font-semibold text-slate-700">
                {exp.position}
              </h2>
              <h2 className=" text-normal font-semibold text-fuchsia-900">
                {exp.company} - {exp.time}
              </h2>
              <p className=" text-justify">{exp.description}</p>
              {/* <ul className="list-disc ml-5">
              <li>Lorem ipsum dolor sit amet</li>
              <li>consectetur adipiscing elit</li>
              <li>sed do eiusmod tempor incididunt</li>
              <li>vestibulum rhoncus est pellentesque</li>
            </ul> */}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default WorkExperience;
