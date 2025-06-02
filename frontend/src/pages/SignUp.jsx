import React, { useState } from "react";
import { Link } from "react-router";
import LOGO_IMG from "../../public/logo.png";
import VID_IMG from "../../public/Video-call.png";
import useSignUp from "../hooks/useSignUp.js";

const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { isPending, error, signUpMutation } = useSignUp();

  const handleSubmit = async (event) => {
    event.preventDefault();
    signUpMutation(signUpData);
  };
  return (
    <div
      className="h-screen flex items-center justify-center p-3 sm:p-6 md:p-8"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* Sign Up Form - Left Side */}
        <div className=" w-full lg:w-1/2 p-2 sm:p-8 flex flex-col">
          <div className="mb-3 flex items-center justify-start gap-2">
            <img
              src={LOGO_IMG}
              alt="Logo_Image"
              className="size-9 rounded-lg text-primary"
            />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              PingChat
            </span>
          </div>
          {/* Form Inputs */}
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <div className="space-y-2">
                <div>
                  <h2 className="text-2xl font-semibold">Create an Account</h2>
                  <p className="text-sm opacity-80">
                    Join LangConnect and start your language learning journey
                    today
                  </p>
                </div>
                {error && (
                  <div className="alert alert-error mb-0.5">
                    <span>{error.response.data.message}</span>
                  </div>
                )}
                <div className="space-y-1">
                  <div className="form-control w-full">
                    <label className="label p-1">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="input input-bordered w-full"
                      value={signUpData.fullName}
                      onChange={({ target }) =>
                        setSignUpData({ ...signUpData, fullName: target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label p-1">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="hello@example.com"
                      className="input input-bordered w-full"
                      value={signUpData.email}
                      onChange={({ target }) =>
                        setSignUpData({ ...signUpData, email: target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label p-1">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="********"
                      className="input input-bordered w-full"
                      value={signUpData.password}
                      onChange={({ target }) =>
                        setSignUpData({ ...signUpData, password: target.value })
                      }
                      required
                    />
                    <p className="text-xs opacity-70 mt-0.5">
                      Password must be atleast 6 characters long
                    </p>
                  </div>
                  <div className="form-control w-full">
                    <label className="label p-1">
                      <span className="label-text">Confirm Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="********"
                      className="input input-bordered w-full"
                      value={signUpData.confirmPassword}
                      onChange={({ target }) =>
                        setSignUpData({
                          ...signUpData,
                          confirmPassword: target.value,
                        })
                      }
                      required
                    />
                    <p className="text-xs opacity-70 mt-0.5">
                      Password and Confirm Password must be same
                    </p>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        required
                      />
                      <span className="text-xs leading-tight">
                        I agree to the{" "}
                        <span className="text-primary hover:underline">
                          terms of service{" "}
                        </span>
                        and{" "}
                        <span className="text-primart hover:underline">
                          privacy policy
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
                <button
                  className="btn btn-primary w-full"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Signing Up ...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
                <div className="text-center mt-0.5">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      Sign In
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-6">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                className="w-full h-full"
                src={VID_IMG}
                alt="Video-Call-Image"
              />
            </div>
            <div className="text-center space-y-2 mt-4">
              <h2 className="text-2xl font-semibold">
                Connect with language partners worldwide
              </h2>
              <p className="opacity-70">
                Practice Conversations, make friends, and improve your language
                skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
