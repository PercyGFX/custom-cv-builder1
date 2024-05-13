import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { FiEdit } from "react-icons/fi";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { updateBio } from "../redux/bio/bio.slice";
import { updateExperience } from "../redux/bio/experience.slice";

function Bio() {
  // hover state for sections
  const [isHovered, setIsHovered] = React.useState(false);
  const [isHovered2, setIsHovered2] = React.useState(false);

  //modal open
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModalOpen2, setIsModalOpen2] = React.useState(false);

  // profile image state
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);

  const dispatch = useDispatch();
  const bio = useSelector((state: RootState) => state.bioReducer.bio);
  const experience = useSelector(
    (state: RootState) => state.experienceReducer.experience
  );
  const [editBio, setEditBio] = React.useState(bio);
  const [editExperience, setEditExperience] = React.useState([...experience]);

  //image file handle change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedImage(files[0]);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    // Copy the current bio data for editing
    setEditBio({ ...bio });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // bio input chnage
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditBio((prevEditBio) => ({
      ...prevEditBio,
      [name]: value,
    }));
  };

  // add experience
  const handleAddExperience = () => {
    if (editExperience.length < 5) {
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
    dispatch(updateBio(editBio));
    dispatch(updateExperience(editExperience));
    // Close the modal after submitting
    closeModal();
    setIsModalOpen2(false);
  };

  return (
    <>
      {/* Modal Experience */}
      <Modal
        isOpen={isModalOpen2}
        onRequestClose={() => setIsModalOpen2(false)}
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
                  Experience {index + 1}:
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
              {editExperience.length < 5 && (
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
            onClick={() => setIsModalOpen2(false)}
          >
            Cancel
          </button>
        </form>
      </Modal>

      {/* Modal Bio Data */}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
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
        <h2 className=" font-semibold text-2xl text-slate-700">Edit Bio</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col my-4">
            <div className="flex flex-col my-2  mx-4">
              Name:
              <input
                type="text"
                name="name"
                value={editBio.name || ""}
                onChange={handleInputChange}
                className=" py-1 text-base drop-shadow-sm px-3 border-indigo-400 border-2 focus:outline-none "
              />
            </div>
            <div className="flex flex-col my-2  mx-4">
              Title:
              <input
                type="text"
                name="title"
                value={editBio.title || ""}
                onChange={handleInputChange}
                className=" py-1 text-base drop-shadow-sm px-3 border-indigo-400 border-2 focus:outline-none "
              />
            </div>
            <div className="flex flex-col my-2  mx-4">
              Profile Image:
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="py-1 text-base drop-shadow-sm px-3 border-indigo-400 border-2 focus:outline-none"
              />
              {/* {selectedImage && (
                <button
                 
                  className="bg-indigo-600 rounded-full px-5 py-2 text-center drop-shadow-md my-2 hover:bg-indigo-500 cursor-pointer text-white"
                >
                  Upload Image
                </button>
              )} */}
            </div>
            <div className="flex flex-col my-2  mx-4">
              Description:
              <textarea
                name="description"
                value={editBio.description || ""}
                onChange={handleInputChange}
                className=" py-1 text-base drop-shadow-sm px-3 border-indigo-400 border-2 focus:outline-none "
                rows={5}
              />
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
            onClick={closeModal}
          >
            Cancel
          </button>
        </form>
      </Modal>
      <div>
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
          {/* photo */}
          <img
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : bio.profileimg
            }
            className="w-[200px] border-4 border-fuchsia-900 rounded-md"
          />

          {/* name title */}
          <h1 className=" mt-8 text-4xl font-semibold">{bio.name}</h1>
          <h3 className=" text-fuchsia-900 bg-fuchsia-200 px-3 my-2 rounded inline-block">
            {bio.title}
          </h3>
          {/* profile description */}
          <p className=" text-justify my-4">{bio.description}</p>
        </div>
        {/* experience */}
        <div
          onMouseEnter={() => setIsHovered2(true)}
          onMouseLeave={() => setIsHovered2(false)}
          onClick={() => setIsModalOpen2(true)}
          className={`relative ${
            isHovered2
              ? "border-2 p-1 border-red-500 border-dotted cursor-pointer"
              : ""
          }`}
        >
          {isHovered2 && (
            <div className="absolute top-0 right-0 p-1">
              <FiEdit
                className=" text-2xl text-orange-700 shadow-lg cursor-pointer"
                onClick={() => setIsModalOpen2(true)}
              />
            </div>
          )}
          <h3 className=" text-lg font-semibold mb-2 text-slate-800">
            Experienced with:
          </h3>

          <ul className="list-disc ml-5">
            {experience.map((exp, index) => {
              return (
                <li style={{ pageBreakInside: "avoid" }} key={index}>
                  {exp}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Bio;
