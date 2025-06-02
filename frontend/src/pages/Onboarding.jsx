import React, { useState } from "react";
import useUserAuth from "../hooks/useUserAuth.js";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  CameraIcon,
  GlobeIcon,
  LoaderIcon,
  MapPinIcon,
  ShuffleIcon,
} from "lucide-react";
import { completeOnboarding } from "../lib/api.js";
import { LANGUAGES } from "../constants/constants.js";
import toast from "react-hot-toast";

const Onboarding = () => {
  const { authUser } = useUserAuth();

  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });
  const {
    mutate: onboardingMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded Successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    onboardingMutation(formData);
  };

  const handleRandomAvatar = async () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormData({ ...formData, profilePic: randomAvatar });
    toast.success("Random Profile picture Generated");
  };
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-3 ">
      <div className="card bg-base-200 w-full max-w-3xl shadow-2xl">
        <div className="card-body p-2 sm:p-4">
          <h1 className="text-2xl sm:text-xl font-bold text-center mb-2">
            Complete Your Profile
          </h1>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {formData.profilePic ? (
                  <img
                    src={formData.profilePic}
                    alt="Profile Pic"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRandomAvatar}
                  className="btn btn-accent rounded-4xl"
                >
                  <ShuffleIcon className="size-4 mr-2" />
                  Generate Random Avatar
                </button>
              </div>
            </div>
            {error && (
              <div className="alert alert-error mb-0.5">
                <span>{error.response.data.message}</span>
              </div>
            )}
            {/* <div className="space-y-1"> */}
            <div className="form-control w-full">
              <label className="label p-1">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Your Full Name"
                className="input input-bordered w-full rounded-xl"
                value={formData.fullName}
                onChange={({ target }) =>
                  setFormData({ ...formData, fullName: target.value })
                }
                required
              />
            </div>
            <div className="form-control w-full">
              <label className="label p-1">
                <span className="label-text">Your Bio</span>
              </label>
              <textarea
                name="bio"
                placeholder="Tell others about yourself and about your learning language goals"
                className="textarea textarea-bordered h-14 rounded-xl w-full"
                value={formData.bio}
                onChange={({ target }) =>
                  setFormData({ ...formData, bio: target.value })
                }
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label p-1">
                  <span className="label-text">Native Language</span>
                </label>
                <select
                  name="nativeLanguage"
                  value={formData.nativeLanguage}
                  onChange={({ target }) =>
                    setFormData({ ...formData, nativeLanguage: target.value })
                  }
                  className="select select-bordered w-full rounded-xl"
                >
                  <option value="">Select Your Native Language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label p-1">
                  <span className="label-text">Learning Language</span>
                </label>
                <select
                  name="nativeLanguage"
                  value={formData.learningLanguage}
                  onChange={({ target }) =>
                    setFormData({
                      ...formData,
                      learningLanguage: target.value,
                    })
                  }
                  className="select select-bordered w-full rounded-xl"
                >
                  <option value="">Select Your Learning Language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-control w-full">
              <label className="label p-1">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={({ target }) =>
                    setFormData({ ...formData, location: target.value })
                  }
                  className="input input-bordered w-full pl-10 rounded-xl"
                  placeholder="City, Country"
                />
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-80" />
              </div>
            </div>
            {/* </div> */}
            <div className="flex items-center justify-center gap-2 ">
              <button
                className="btn btn-accent md:w-xl w-xs rounded-4xl"
                type="submit"
                disabled={isPending}
              >
                {!isPending ? (
                  <>
                    <GlobeIcon className="size-5 mr-2" />
                    Complete Onboarding
                  </>
                ) : (
                  <>
                    <LoaderIcon className="animate-spin size-5 mr-2" />
                    Onboarding ...
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
