import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const HomePage = () => {
  return (
    <section>
      <div className="landing-page-img">
        <Navbar
          outerContainerClass={"py-10 px-28"}
          innerContainerClass={
            "flex justify-between shadow-md bg-white rounded-3xl py-8 px-20"
          }
        />

        <div className="px-48 py-32">
          <div className="flex flex-col gap-5">
            <h1 className="text-5xl font-bold text-white flex flex-col gap-2">
              <span>Your dream job is</span>
              <span>just a click away</span>
            </h1>
            <p className="font-semibold text-white text-lg">
              The simplest way to career opportunities starts here
            </p>
            <Link
              className="bg-blue-500 w-max p-4 text-white font-bold rounded-xl hover:bg-blue-600"
              to={"/job-board"}
            >
              Go To Job Board
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
