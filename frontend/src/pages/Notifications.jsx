import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BellIcon, ClockIcon, MessageSquareIcon, UserIcon } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { acceptFriendRequest, getFriendRequests } from "../lib/api.js";
import NoNotifications from "../components/NoNotifications.jsx";
const Notifications = () => {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });
  const incomingRequests = friendRequests?.incomingRequests || [];
  const acceptedRequests = friendRequests?.acceptedRequests || [];

  console.log(acceptedRequests);

  const {
    mutate: acceptRequestMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      toast.success("Friend Request Accepted");
      queryClient.invalidateQueries(["friendRequests"]);
      queryClient.invalidateQueries(["friends"]);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
          Notifications
        </h1>
        {isLoading && (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
        {incomingRequests?.length > 0 && !isLoading && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-primary" />
              Friend Requests
              <span className="badge badge-primary ml-2">
                {incomingRequests.length}
              </span>
            </h2>
            <div className="space-y-3">
              {incomingRequests.map((request) => (
                <div
                  key={request._id}
                  className="card bg-base-300 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="card-body p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="avatar w-14 h-14 rounded-full bg-base-300">
                          <img
                            src={request.sender.profilePic}
                            alt={request.sender.fullName}
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            {request.sender.fullName}
                          </h3>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            <span className="badge badge-secondary badge-sm">
                              Native : {request.sender.nativeLanguage}
                            </span>
                            <span className="badge badge-accent badge-sm">
                              Learning : {request.sender.learningLanguage}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => acceptRequestMutation(request._id)}
                        disabled={isPending}
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        {acceptedRequests?.length > 0 && !isLoading && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <BellIcon className="h-5 w-5 text-primary" />
              New Connections
            </h2>
            <div className="space-y-3">
              {acceptedRequests.map((request) => (
                <div
                  key={request._id}
                  className="card bg-base-300 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="card-body p-4">
                    <div className="flex items-start gap-3">
                      <div className="avatar mt-1 size-10 rounded-full">
                        <img
                          src={request.recipient.profilePic}
                          alt={request.recipient.fullName}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          {request.recipient.fullName}
                        </h3>
                        <p className="text-sm my-1">
                          {request.recipient.fullName} accepted your friend
                          request
                        </p>
                        <p className="text-xs flex items-center opacity-70">
                          <ClockIcon className="h-3 w-3 mr-1" /> Recently
                        </p>
                      </div>
                      <div className="badge badge-primary">
                        <MessageSquareIcon className="h-3 w-3 mr-1" /> New
                        Friend
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
          <NoNotifications />
        )}
      </div>
    </div>
  );
};

export default Notifications;
