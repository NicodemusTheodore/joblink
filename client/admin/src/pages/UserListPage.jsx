import UserListTableRow from "../components/UserListTableRow";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "../stores/actions/actionCreator";
import UserModal from "../components/UserModal";
import Loading from "../components/Loading";

const UserListPage = () => {
  const { users, isUserFetchingLoading } = useSelector((state) => {
    return state.users;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <>
      {isUserFetchingLoading ? (
        <Loading />
      ) : (
        <>
          <h1 className="text-2xl text-gray-600 font-semibold">User List</h1>
          <hr className="mt-5" />
          {localStorage.getItem("role") === "Super Admin" ? (
            <UserModal />
          ) : null}
          <hr className="mb-5" />
          <table>
            <thead>
              <tr className="shadow-sm">
                <th className="p-2 border-[1px]">No</th>
                <th className="p-2 border-[1px]">Username</th>
                <th className="p-2 border-[1px]">Role</th>
                <th className="p-2 border-[1px]">Email</th>
                <th className="p-2 border-[1px]">Phone Number</th>
                <th className="p-2 border-[1px]">Address</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <UserListTableRow key={user.id} user={user} index={index} />
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default UserListPage;
