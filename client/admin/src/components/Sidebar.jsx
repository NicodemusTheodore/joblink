import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faBuilding,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="flex items-center justify-center p-5 h-16 bg-gray-600">
        <h1 className="text-4xl text-gray-300 logo">JobLink</h1>
      </div>
      <div className="cursor-pointer h-full bg-gray-600">
        <NavLink
          to={"/users"}
          className={({ isActive }) =>
            isActive
              ? "p-5 text-md font-semibold flex gap-3 items-center text-gray-300 bg-sky-700 border-r-4 border-sky-200"
              : "p-5 text-md font-semibold flex gap-3 items-center text-gray-300 hover:bg-sky-700 hover:border-r-4 hover:border-sky-200 transition-colors duration-300"
          }
        >
          <FontAwesomeIcon className="w-5" icon={faUsers} />
          <span>Users</span>
        </NavLink>
        <NavLink
          to={"/job-board"}
          className={({ isActive }) =>
            isActive
              ? "p-5 text-md font-semibold flex gap-3 items-center text-gray-300 bg-sky-700 border-r-4 border-sky-200"
              : "p-5 text-md font-semibold flex gap-3 items-center text-gray-300 hover:bg-sky-700 hover:border-r-4 hover:border-sky-200 transition-colors duration-300"
          }
        >
          <FontAwesomeIcon className="w-5" icon={faBriefcase} />
          <span>Job Board</span>
        </NavLink>
        <NavLink
          to={"/companies"}
          className={({ isActive }) =>
            isActive
              ? "p-5 text-md font-semibold flex gap-3 items-center text-gray-300 bg-sky-700 border-r-4 border-sky-200"
              : "p-5 text-md font-semibold flex gap-3 items-center text-gray-300 hover:bg-sky-700 hover:border-r-4 hover:border-sky-200 transition-colors duration-300"
          }
        >
          <FontAwesomeIcon className="w-5" icon={faBuilding} />
          <span>Company List</span>
        </NavLink>
      </div>
    </>
  );
};

export default Sidebar;
