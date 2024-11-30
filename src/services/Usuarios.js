/* Aunque el endpoint solicite JWT el interceptor de AXIOS que esta en el AuthContext envia el token */

import axios from 'axios';
import { API_URL } from '../config/Config';

// Función para obtener los datos del usuario autenticado
export const fetchUserDetails = async () => {
    try {
        const response = await axios.get(`${API_URL}/users/datos`);
        return response.data.user; // Devuelve los datos del usuario
    } catch (error) {
        // Si hay un error, verifica si el error tiene respuesta del backend
        if (error.response && error.response.data) {
            const message = error.response.data.error || 'Algo salió mal. Intenta nuevamente.';
            return { success: false, message }; // Si el backend devuelve un error
        }
        // Error en la solicitud o error genérico
        return { success: false, message: 'Algo salió mal. Intenta nuevamente.' };
    }
};

// Función para modificar los datos del usuario autenticado
export const updateUserDetails = async (updatedData) => {
    try {
        const response = await axios.put(
            `${API_URL}/users/datos`,
            updatedData,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error actualizando datos:', error);
        return { success: false, message: 'No se pudieron guardar los datos.' };
    }
};
