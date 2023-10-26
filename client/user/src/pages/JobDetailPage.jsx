/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { fetchJobById } from "../stores/actions/actionCreator";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";

const JobDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { job, isJobFetchingLoading } = useSelector((state) => {
    return state.jobs;
  });

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

  useEffect(() => {
    dispatch(fetchJobById(id));
  }, []);
  return (
    <>
      <section className="bg-gray-100 h-screen">
        <div>
          <Navbar
            innerContainerClass={
              "flex justify-between bg-white shadow-md py-4 px-20"
            }
          />
        </div>
        {isJobFetchingLoading ? (
          <Loading />
        ) : (
          <>
            <div className="p-5">
              <div className="bg-white p-5">
                <img
                  src={job.Company?.companyLogo}
                  alt={job.Company?.name}
                  className="w-28 border-2"
                />
                <div className="my-5">
                  <h1 className="text-4xl font-bold">{job.title}</h1>
                  <h2 className="text-purple-500">{job.Company?.name}</h2>
                  <h2>{job.Company?.location}</h2>
                  <p>Posted on {convertDate(job.createdAt)}</p>
                </div>
                <button className="py-4 px-6 text-lg text-white font-bold rounded-md bg-blue-500 hover:bg-blue-600 mt-5">
                  Apply Now
                </button>
                <hr className="my-5" />
                <h2 className="text-2xl font-bold my-5">Job Description</h2>
                <p className="my-3">{job.description}</p>
                <h2 className="text-2xl font-bold my-5">
                  Minimum Requirements
                </h2>
                <ul className="ml-5">
                  {job.Skills?.map((skill) => (
                    <li className="list-disc" key={skill.id}>
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default JobDetailPage;
