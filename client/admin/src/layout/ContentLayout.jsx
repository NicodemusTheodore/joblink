import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";

const ContentLayout = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <section className="h-screen flex box-border bg-sky-50">
      {/* LEFT SECTION */}
      <section className="h-full flex flex-col min-w-[15vw]">
        <Sidebar />
      </section>
      {/* RIGHT SECTION */}
      <section className="h-full flex flex-col w-full">
        <div className="flex gap-2 items-center justify-end p-5 h-16 bg-sky-700">
          <img
            src="http://placekitten.com/40/40"
            className="rounded-full"
            alt="owo"
          />
          <div>
            <p className="text-white font-semibold flex items-center gap-3">
              {localStorage.getItem("username")}
              <FontAwesomeIcon
                onClick={logout}
                className="text-xl cursor-pointer"
                icon={faRightFromBracket}
              />
            </p>
          </div>
        </div>
        <div className="overflow-y-auto">
          <section className="p-10 max-w-max mx-auto">
            <div className="bg-white p-8">
              <Outlet />
            </div>
          </section>
        </div>
      </section>
      <ToastContainer />
    </section>
  );
};

export default ContentLayout;
