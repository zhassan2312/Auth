import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';

const useAuthStore = create((set) => ({
    user: null,
    isLoading: false,
    error:null,

    // Unified response handler
    handleResponse: async (request) => {
        set({ isLoading: true, error: null });
        try {
            const response = await request(); // Capture the response
            set({ 
                user: response.data
            });
            return response; // Return the response
        } catch (error) {
            let errorMessage = 'An error occurred';
            
            if (error.message === 'Request timeout' || error.code === 'ECONNABORTED') {
                errorMessage = 'Request expired - Server took too long to respond';
            } else if (error.response) {
                errorMessage = `Server error: ${error.response.status}`;
            } else if (error.request) {
                errorMessage = 'Network error - Please check your connection';
            }
            
            set({ 
                error: { ...error, message: errorMessage },
            });
            throw error; // Throw the error for component handling
        } finally {
            set({ isLoading: false });
        }
    },

    // API methods
    login: async (credentials) => { // Accept credentials object
        return useAuthStore.getState().handleResponse(() => 
            axiosInstance.post('/login', credentials)
        );
    },
    
    signup: async (fullName, email, password) => {
        return useAuthStore.getState().handleResponse(() => 
            axiosInstance.post('/signup', { fullName, email, password })
        );
    },
    
    verifyEmail: async (email, otp) => {
        return useAuthStore.getState().handleResponse(() => 
            axiosInstance.post('/verify', { otp, email })
        );
    },
    
    checkAuth: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/check-auth');
            set({ 
                user: response.data,
                isLoading: false 
            });
            return response;
        } catch (error) {
            // If checkAuth fails, clear user state (user not authenticated)
            set({ 
                user: null,
                error: null, // Don't set error for failed auth check
                isLoading: false 
            });
            throw error;
        }
    },
    
    updateImage: async (image) => {
        return useAuthStore.getState().handleResponse(() => 
            axiosInstance.put('/update-image', { image })
        );
    },
    
    updateName: async (name) => {
        return useAuthStore.getState().handleResponse(() => 
            axiosInstance.put('/update-name', { name })
        );
    },
    
    updatePassword: async (currentPassword, newPassword) => {
        return useAuthStore.getState().handleResponse(() => 
            axiosInstance.put('/update-password', { currentPassword, newPassword })
        );
    },
    
    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.post('/logout'); // Changed from GET to POST
            set({ 
                user: null, // Clear user state on logout
                isLoading: false 
            });
            return response;
        } catch (error) {
            set({ 
                error: error,
                isLoading: false 
            });
            throw error;
        }
    },
    
    deleteUser: async () => {
        return useAuthStore.getState().handleResponse(() => 
            axiosInstance.delete('/delete-user')
        );
    },
    
    resendVerificationCode: async (email) => {
        return useAuthStore.getState().handleResponse(() => 
            axiosInstance.post('/resend-verification', { email })
        );
    }
}));

export default useAuthStore;