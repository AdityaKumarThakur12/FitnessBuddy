import React from "react";

const Login = () => {
  return (
    <div className="m-0 p-0 box-border">
      <header>
        <div className="flex justify-between items-start col-md-2">
          <a href="../index.html">
            <img
            // logo here please
              src=""
              className="img-fluid ml-4"
              width="110"
              alt="logo"
            />
          </a>
          <div className="header-container-1">
            <a href="../html/feedback.html">
              <p className="text-gray-800 text-sm">Tell us what you think</p>
            </a>
          </div>
        </div>
      </header>

      <div className="w-full sm:w-3/6 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto py-10">
        <div className="flex flex-col items-center">
          {/* Sign In Section */}
          <div className="w-full">
            <h1 className="text-3xl text-center">Sign in to your account</h1>
            <p className="text-center">
              New to Fitness Buddy?{" "}
              <a href="../html/signup.html" className="underline">
                Create account
              </a>
            </p>
            <br />
            <form id="login-form">
              <input
                className="bg-gray-100 p-2 border border-black rounded-md w-full mb-4"
                type="text"
                name="loginEmail"
                id="loginEmail"
                placeholder="Email"
              />
              <input
                className="bg-gray-100 p-2 border border-black rounded-md w-full mb-4"
                type="password"
                name="loginPassword"
                id="loginPassword"
                placeholder="Password"
              />
              <br />
              <button
                type="submit"
                className="w-full rounded-3xl bg-blue-500 text-white p-3"
              >
                Continue
              </button>
            </form>
          </div>

          {/* OR line */}
          <div className="w-full text-center my-4">
            <span className="border-t border-gray-500 w-full inline-block">
              or
            </span>
          </div>

          {/* Social Buttons */}
          <div className="w-full">
            <button
              type="button"
              className="mb-3 flex justify-between items-center py-3 px-6 rounded-3xl border border-black text-center font-bold w-full"
            >
              <i className="fab fa-google fa-2x"></i>
              <span className="flex-grow-1 ml-2">Continue with Google</span>
              <i className="opacity-0 fab fa-google fa-2x"></i>
            </button>

            <button
              type="button"
              className="mb-3 flex justify-between items-center py-3 px-6 rounded-3xl border border-black text-center font-bold w-full"
            >
              <i className="fab fa-facebook-square fa-2x"></i>
              <span className="flex-grow-1 ml-2">Continue with Facebook</span>
              <i className="opacity-0 fab fa-google fa-2x"></i>
            </button>

            <button
              type="button"
              className="mb-3 flex justify-between items-center py-3 px-6 rounded-3xl border border-black text-center font-bold w-full"
            >
              <i className="fab fa-apple fa-2x"></i>
              <span className="flex-grow-1 ml-2">Continue with Apple</span>
              <i className="opacity-0 fab fa-google fa-2x"></i>
            </button>
          </div>

          {/* Stay Signed In */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="interested-in-buying"
              className="mr-2 text-black"
            />
            <label htmlFor="interested-in-buying">Stay signed in</label>
            <i className="fa-solid fa-circle-info m-1.5"></i>
          </div>
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

export default Login;
