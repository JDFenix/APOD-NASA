import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RootLayout from './src/navigate/RootLayout';

export default function App() {
  return (
    <NavigationContainer>
      <RootLayout />
    </NavigationContainer>
  );
}

