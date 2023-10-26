import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteCompanyById } from "../stores/actions/actionCreator";
import { useDispatch } from "react-redux";
import CompanyEditModal from "./CompanyModal";
import { toast } from "react-toastify";

const CompanyListTableRow = ({ company, index }) => {
  const dispatch = useDispatch();
  const handleDeleteCompany = async (id) => {
    const response = await dispatch(deleteCompanyById(id));
    toast.success(response);
  };

  return (
    <>
      <tr className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
        <td className="p-3 border-[1px]">{index + 1}</td>
        <td className="p-3 border-[1px]">
          <img
            className="border-[1px] w-[7rem]"
            src={company.companyLogo}
            alt={company.name}
          />
        </td>
        <td className="p-3 border-[1px]">{company.name}</td>
        <td className="p-3 border-[1px]">{company.email}</td>
        <td className="p-3 border-[1px]">
          <div className="text-wrap">{company.description}</div>
        </td>
        <td className="p-3 border-[1px]">
          <div className="text-wrap">{company.location}</div>
        </td>
        <td className="p-3 border-[1px]">
          <div className="flex justify-between items-center gap-5">
            <CompanyEditModal company={company} />
            <button
              onClick={() => {
                handleDeleteCompany(company.id);
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

export default CompanyListTableRow;
