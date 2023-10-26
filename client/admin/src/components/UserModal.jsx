import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../stores/actions/actionCreator";
import { toast } from "react-toastify";

const UserModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [userForm, setUserForm] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const dispatch = useDispatch();

  const handleUserForm = (event) => {
    const { name, value } = event.target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  const handleSubmitCompanyForm = async () => {
    try {
      const response = await dispatch(register(userForm));
      toast.success(response);
      setShowModal(false);
      setUserForm({
        ...userForm,
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
      });
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <button
        onClick={() => [setShowModal(true)]}
        className="flex items-center gap-2 py-2 my-5 px-3 bg-green-400 text-white rounded-md hover:bg-green-500 transition-colors duration-200"
      >
        <FontAwesomeIcon icon={faPlus} />
        Add New Admin
      </button>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-[35vw]">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-xl font-semibold text-gray-600">
                    Add Admin
                  </h3>
                  <button
                    className="text-xs bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <FontAwesomeIcon icon={faX} />
                  </button>
                </div>

                <form className="rounded flex flex-col gap-3 px-8 pt-6 pb-8 w-full text-gray-600">
                  <div className="flex items-center">
                    <label className="text-sm w-[50%] font-bold mb-1 text-gray-600">
                      User Name
                    </label>
                    <input
                      name="username"
                      className="border rounded w-full p-2 text-black"
                      value={userForm.username}
                      onChange={handleUserForm}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="text-sm w-[50%] font-bold mb-1 text-gray-600">
                      User Email
                    </label>
                    <input
                      name="email"
                      className="border rounded w-full p-2 text-black"
                      value={userForm.email}
                      onChange={handleUserForm}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="text-sm w-[50%] font-bold mb-1 text-gray-600">
                      User Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="border rounded w-full p-2 text-black"
                      value={userForm.password}
                      onChange={handleUserForm}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="text-sm w-[50%] font-bold mb-1 text-gray-600">
                      User Phone Number
                    </label>
                    <input
                      name="phoneNumber"
                      className="border rounded w-full p-2 text-black"
                      value={userForm.phoneNumber}
                      onChange={handleUserForm}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="text-sm w-[50%] font-bold mb-1 text-gray-600">
                      User Address
                    </label>
                    <textarea
                      className="border rounded w-full p-2 text-black"
                      name="address"
                      cols="30"
                      rows="10"
                      value={userForm.address}
                      onChange={handleUserForm}
                    ></textarea>
                  </div>
                </form>

                <div className="flex gap-3 items-center justify-end px-7 py-3 border-t border-solid">
                  <button
                    className="text-white bg-gray-400 hover:bg-gray-500 font-bold uppercase text-sm px-5 py-[0.6rem] rounded-md mr-1 mb-1 transition-colors duration-300"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-white bg-green-400 hover:bg-green-500 font-bold uppercase text-sm px-5 py-[0.6rem] rounded-md mr-1 mb-1 transition-colors duration-300"
                    type="submit"
                    onClick={handleSubmitCompanyForm}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default UserModal;
