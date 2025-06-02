import React from "react";
import useUserAuth from "../hooks/useUserAuth.js";
import { Link, useLocation } from "react-router";
import LOGO_IMG from "../../public/logo.png";
import { BellIcon, LogOutIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector.jsx";
import useLogout from "../hooks/useLogout.js";

const Navbar = () => {
  const { authUser } = useUserAuth();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full gap-3 md:gap-6">
          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5">
                <img
                  src={LOGO_IMG}
                  alt="Logo_Image"
                  className="size-9 rounded-lg text-primary"
                />
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
                  PingChat
                </span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link
              to="/notifications"
              className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case`}
            >
              <BellIcon className="size-5 text-base-content opacity-70" />
            </Link>
          </div>
          <ThemeSelector />
          <div className="avatar">
            <div className="w-9 rounded-full">
              <img
                src={authUser?.profilePic}
                alt="User Avatar"
                rel="noreferrer"
              />
            </div>
          </div>
          <button
            className="btn btn-ghost brightness-200 btn-circle"
            onClick={logoutMutation}
          >
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
