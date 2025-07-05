import {Route,Routes} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import VerificationPage from './pages/VerificationPage'
import HomePage from './pages/HomePage'
import useStore from './store/useAuthStore.js'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { useEffect, useState } from 'react'

function App() {
  const {user, isLoading, checkAuth} = useStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await checkAuth();
      } catch (error) {
        // If checkAuth fails, user is not authenticated
        console.log('Not authenticated');
      } finally {
        setIsInitialized(true);
      }
    };
    
    initAuth();
  }, []);

  // Show loading spinner while checking authentication
  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={user?.isAuth ? <HomePage /> : <LoginPage />} />
          <Route path="/signup" element={user?.isAuth ? <HomePage /> : <SignupPage />} />
          <Route path="/verify" element={user?.isAuth ? <HomePage /> : <VerificationPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
