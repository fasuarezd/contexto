import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NavigationContainer, navigation } from '@react-navigation/native';
import { View, StatusBar, ActivityIndicator } from 'react-native';


// Configuración del Stack Navigator con el header
function AppNavigator() {

    const { userToken, loading } = useContext(AuthContext);

    if (loading) {
        // Muestra un indicador de carga mientras se verifica el token
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <>

            <StatusBar
                barStyle="light-content" // Cambia a 'dark-content' para íconos oscuros
                backgroundColor="#000" // Fondo negro para la barra de estado
            />

            <NavigationContainer>
                <Stack.Navigator>

                    {/* Si estas logueado usa tu menu, si no muestra el login */}
                    {userToken ? (
                        <Stack.Screen
                            name="Main"
                            component={BottomTabNavigator}
                            options={{
                                ...commonBrand
                            }}
                        />
                    ) : (
                        <Stack.Screen
                            name='Login'
                            component={Login_Screen}
                            options={{
                                headerShown: false
                            }}
                        />
                    )}

                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

export default AppNavigator;
