const UserListTableRow = ({ user, index }) => {
  return (
    <>
      <tr className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
        <td className="p-3 border-[1px]">{index + 1}</td>
        <td className="p-3 border-[1px]">{user.username}</td>
        <td className="p-3 border-[1px]">{user.role}</td>
        <td className="p-3 border-[1px]">{user.email}</td>
        <td className="p-3 border-[1px]">{user.phoneNumber}</td>
        <td className="p-3 border-[1px]">{user.address}</td>
      </tr>
    </>
  );
};

export default UserListTableRow;
