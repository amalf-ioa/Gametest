import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GameProvider } from './src/context/GameContext';
import AudioManager from './src/services/AudioManager';

import SplashScreen from './src/screens/SplashScreen';
import MainMenuScreen from './src/screens/MainMenuScreen';
import LevelSelectScreen from './src/screens/LevelSelectScreen';
import GameBoardScreen from './src/screens/GameBoardScreen';
import RenovationScreen from './src/screens/RenovationScreen';
import ShopScreen from './src/screens/ShopScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    AudioManager.loadSounds().catch(console.warn);
  }, []);

  return (
    <GameProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
            cardStyle: { backgroundColor: '#87CEEB' },
          }}
        >
          <Stack.Screen name="Splash"      component={SplashScreen} />
          <Stack.Screen name="MainMenu"    component={MainMenuScreen} />
          <Stack.Screen name="LevelSelect" component={LevelSelectScreen} />
          <Stack.Screen name="GameBoard"   component={GameBoardScreen} />
          <Stack.Screen name="Renovation"  component={RenovationScreen} />
          <Stack.Screen name="Shop"        component={ShopScreen} />
          <Stack.Screen name="Settings"    component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GameProvider>
  );
}
