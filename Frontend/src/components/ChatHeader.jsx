import React from "react";
import useChatStore from "../store/useChatStore";
import useAuthStore from "../store/useAuthStore";
import { X } from "lucide-react";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={
                  selectedUser.profilePic ||
                  `https://avatar.iran.liara.run/username?username=${selectedUser.fullName}`
                }
                alt={selectedUser.fullName}
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "online" : "offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button className="cursor-pointer" onClick={()=> setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;
