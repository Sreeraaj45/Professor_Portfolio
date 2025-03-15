import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes';
import Preloader from './pages/Preloader'; // Import Preloader

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (adjust as needed)
    setTimeout(() => setLoading(false), 1500);

    // Initialize AOS animations after loading
    if (!loading) {
      AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-out-cubic',
      });
    }
  }, [loading]); // Run AOS init after loading is complete

  return (
    <Router>
      {loading ? (
        <Preloader />
      ) : (
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar />
          <main className="flex-1 ml-0 md:ml-64">
            <AppRoutes />
          </main>
        </div>
      )}
    </Router>
  );
}

export default App;
