/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchForm from "../components/SearchForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../stores/actions/actionCreator";
import JobListTable from "../components/JobListTable";
import Loading from "../components/Loading";

const JobBoardPage = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const { jobs, isJobFetchingLoading } = useSelector((state) => {
    return state.jobs;
  });

  useEffect(() => {
    dispatch(fetchJobs());
  }, []);
  return (
    <section className="bg-gray-100 h-screen">
      <div>
        <Navbar
          innerContainerClass={
            "flex justify-between bg-white shadow-md py-4 px-20"
          }
        />
        <SearchForm
          containerClass={"mt-2 flex gap-3 p-2"}
          inputClass={"p-5 w-full bg-gray-200 text-lg"}
          buttonClass={
            "py-3 px-5 bg-blue-500 text-white text-lg font-bold hover:bg-blue-600"
          }
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
        {isJobFetchingLoading ? (
          <Loading />
        ) : (
          <>
            <section className="p-10">
              <div className="bg-white flex flex-col">
                {jobs.map((job) => (
                  <JobListTable key={job.id} job={job} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </section>
  );
};

export default JobBoardPage;
