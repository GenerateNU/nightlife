import { NavigationContainer } from '@react-navigation/native';
import { BottomNavigator } from "@/navigation/BottomNavigator";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "@/screens/LoginScreen";
import { AuthProvider, useAuth } from "@/context/AuthContext";

const Stack = createNativeStackNavigator();

const LoginStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={LoginScreen}
                options={{
                    title: "Nightlife 🌃",
                    headerStyle: {
                        backgroundColor: '#111729',
                    },
                    headerTintColor: '#fff',
                }}
            />
        </Stack.Navigator>
    );
};

export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <MainNavigator />
            </NavigationContainer>
        </AuthProvider>
    );
}

const MainNavigator = () => {
    const { accessToken } = useAuth();
    return accessToken ? <BottomNavigator /> : <LoginStack />;
};
