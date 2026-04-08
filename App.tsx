import { NavigationContainer } from '@react-navigation/native';
import RootLayout from './src/navigate/RootLayout';
import AuthProvider from './src/feature/auth/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootLayout />
      </NavigationContainer>
    </AuthProvider>
  );
}

