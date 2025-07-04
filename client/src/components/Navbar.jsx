import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useStore from '../store/index.js'

const Navbar = () => {
  const { user, logout } = useStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully!')
      navigate('/login')
    } catch (error) {
      toast.error('Logout failed')
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
                <span className="text-gray-600">Welcome, {user?.name}</span>
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