import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';

const useAuthStore = create((set) => ({
    user: null,
    isLoading: false,
    error: null,
    message: "",
    success: false,

    // Unified response handler
    handleResponse: async (request) => {
        set({ isLoading: true, error: null, message: "", success: false });
        try {
            const response = await request();
            set({ 
                user: response.data.user || null,
                message: response.data.message || "",
                success: true
            });
            return response;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Request failed";
            set({ 
                error: errorMessage,
                message: error.response?.data?.message || "",
                success: false 
            });
            throw error; // Re-throw for component-level handling
        } finally {
            set({ isLoading: false });
        }
    },

    // API methods
    login: async (email, password) => {
        return useAuthStore.getState().handleResponse(() => 
            axiosInstance.post('/login', { email, password })
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
        return useAuthStore.getState().handleResponse(() => 
            axiosInstance.get('/check-auth')
        );
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
        return useAuthStore.getState().handleResponse(() => 
            axiosInstance.post('/logout')
        );
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