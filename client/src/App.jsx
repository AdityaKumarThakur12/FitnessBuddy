import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Exercises from './Pages/exercises';
import DietPlan from './Pages/dietPlan';
import AOS from "aos";
import "aos/dist/aos.css";
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import Loading from './Components/loading';
import Profile from './pages/Profile';

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
            <Route path='/profile' element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      )}
    </div>
  );
};

export default App;