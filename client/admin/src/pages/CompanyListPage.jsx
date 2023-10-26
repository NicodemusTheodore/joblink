import CompanyListTableRow from "../components/CompanyListTableRow";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCompanies } from "../stores/actions/actionCreator";
import CompanyModal from "../components/CompanyModal";
import Loading from "../components/Loading";
const CompanyListPage = () => {
  const { companies, isCompanyFetchingLoading } = useSelector((state) => {
    return state.companies;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCompanies());
  }, []);

  return (
    <>
      {isCompanyFetchingLoading ? (
        <Loading />
      ) : (
        <>
          <h1 className="text-2xl text-gray-600 font-semibold">Company List</h1>
          <hr className="mt-5" />
          <CompanyModal />
          <hr className="mb-5" />
          <table>
            <thead>
              <tr className="shadow-sm">
                <th className="p-2 border-[1px]">No</th>
                <th className="p-2 border-[1px]">Company Logo</th>
                <th className="p-2 border-[1px]">Company Name</th>
                <th className="p-2 border-[1px]">Company Email</th>
                <th className="p-2 border-[1px]">Company Description</th>
                <th className="p-2 border-[1px]">Company Location</th>
                <th className="p-2 border-[1px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => (
                <CompanyListTableRow
                  company={company}
                  index={index}
                  key={company.id}
                />
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default CompanyListPage;
