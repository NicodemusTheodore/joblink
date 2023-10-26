/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Navbar = ({ outerContainerClass, innerContainerClass }) => {
  return (
    <div className={outerContainerClass}>
      <nav className={innerContainerClass}>
        <Link to={"/"} className="flex items-center gap-3">
          <span className="text-5xl logo-alias text-blue-500">J</span>
          <p className="text-3xl logo">Joblink</p>
        </Link>
        <div className="flex justify-center items-center">
          <Link to={"/job-board"} className="font-bold text-blue-500 h-fit">
            Job Board
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
