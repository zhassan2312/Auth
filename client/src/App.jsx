import {Route,Routes} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import VerificationPage from './pages/VerificationPage'
import HomePage from './pages/HomePage'
import useStore from './store/index.js'
import Navbar from './components/Navbar.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
function App() {

  const {user}=useStore();
  
  return (
    <>
      {user?.isAuth?<Navbar/>:<Header/>}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={user?.isAuth?<HomePage/>:<LoginPage />} />
        <Route path="/signup" element={user?.isAuth?<HomePage/>:<SignupPage />} />
        <Route path="/verification" element={user?.isAuth?<HomePage/>:<VerificationPage />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
