import { Link } from 'react-router-dom'
import { FiHeart, FiInstagram, FiTwitter, FiFacebook, FiYoutube } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-xl font-bold text-sky-600 dark:text-sky-400">
              FitPulse
            </Link>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              AI-powered fitness coaching tailored to your personal goals
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-sky-500 dark:hover:text-sky-400">
                <FiTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-sky-500 dark:hover:text-sky-400">
                <FiInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-sky-500 dark:hover:text-sky-400">
                <FiFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-sky-500 dark:hover:text-sky-400">
                <FiYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-300 uppercase tracking-wider">
              Explore
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/workouts" className="text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400">
                  Workouts
                </Link>
              </li>
              <li>
                <Link to="/exercises" className="text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400">
                  Exercise Guide
                </Link>
              </li>
              <li>
                <Link to="/diet-plan" className="text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400">
                  Diet Plans
                </Link>
              </li>
              <li>
                <Link to="/progress" className="text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400">
                  Progress Tracking
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-300 uppercase tracking-wider">
              Support
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-300 uppercase tracking-wider">
              Newsletter
            </h3>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Get the latest fitness tips and updates
            </p>
            <div className="mt-4">
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 rounded-l-md"
                />
                <button
                  type="submit"
                  className="flex-shrink-0 bg-sky-600 hover:bg-sky-700 border border-sky-600 text-white py-2 px-4 rounded-r-md"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} FitPulse AI. All rights reserved.
          </p>
          <p className="mt-2 md:mt-0 text-sm text-gray-500 dark:text-gray-400 flex items-center">
            Made with <FiHeart className="mx-1 text-red-500" /> for a healthier you
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer