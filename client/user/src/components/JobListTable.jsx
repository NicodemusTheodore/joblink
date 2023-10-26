import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const JobListTable = ({ job }) => {
  const convertDate = (input) => {
    let date = new Date(input);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let newDate = date.toLocaleDateString("en-EN", options);
    return newDate;
  };
  return (
    <div className="border-[1px] p-5">
      <div className="flex gap-5">
        <img
          className="w-20 h-24 my-auto p-2"
          src={job.Company.companyLogo}
          alt={job.Company.name}
        />
        <div>
          <Link
            to={`/job-board/${job.id}`}
            className="text-2xl text-blue-500 font-semibold hover:underline cursor-pointer"
          >
            {job.title}
          </Link>
          <div className="mt-5">
            <p className="text-gray-500">{job.Company.name}</p>
            <p className="text-gray-500">{job.Company.location}</p>
            <p className="text-gray-500">
              Posted on {convertDate(job.createdAt)}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-500 text-xs">{job.description}</p>
      </div>
    </div>
  );
};

export default JobListTable;
