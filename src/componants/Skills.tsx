import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { updateSkills } from "../redux/skills/skills.slice";
import Modal from "react-modal";
import { FiEdit } from "react-icons/fi";

function Skills() {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const dispatch = useDispatch();
  const skills = useSelector((state: RootState) => state.skillsReducer.skills);

  const [editSkills, setEditSkills] = React.useState(skills);
  const [editExperience, setEditExperience] = React.useState([...skills]);

  // add experience
  const handleAddExperience = () => {
    if (editExperience.length < 10) {
      setEditExperience((prevExperience) => [...prevExperience, ""]);
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
    const { value } = e.target;
    setEditExperience((prevExperience) => {
      const newExperience = [...prevExperience];
      newExperience[index] = value;
      return newExperience;
    });
  };

  // submit bio
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //dispath bio and exp

    dispatch(updateSkills(editExperience));
    // Close the modal after submitting

    setIsModalOpen(false);
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
          Edit Experience
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col my-4">
            {/* Experience inputs */}
            <div className="flex flex-col my-4">
              {/* Display existing experience items */}
              {editExperience.map((exp, index) => (
                <div key={index} className="flex flex-col my-2  mx-4">
                  Skill {index + 1}:
                  <input
                    type="text"
                    value={exp}
                    onChange={(e) => handleExperienceInputChange(e, index)}
                    className="py-1 text-base drop-shadow-sm px-3 border-indigo-400 border-2 focus:outline-none"
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
              {editExperience.length < 10 && (
                <div className=" flex justify-end mx-4">
                  <button
                    className="bg-green-600 rounded-md px-3 py-1 text-center drop-shadow-md my-2 hover:bg-green-500 cursor-pointer text-white"
                    onClick={handleAddExperience}
                    type="button"
                  >
                    Add Skill
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
      {/* skills */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
        className={`relative ${
          isHovered
            ? "border-2 p-1 border-red-500 border-dotted cursor-pointer"
            : ""
        }`}
      >
        <h2 className=" text-2xl font-bold mt-8 mb-3 text-slate-800 ">
          Skills:
        </h2>

        {isHovered && (
          <div className="absolute top-0 right-0 p-1">
            <FiEdit
              className=" text-2xl text-orange-700 shadow-lg cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        )}
        <div className="flex flex-wrap">
          {skills.map((skill) => {
            return (
              <>
                <div className="bg-fuchsia-900 rounded-md px-2 py-1 mb-2 text-white mr-3">
                  {skill}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Skills;
