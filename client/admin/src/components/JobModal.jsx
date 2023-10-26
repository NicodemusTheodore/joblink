import { faPenToSquare, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addJob,
  editJob,
  fetchCompanies,
} from "../stores/actions/actionCreator";
import { toast } from "react-toastify";

const JobModal = ({ job }) => {
  const { companies } = useSelector((state) => {
    return state.companies;
  });

  const [showModal, setShowModal] = useState(false);
  const [jobForm, setJobForm] = useState({
    title: job ? job.title : "",
    description: job ? job.description : "",
    companyId: job ? job.companyId : "",
    jobType: job ? job.jobType : "",
  });

  const dispatch = useDispatch();

  const handleJobForm = (event) => {
    const { name, value } = event.target;
    setJobForm({
      ...jobForm,
      [name]: value,
    });
  };

  const [skills, setSkills] = useState([
    {
      name: job ? job?.Skills[0]?.name : "",
      level: job ? job?.Skills[0]?.level : "Beginner",
    },
    {
      name: job ? job?.Skills[1]?.name : "",
      level: job ? job?.Skills[1]?.level : "Beginner",
    },
    {
      name: job ? job?.Skills[2]?.name : "",
      level: job ? job?.Skills[2]?.level : "Beginner",
    },
  ]);

  const handleSkillForm = (index) => (event) => {
    let newArr = [...skills];
    newArr[index][event.target.name] = event.target.value;

    setSkills(newArr);
  };

  const handleSubmitJobForm = async () => {
    const newJob = {
      ...jobForm,
      skills: [...skills],
    };

    try {
      skills.forEach((skill) => {
        if (!skill.name) throw "Skill name is required";
      });

      if (job) {
        const response = await dispatch(editJob(newJob, job.id));
        toast.success(response);
        setShowModal(false);
      } else {
        const response = await dispatch(addJob(newJob));
        toast.success(response);
        setShowModal(false);
        setJobForm({
          ...jobForm,
          title: "",
          description: "",
          companyId: "",
          jobType: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  useEffect(() => {
    dispatch(fetchCompanies());
  }, []);

  return (
    <>
      {job ? (
        <button
          onClick={() => [setShowModal(true)]}
          className="flex items-center gap-2 py-2 px-3 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faPenToSquare} />
          Edit
        </button>
      ) : (
        <button
          onClick={() => [setShowModal(true)]}
          className="flex items-center gap-2 px-3 my-5 py-2 rounded-md bg-green-400 text-white hover:bg-green-500 transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faPlus} />
          Add New Job
        </button>
      )}
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-[35vw]">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-xl font-semibold text-gray-600">
                    {job ? "Edit Job" : "Add Job"}
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
                      Job Title
                    </label>
                    <input
                      name="title"
                      className="border rounded w-full p-2 text-black"
                      value={jobForm.title}
                      onChange={handleJobForm}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="text-sm w-[50%] font-bold mb-1 text-gray-600">
                      Job Description
                    </label>
                    <textarea
                      className="border rounded w-full p-2 text-black h-32"
                      name="description"
                      cols="30"
                      rows="10"
                      value={jobForm.description}
                      onChange={handleJobForm}
                    ></textarea>
                  </div>
                  <div className="flex items-center">
                    <label className="text-sm w-[50%] font-bold mb-1 text-gray-600">
                      Job Type
                    </label>
                    <select
                      className="border rounded w-full p-2 text-black"
                      name="jobType"
                      value={jobForm.jobType}
                      onChange={handleJobForm}
                    >
                      <option hidden disabled value="">
                        - - - PLEASE SELECT JOB TYPE - - -
                      </option>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <label className="text-sm w-[50%] font-bold mb-1 text-gray-600">
                      Company
                    </label>
                    <select
                      className="border rounded w-full p-2 text-black"
                      name="companyId"
                      value={jobForm.companyId}
                      onChange={handleJobForm}
                    >
                      <option hidden disabled value="">
                        - - - PLEASE SELECT COMPANY - - -
                      </option>
                      {companies.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <hr />
                  <h3 className="font-semibold">Skill Requirements</h3>
                  {skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <label className="text-sm w-[50%] font-bold mb-1 text-gray-600">
                        Skill {index + 1}
                      </label>
                      <input
                        name="name"
                        className="border rounded w-full p-2 text-black"
                        value={skill.name}
                        onChange={handleSkillForm(index)}
                      />
                      <select
                        onChange={handleSkillForm(index)}
                        className="border rounded p-2 text-black"
                        name="level"
                        value={skill.level}
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  ))}
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
                    onClick={handleSubmitJobForm}
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

export default JobModal;
