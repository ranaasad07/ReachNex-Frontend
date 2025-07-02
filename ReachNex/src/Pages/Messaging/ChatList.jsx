import { useNavigate } from "react-router-dom";

const ChatList = ({ users, selectedUser, setSelectedUser }) => {
  const navigate = useNavigate();
  return (
<div className="w-72 bg-white border-r border-gray-200 shadow-sm overflow-y-auto">
  <h2 className="text-xl font-semibold px-4 py-3 border-b border-gray-200 text-gray-700">
    Online Users
  </h2>
  {users.map((user) => {
    const isSelected = selectedUser?._id === user._id;
    return (
      <div
        key={user._id}
        // onClick={() => setSelectedUser(user)}
         onClick={() => navigate(`/message/${user._id}`)}
        className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition rounded-md mx-2 my-1 ${
          isSelected
            ? "bg-blue-600 text-white"
            : "hover:bg-gray-100 text-gray-800"
        }`}
      >
        <img
          src={user.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX-cskA2FbOzFi7ACNiGruheINgAXEqFL1TQ&s"}
          alt="profile"
          className="w-10 h-10 rounded-full object-cover border border-gray-300"
          onError={(e) => {
            e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX-cskA2FbOzFi7ACNiGruheINgAXEqFL1TQ&s";
          }}
          width={100}
          height={100}
        />
        <div className="flex flex-col">
          <p className="font-semibold">{user.fullName}</p>
          <p className="text-sm text-green-600">Online</p>
        </div>
      </div>
    );
  })}
</div>


    // <div className="w-72 bg-white border-r border-gray-300 overflow-y-auto">
    //   <h2 className="text-lg font-semibold p-4 border-b">Online Users</h2>
    //   {users.map((user) => {
    //     const isSelected = selectedUser?._id === user._id;
    //     return (
    //       <div
    //         key={user._id}
    //         onClick={() => setSelectedUser(user)}
    //         className={`flex items-center px-4 py-2 cursor-pointer ${
    //           isSelected ? "bg-black text-white" : "hover:bg-gray-100"
    //         }`}
    //       >
    //         <img
    //           src={user.profilePicture || "/default.jpg"}
    //           alt="profile"
    //           className="w-10 h-10 rounded-full object-cover mr-3 border border-gray-300"
    //         />
    //         <div>
    //           <p className="font-medium">{user.fullName}</p>
    //           <p className="text-sm text-green-600">Online</p>
    //         </div>
    //       </div>
    //     );
    //   })}
    // </div>
  );
};

export default ChatList;
