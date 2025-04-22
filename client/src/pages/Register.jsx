import React from "react";
// import "../css/Register.css";
import registerImage from "../assets/registerImage.jpg";

const Register = () => {
  return (
    <div className="bg-gray-50">
      <header>
        <div className="header-container flex justify-between items-center m-5 col-md-2">
          <a href="../index.html">
            <img
            // logo here please
              src="logo here"
              className="img-fluid ml-4"
              width="110"
              alt=""
            />
          </a>
          <div className="header-container-1">
            <a href="../html/login.html">
              <h2 className="text-grey-800">
                Already have an account?{" "}
                <span className="text-black underline font-bold">Sign in</span>
              </h2>
            </a>
          </div>
        </div>
      </header>

      <div className="container px-0 flex justify-start items-start">
        <div className="flex-1 container-1">
          <img
            className="rounded-xl"
            id="business-image"
            src={registerImage}
            alt="Business Registration"
          />
        </div>

        <div className="container-2 flex-1 p-4 flex flex-col items-center w-full">
          <h1 className="text-3xl font-bold mb-4 w-[70%] text-left mx-auto">
            Create an account
          </h1>

          <form id="signup-form" className="w-full space-y-4 text-center">
            <input
              type="text"
              id="personal_Firstname"
              name="personal_Firstname"
              placeholder="First name"
              className="w-[35%] p-4 border rounded-lg text-sm mx-auto"
            />
            <input
              type="text"
              id="personal_Lastname"
              name="personal_Lastname"
              placeholder="Last Name"
              className="w-[35%] p-4 border rounded-lg text-sm mx-auto"
            />
            <input
              type="text"
              id="personal_email"
              name="personal_email"
              placeholder="Email"
              className="w-[70%] p-4 border rounded-lg text-sm mx-auto"
            />
            <input
              type="password"
              id="personal_password"
              name="personal_password"
              placeholder="Password"
              className="w-[70%] p-4 border rounded-lg text-sm mx-auto"
            />
            <div className="text-left mb-4 w-[70%] mx-auto">
              <p className="w-full text-sm">
                By selecting Create personal account, you agree to our User
                Agreement and acknowledge reading our User Privacy Notice.
              </p>
            </div>
            <button
              type="submit"
              className="px-6 py-3 text-white bg-black rounded-3xl w-[70%] mx-auto"
            >
              Create account
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#e5e5e5] py-4 text-center mt-10">
      <p className="text-[#767676] text-xs leading-snug m-0 px-4">
          Copyright © 1995-2025 Fitness Buddy Inc. All Rights Reserved.{" "}
          <a href="#" className="text-[#0654ba] no-underline px-1 hover:underline hover:text-[#0654ba]">Accessibility</a>,{" "}
          <a href="#" className="text-[#0654ba] no-underline px-1 hover:underline hover:text-[#0654ba]">User Agreement</a>,{" "}
          <a href="#" className="text-[#0654ba] no-underline px-1 hover:underline hover:text-[#0654ba]">Privacy</a>,{" "}
          <a href="#" className="text-[#0654ba] no-underline px-1 hover:underline hover:text-[#0654ba]">Payments Terms of Use</a>,{" "}
          <a href="#" className="text-[#0654ba] no-underline px-1 hover:underline hover:text-[#0654ba]">Cookies</a>,{" "}
          <a href="#" className="text-[#0654ba] no-underline px-1 hover:underline hover:text-[#0654ba]">CA Privacy Notice</a>,{" "}
          <a href="#" className="text-[#0654ba] no-underline px-1 hover:underline hover:text-[#0654ba]">Your Privacy Choices</a>{" "}and{" "}
          <a href="#" className="text-[#0654ba] no-underline px-1 hover:underline hover:text-[#0654ba]">AdChoice</a>
        </p>
      </footer>
      <br />
      <br />
    </div>
  );
};

export default Register;
