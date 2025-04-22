import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import AOS from "aos";
import "aos/dist/aos.css"

const App = () => {

  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div>

      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
        <Footer />
      </Router>

    </div>
  )
}

export default App
