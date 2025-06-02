import React, { useState } from "react";
import LOGO_IMG from "../../public/logo.png";
import VID_IMG from "../../public/Video-call.png";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin.js";
const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  const handleSubmit = async (event) => {
    event.preventDefault();
    loginMutation(loginData);
  };
  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* Sign Up Form - Left Side */}
        <div className=" w-full lg:w-1/2 p-3 sm:p-8 flex flex-col">
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
              <div className="space-y-3">
                <div>
                  <h2 className="text-2xl font-semibold">Welcome Back</h2>
                  <p className="text-sm opacity-80">
                    Sign in to your account to continue your language journey
                  </p>
                </div>
                {error && (
                  <div className="alert alert-error mb-0.5">
                    <span>{error.response.data.message}</span>
                  </div>
                )}
                <div className="space-y-2">
                  <div className="form-control w-full">
                    <label className="label p-2">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="hello@example.com"
                      className="input input-bordered w-full"
                      value={loginData.email}
                      onChange={({ target }) =>
                        setLoginData({ ...loginData, email: target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label p-2">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="********"
                      className="input input-bordered w-full"
                      value={loginData.password}
                      onChange={({ target }) =>
                        setLoginData({ ...loginData, password: target.value })
                      }
                      required
                    />
                    <p className="text-xs opacity-70 mt-1">
                      Password must be atleast 6 characters long
                    </p>
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
                      Signing In ...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
                <div className="text-center mt-1">
                  <p className="text-sm">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-primary hover:underline">
                      Create Account
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

export default Login;
