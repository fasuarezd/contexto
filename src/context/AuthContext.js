import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

import { API_URL } from '../config/Config';

// Crear el contexto
export const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {

    const [userToken, setUserToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Función para hacer login
    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/users/login`, { email, password });
            const { accessToken } = response.data;

            await SecureStore.setItemAsync('accessToken', accessToken);

            setUserToken(accessToken);
            return { success: true };

        } catch (error) {
            return { success: false, message: 'Error en el login. Intenta nuevamente.' };
        }
    };

    // Función para hacer logout
    const logout = async () => {
        await SecureStore.deleteItemAsync('accessToken');
        setUserToken(null);
    };

    // Verifica si el usuario está logueado
    const isLoggedIn = async () => {
        const token = await SecureStore.getItemAsync('accessToken');
        if (token) setUserToken(token);
        setLoading(false);
    };

    // Configuración del interceptor de Axios
    useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use(async (config) => {
            const token = await SecureStore.getItemAsync('accessToken');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        }, (error) => Promise.reject(error));


        // Limpieza de interceptores al desmontar el contexto
        return () => {
            axios.interceptors.request.eject(requestInterceptor);
        };
    }, []);

    // Efecto para verificar si está logueado al cargar la app
    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                userToken,
                login,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
