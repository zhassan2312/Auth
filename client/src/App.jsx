import {Route,Routes} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import VerificationPage from './pages/VerificationPage'
import HomePage from './pages/HomePage'
import useStore from './store/index.js'
import Navbar from './components/Navbar.jsx'

function App() {
  const {user} = useStore();
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={user?.isAuth ? <HomePage /> : <LoginPage />} />
        <Route path="/signup" element={user?.isAuth ? <HomePage /> : <SignupPage />} />
        <Route path="/verify" element={user?.isAuth ? <HomePage /> : <VerificationPage />} />
      </Routes>
    </>
  )
}

export default App
