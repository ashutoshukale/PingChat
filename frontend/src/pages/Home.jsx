import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { UsersIcon } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import FriendCard from "../components/FriendCard.jsx";
import {
  getOutgoingFriendRequests,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api.js";
import NoFriends from "../components/NoFriends.jsx";
import UserCard from "../components/UserCard.jsx";
const Home = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: friends = [], isLoading: isLoadingFriends } = useQuery({
    queryKey: ["userFriends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: isLoadingUsers } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoindFriendReqs"],
    queryFn: getOutgoingFriendRequests,
  });

  const {
    mutate: sendRequestMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });
      toast.success("Friend Request Sent");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-6">
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center gap-4">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Your Friends
          </h2>
          <Link to="/notifications" className="btn btn-outline btn-sm">
            <UsersIcon className="size-5 mr-2" />
            Friend Requests
          </Link>
        </div>
        {isLoadingFriends && (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        )}

        {friends?.length > 0 ? (
          friends.map((friend) => (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <FriendCard key={friends._id} friend={friend} />
            </div>
          ))
        ) : (
          <NoFriends />
        )}
        <section>
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Meet New Learners
                </h2>
                <p className="opacity-70 text-base-content">
                  Discover perfect language exchange partners based on your
                  profile
                </p>
              </div>
            </div>
          </div>
          {isLoadingUsers && (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          )}
          {recommendedUsers.length === 0 && !isLoadingUsers && (
            <div className="card bg-base-200 p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">
                No Recommendation Available
              </h3>
              <p className="text-base-content opacity-70">
                Check back later for new language partners
              </p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedUsers?.length > 0 &&
              recommendedUsers.map((user) => (
                <UserCard
                  key={user._id}
                  user={user}
                  hasRequestBeenSent={outgoingRequestsIds.has(user._id)}
                  sendRequestMutation={sendRequestMutation}
                  isPending={isPending}
                />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
