import { CheckCircleIcon, MapPinIcon, UserPlusIcon } from "lucide-react";
import React from "react";
import { getLanguageFlag } from "./FriendCard.jsx";
import { capitialize } from "../lib/utils.js";

const UserCard = ({
  user,
  sendRequestMutation,
  hasRequestBeenSent,
  isPending,
}) => {
  return (
    <div className="card bg-base-300 hover:shadow-lg transition-all duration-300">
      <div className="card-body p-5 space-y-1">
        <div className="flex items-center gap-3">
          <div className="avatar size-16 rounded-full">
            <img src={user.profilePic} alt={user.fullName} />
          </div>
          <div>
            <h3 className="">{user.fullName}</h3>
            {user.location && (
              <div className="flex items-center text-xs opacity-70 mt-1">
                <MapPinIcon className="size-3 mt-1" />
                {user.location}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span className="badge badge-secondary">
            {getLanguageFlag(user.nativeLanguage)}
            Native: {capitialize(user.nativeLanguage)}
          </span>
          <span className="badge badge-accent">
            {getLanguageFlag(user.learningLanguage)}
            Learning: {capitialize(user.learningLanguage)}
          </span>
        </div>
        {user?.bio && <p className="text-sm opacity-70">{user.bio}</p>}
        <button
          className={`btn w-full mt-2 ${
            hasRequestBeenSent ? "btn-disabled" : "btn-primary"
          }`}
          onClick={() => sendRequestMutation(user._id)}
          disabled={hasRequestBeenSent || isPending}
        >
          {hasRequestBeenSent ? (
            <>
              <CheckCircleIcon className="size-4 mr-2" />
              Request Sent
            </>
          ) : (
            <>
              <UserPlusIcon className="size-4 mr-2" />
              Send Friend Request
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default UserCard;
