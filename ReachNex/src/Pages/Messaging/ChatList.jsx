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
        const hasUnread = user.hasUnread; // 👈 yeh backend se aana chahiye

        return (
          <div
            key={user._id}
            onClick={() => {
              setSelectedUser(user);
              navigate(`/message/${user._id}`);
            }}
            className={`flex items-center justify-between gap-3 px-4 py-3 cursor-pointer transition rounded-xl mx-2 my-1 ${
              isSelected
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100 text-gray-800"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={
                    user.profilePicture ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX-cskA2FbOzFi7ACNiGruheINgAXEqFL1TQ&s"
                  }
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover border border-gray-300"
                  onError={(e) => {
                    e.target.src =
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX-cskA2FbOzFi7ACNiGruheINgAXEqFL1TQ&s";
                  }}
                  width={100}
                  height={100}
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div className="flex flex-col">
                <p className="font-semibold text-sm">{user.fullName}</p>
                <p className="text-xs text-green-600">Online</p>
              </div>
            </div>

            {hasUnread && (
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
