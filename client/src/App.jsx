import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Pages/Home';
// import WorkoutDetails from './Pages/workoutDetail';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Exercises from './Pages/exercises';
import DietPlan from './Pages/dietPlan';
import WorkoutList from './pages/WorkoutsList';
import AOS from "aos";
import "aos/dist/aos.css";
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import Loading from './Components/loading';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import BuddyMatching from './pages/BuddyMatching';
import Messaging from './pages/Messaging';
// import WorkoutTracking from './pages/WorkoutTracking';
import Settings from './pages/Settings';
import GymFinder from './pages/GymFinder';
import Progress from './pages/Progress';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/exercises' element={<Exercises />} />
            <Route path='/diet-plan' element={<DietPlan />} />
            <Route path='/workouts' element={<WorkoutList/>}/>
            {/* <Route path="/workouts/:id" element={<WorkoutDetails />} /> */}
            <Route path='/profile' element={<Profile />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/buddymatching' element={<BuddyMatching />} />
            <Route path='/messaging' element={<Messaging />} />
            {/* <Route path='/workouttracking' element={<WorkoutTracking />} /> */}
            <Route path='/settings' element={<Settings />} />
            <Route path='/gymfinder' element={<GymFinder />} />
            <Route path='/progress' element={<Progress />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer 
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <Footer />
        </Router>
      )}
    </div>
  );
};

export default App;