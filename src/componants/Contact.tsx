import React from 'react'
import { FiHome, FiPhone, FiMail, FiExternalLink, FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Modal from "react-modal";
import { updateContact } from '../redux/contact/contact.slice';

function Contact() {
  // hover state for sections
  const [isHovered, setIsHovered] = React.useState(false);

  //modal open
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const dispatch = useDispatch();
  const contact = useSelector(
    (state: RootState) => state.contactReducer.contact
  );

  const [editContact, setEditContact] = React.useState(contact);

  const openModal = () => {
    setIsModalOpen(true);
    // Copy the current bio data for editing
    setEditContact({ ...contact });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // bio input chnage
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  // submit bio
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //dispath contact
    dispatch(updateContact(editContact));
   
    // Close the modal after submitting
    closeModal();
  
  };
  return (
    <>
      {/* Modal Bio Data */}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            // width: "50%", // Set the width of the modal
            // height: "50%", // Set the height of the modal
            maxWidth: "800px", // Set the maximum width of the modal
            maxHeight: "500px", // Set the maximum height of the modal
            margin: "auto", // Center the modal horizontally
            overflow: "auto", // Allow scrolling if content exceeds the size of the modal
          },
        }}
      >
        <h2 className=" font-semibold text-2xl text-slate-700">Edit Contact</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col my-4">
            <div className="flex flex-col my-2  mx-4">
              Address:
              <input
                type="text"
                name="address"
                value={editContact.address || ""}
                onChange={handleInputChange}
                className=" py-1 text-base drop-shadow-sm px-3 border-indigo-400 border-2 focus:outline-none "
              />
            </div>
            <div className="flex flex-col my-2  mx-4">
              Phone:
              <input
                type="text"
                name="phone"
                value={editContact.phone || ""}
                onChange={handleInputChange}
                className=" py-1 text-base drop-shadow-sm px-3 border-indigo-400 border-2 focus:outline-none "
              />
            </div>
            <div className="flex flex-col my-2  mx-4">
              Profile Image:
              <input
                type="text"
                name="email"
                value={editContact.email || ""}
                onChange={handleInputChange}
                className=" py-1 text-base drop-shadow-sm px-3 border-indigo-400 border-2 focus:outline-none "
              />
            </div>

            <div className="flex flex-col my-2  mx-4">
              Website:
              <input
                type="text"
                name="website"
                value={editContact.website || ""}
                onChange={handleInputChange}
                className=" py-1 text-base drop-shadow-sm px-3 border-indigo-400 border-2 focus:outline-none "
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
        {/* contact */}
        <h2 className=" text-2xl font-bold mt-8 mb-3 text-slate-800">
          Contact:
        </h2>
        <div className="">
          <div className="flex items-center mb-3">
            <FiHome className="text-2xl mr-3 mb- text-fuchsia-900" />
            <div>
              <div className="">{contact.address}</div>
            </div>
          </div>

          <div className="flex items-center mb-3">
            <FiPhone className="text-2xl mr-3 text-fuchsia-900" />
            <div>
              <div>{contact.phone}</div>
            </div>
          </div>

          <div className="flex items-center mb-3">
            <FiMail className="text-2xl mr-3 text-fuchsia-900" />
            <div>
              <div>{contact.email}</div>
            </div>
          </div>

          <div className="flex items-center mb-3">
            <FiExternalLink className="text-2xl mr-3 text-fuchsia-900" />
            <div>
              <div>{contact.website}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact