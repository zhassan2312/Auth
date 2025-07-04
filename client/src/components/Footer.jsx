const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            © 2025 Auth App. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-500 text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500 text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500 text-sm">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer