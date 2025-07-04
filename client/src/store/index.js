import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

const useStore = create((set) => ({
    user: null,
    isLoading: false,
    error: null,
    setUser: (user) => set({ user }),
    login: async (email, password) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
            set({ user: response.data.user});
        } catch (error) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },
    signup: async (fullName, email, password) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(`${API_URL}/api/auth/signup`, { fullName, email, password });
            set({ user: response.data.user });
        } catch (error) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },
    verification: async (otp, email) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(`${API_URL}/api/auth/verify`, { otp, email });
            set({ user: response.data.user });
        } catch (error) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },
    checkAuth: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get(`${API_URL}/api/auth/check-auth`);
            set({ user: response.data.user });
        } catch (error) {
            set({ error: error.response.data.message, user: null });
        } finally {
            set({ isLoading: false });
        }
    },
    updateImage:async(image)=>{
        set({ isLoading: true });
        try {
            const response = await axios.put(`${API_URL}/api/auth/update-image`,{image});
            set({ user: response.data.user });
        } catch (error) {
            set({ error: error.response.data.message});
        } finally {
            set({ isLoading: false });
        }
    },
    updateName:async(name)=>{
        set({ isLoading: true });
        try {
            const response = await axios.put(`${API_URL}/api/auth/update-name`,{name});
            set({ user: response.data.user });
        } catch (error) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },
    updatePassword:async(password)=>{
        set({ isLoading: true });
        try {
            const response = await axios.put(`${API_URL}/api/auth/update-password`,{password});
            set({ user: response.data.user });
        } catch (error) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },
    logout:async()=>{
        set({isLoading:true});
        try{
            const response=await axios.get(`${API_URL}/api/auth/logout`)
            set({ user: null });
        }catch(error){
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },
    deleteUser:async()=>{
        set({isLoading:true});
        try{
            const response=await axios.get(`${API_URL}/api/auth/delete-user`)
            set({ user: null });
        }catch(error){
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    }
}));

export default useStore;
