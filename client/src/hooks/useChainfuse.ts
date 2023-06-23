import axios from 'axios';
import { response } from 'express';

const instance = axios.create({
    baseURL: 'http://localhost:8000/api'
});

export const useChainfuse = () => {
    /**
     * 
     * Method for user register
     * @param walletAddress 
     * 
     */
    const signup = async (walletAddress: String) => {
        const res = await instance.post(
            '/users/signup',
            {
                walletAddress: walletAddress
            },
            {
                headers: {
                    'Content-Type': "application/json"
                }
            }
        );
    }

    /**
     * Methor for user login
     * @param walletAddress 
     */
    const login = async (walletAddress: String) => {
        const res = await instance.post(
            '/users/login',
            {
                walletAddress: walletAddress
            },
            {
                headers: {
                    'Content-Type': "application/json"
                }
            }
        );
        if (res.status == 200) {
            /**
             * 
             * token will be store in state management, here is quick solution
             */
            const token = response.data.token
            localStorage.setItem('token', token)
            instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
    }

    return {
        signup,
        login,
    }
}
