'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { createContext, useState }  from 'react'
import { toast } from 'react-toastify'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const router = useRouter()

    const [state, setState] = useState({
        user: null,
        error: null,
        updated: false,
        loading: null,
    })

    const registerUser = async ({name, email, password}) => {

        try {

            const { data } = await axios.post(`${process.env.API_URL}/api/auth/register`, { name, email, password })
  
            if(data?.user) {
                router.push('/')
            }

        } catch (error) {

            const message = (error && error?.response && error?.response?.data && error?.response?.data?.message) ||
                            error?.message || error.toString();
                            
            setState((prev) => ({...prev, error: message }))

        }
    }

    const addNewAddress = async (address) => {

        try {
            const { data } = await axios.post(`${process.env.API_URL}/api/address`, address);
            if(data) {
                router.push('/me')
            }

        } catch (error) {
            const message = (error && error?.response && error?.response?.data && error?.response?.data?.message) ||
            error?.message || error.toString()
            setState((prev) => ({ ...prev, error: message }) )
            toast.error(message)
        }
    }

    const updateAddress = async (address, addressId) => {
        try {
            const { data } = await axios.put(`${process.env.API_URL}/api/address/${addressId}`, address);
            if(data?.address) {
                setState((prev) => ({ ...prev, updated: true }) )
                router.push(`/address/${addressId}`)
            }
        } catch (error) {
            const message = (error && error?.response && error?.response?.data && error?.response?.data?.message) ||
            error?.message || error.toString()
            setState((prev) => ({ ...prev, error: message }) )
            toast.error(message)
        }
    }

    const deleteAddress = async (addressId) => {
        try {
            
            const { data } = await axios.delete(`${process.env.API_URL}/api/address/${addressId}`);
            if(data?.success) {
                setState((prev) => ({ ...prev, updated: true }) )
                router.push('/me')
            }
        } catch (error) {
            const message = (error && error?.response && error?.response?.data && error?.response?.data?.message) ||
            error?.message || error.toString()
            setState((prev) => ({ ...prev, error: message }) )
            toast.error(message)
        }
    }

    const clearError = () => setState((prev) => ({...prev, error: null}));

    const loadUser = async () => {

        try {

            setState((prev) => ({ ...prev, loading: true }))
            const { data } = await axios.get('/api/auth/session?update');
  
            if(data?.user) {
                setState((prev) => ({ ...prev, user: data?.user }) )
                router.replace('/me')
            }

        } catch (error) {
            const message = (error && error?.response && error?.response?.data && error?.response?.data?.message) ||
                            error?.message || error.toString()

            toast.error(message)

        }
    }

    const updateProfile = async (formData) => {
        try {

            setState((prev) => ({ ...prev, loading: true }));

            const { data } = await axios.put(`${process.env.API_URL}/api/auth/me/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
  
            if(data?.user) {
                loadUser()
                setState((prev) => ({ ...prev, loading: false }) )
            }
        } catch (error) {
            console.log({ error })
            const message = (error && error?.response && error?.response?.data && error?.response?.data?.message) ||
                            error?.message || error.toString()
           
            setState((prev) => ({ ...prev, error: message, loading: false }) )

        }
    }

    const updatePassword = async ({currentPassword, newPassword}) => {

        try {

            setState((prev) => ({...prev, loading: true }))
            const { data } = await axios.put(`${process.env.API_URL}/api/auth/update_password`, {currentPassword, newPassword});
  
            if(data?.user) {
                router.replace('/me')
            }

        } catch (error) {
            const message = (error && error?.response && error?.response?.data && error?.response?.data?.message) ||
                            error?.message || error.toString()

            setState((prev) => ({...prev, error: message, loading: false }))
            toast.error(message)

        }
    }

    const updateUser = async (userId, userData) => {

        try {

            setState((prev) => ({...prev, loading: true }))
            const { data } = await axios.put(`${process.env.API_URL}/api/admin/users/${userId}`, {userData});
  
            if(data?.success) {
                router.replace(`/admin/users/${userId}`)
            }

        } catch (error) {
            const message = (error && error?.response && error?.response?.data && error?.response?.data?.message) ||
                            error?.message || error.toString()

            setState((prev) => ({...prev, error: message, loading: false }))
            toast.error(message)

        }
    }

    const deleteUser = async (userId) => {

        try {

            setState((prev) => ({...prev, loading: true }))
            const { data } = await axios.delete(`${process.env.API_URL}/api/admin/users/${userId}`);
  
            if(data?.success) {
                router.replace('/admin/users')
            }

        } catch (error) {
            const message = (error && error?.response && error?.response?.data && error?.response?.data?.message) ||
                            error?.message || error.toString()

            setState((prev) => ({...prev, error: message, loading: false }))
            toast.error(message)

        }
    }

    
    return <AuthContext.Provider value={{
        user: state.user,
        error: state.error,
        state: state,
        updated: state.updated,
        setState: setState,
        registerUser: registerUser,
        addNewAddress,
        updateAddress,
        updateProfile,
        updatePassword,
        deleteAddress,
        updateUser,
        deleteUser,
        clearError: clearError
     }}>
        { children }
    </AuthContext.Provider>
}

export default AuthContext