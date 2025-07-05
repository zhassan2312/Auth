import { useState, useRef, useEffect } from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import Header from '../components/Header.jsx'
import useAuthStore from '../store/useAuthStore.js'

const VerificationPage = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [isResending, setIsResending] = useState(false)
  const [timer, setTimer] = useState(60)
  const inputRefs = useRef([])
  const navigate = useNavigate()

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [timer])

  const handleChange = (index, value) => {
    if (value.length > 1) return
    
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  // Use Zustand store properly
  const verifyEmail = useAuthStore(state => state.verifyEmail);
  const resendVerificationCode = useAuthStore(state => state.resendVerificationCode);
  const { isLoading, user } = useAuthStore();
 

  
  // Get email from location state
  const location=useLocation()
  const email = location.state.email|| user?.email;

  const handleSubmit = async (e) => {
    e.preventDefault()
    const otpCode = otp.join('')
    
    if (otpCode.length !== 6) {
      toast.error('Please enter a complete 6-digit code')
      return
    }

    try {
      const response=await verifyEmail(email, otpCode);
      if (response.status === 200) {
        toast.success('Email verified successfully!')
        navigate('/')
      }
      if (response.status === 404) toast.error('User not found');
      if(response.status === 400) toast.error('OTP has expired or already used.');
      if(response.status === 401) toast.error('OTP is invalid. Please try again.');
      if(response.status === 409) toast.error('User already verified');
      if(response.status === 500) toast.error('Internal Server Error. Please try again later.');
        
        
      
    } catch (error) {
      toast.error(error.response?.message || 'Verification failed')
      setOtp(['', '', '', '', '', ''])
      inputRefs.current[0]?.focus()
    } 
  }

  const handleResend = async () => {
    setIsResending(true)
    setTimer(60)
    
    try {
      const response = await resendVerificationCode()
      if (response.status === 200) {
        toast.success('OTP Resent!')
      }
      if (response.status === 404) toast.error('User not found');
      if(response.status === 500) toast.error('Internal Server Error. Please try again later.');
        
        
    } catch (error) {
      toast.error(error.response?.message || 'Resend failed')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <Header 
              title="Verify Your Email"
              subtitle="We've sent a 6-digit code to your email"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                Enter Verification Code
              </label>
              <div className="flex justify-center space-x-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="0"
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || otp.join('').length !== 6}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </div>
              ) : (
                'Verify Email'
              )}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Didn't receive the code?
              </p>
              {timer > 0 ? (
                <p className="text-sm text-gray-500">
                  Resend code in {timer} seconds
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isResending}
                  className="text-sm font-medium text-purple-600 hover:text-purple-500 disabled:opacity-50"
                >
                  {isResending ? 'Sending...' : 'Resend Code'}
                </button>
              )}
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                Check your spam folder if you don't see the email
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default VerificationPage