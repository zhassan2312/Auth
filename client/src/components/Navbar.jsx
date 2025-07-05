import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useAuthStore from '../store/useAuthStore.js'
import { useEffect,useState } from 'react'

const Navbar = () => {
  const { user } = useAuthStore()
  const navigate = useNavigate()
    const logout = useAuthStore(state => state.logout);
  

  const handleLogout = async () => {
    try {
      const response = await logout();
      toast.success('Logged out successfully!')
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error);
      
      if (error.message === 'Request timeout' || error.code === 'ECONNABORTED') {
        toast.error('Request expired - Server took too long to respond');
      } else if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          toast.error('Error: Unauthorized access');
        } else if (status === 500) {
          toast.error('Internal Server Error. Please try again later.');
        } else {
          toast.error('Logout failed');
        }
      } else {
        toast.error('Logout failed - Network error');
      }
    }
  }


  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Auth App</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {user?.isAuth ? (
              <>
                <span className="text-gray-600">Welcome, {user?.fullName}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar