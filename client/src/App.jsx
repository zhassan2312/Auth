import {Route,Routes} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import VerificationPage from './pages/VerificationPage'
import HomePage from './pages/HomePage'
import useStore from './store/index.js'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const {user} = useStore();
  
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
