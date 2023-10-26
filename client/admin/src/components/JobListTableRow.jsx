import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import JobModal from "./JobModal";
import "./JobListTableRow.css";
import { useDispatch } from "react-redux";
import { deleteJobById } from "../stores/actions/actionCreator";
import { toast } from "react-toastify";

const JobListTableRow = ({ job, index }) => {
  const dispatch = useDispatch();
  const handleDeleteJob = async (id) => {
    const response = await dispatch(deleteJobById(id));
    toast.success(response);
  };
  return (
    <>
      <tr className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
        <td className="p-3 border-[1px]">{index + 1}</td>
        <td className="p-3 border-[1px]">
          <img
            className="border-[1px] w-[7rem]"
            src={job.Company.companyLogo}
            alt={job.Company.name}
          />
        </td>
        <td className="p-3 border-[1px] text-center">{job.Company.name}</td>
        <td className="p-3 border-[1px]">
          <div className="text-wrap">{job.title}</div>
        </td>
        <td className="p-3 border-[1px]">{job.jobType}</td>
        <td className="p-3 border-[1px]">{job.User.username}</td>
        <td className="p-3 border-[1px]">
          <div className="flex justify-between items-center gap-5">
            <JobModal job={job} />
            <button
              onClick={() => {
                handleDeleteJob(job.id);
              }}
              className="flex items-center gap-2 py-2 px-3 bg-red-400 text-white rounded-md hover:bg-red-500 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faTrashCan} />
              Delete
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default JobListTableRow;
