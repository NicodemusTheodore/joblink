import "./JobListPage.css";
import JobListTableRow from "../components/JobListTableRow";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchJobs } from "../stores/actions/actionCreator";
import JobModal from "../components/JobModal";
import Loading from "../components/Loading";

const JobListPage = () => {
  const { jobs, isJobFetchingLoading } = useSelector((state) => {
    return state.jobs;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchJobs());
  }, []);

  return (
    <>
      {isJobFetchingLoading ? (
        <Loading />
      ) : (
        <>
          <h1 className="text-2xl text-gray-600 font-semibold">Job List</h1>
          <hr className="mt-5" />
          <JobModal />
          <hr className="mb-5" />
          <table>
            <thead>
              <tr className="shadow-sm">
                <th className="p-2 border-[1px]">No</th>
                <th className="p-2 border-[1px]">Company Logo</th>
                <th className="p-2 border-[1px]">Company Name</th>
                <th className="p-2 border-[1px]">Job Title</th>
                <th className="p-2 border-[1px]">Job Type</th>
                <th className="p-2 border-[1px]">Posted By</th>
                <th className="p-2 border-[1px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <JobListTableRow job={job} index={index} key={job.id} />
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default JobListPage;
