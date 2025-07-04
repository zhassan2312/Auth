import useStore from '../store/index.js'
import Header from '../components/Header.jsx'

const HomePage = () => {
  const { user } = useStore()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Header 
            title={user?.isAuth ? `Welcome back, ${user?.name}!` : "Welcome to Auth App"}
            subtitle={user?.isAuth ? "You are successfully logged in" : "Your secure authentication solution"}
          />

          {user?.isAuth ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Account Verified</h2>
                <p className="text-gray-600 mb-6">Your account is active and ready to use.</p>
                
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h3 className="font-semibold text-gray-800 mb-2">Account Information</h3>
                    <p className="text-sm text-gray-600">Name: {user?.name}</p>
                    <p className="text-sm text-gray-600">Email: {user?.email}</p>
                    <p className="text-sm text-gray-600">Status: Verified</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h3 className="font-semibold text-gray-800 mb-2">Security</h3>
                    <p className="text-sm text-gray-600">✓ Email verified</p>
                    <p className="text-sm text-gray-600">✓ Account secured</p>
                    <p className="text-sm text-gray-600">✓ Login protected</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Secure Authentication</h2>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Experience seamless and secure authentication with our modern login system. 
                  Your data is protected with industry-standard security measures.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">Secure</h3>
                    <p className="text-sm text-gray-600">End-to-end encryption</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">Fast</h3>
                    <p className="text-sm text-gray-600">Quick verification</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">Simple</h3>
                    <p className="text-sm text-gray-600">Easy to use</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomePage