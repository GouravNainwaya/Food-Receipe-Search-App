import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Navigation from './src/Navigation';
import { MMKV } from 'react-native-mmkv';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export const storage = new MMKV();

const App = () => {
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation />
    </GestureHandlerRootView>
  ) ;
};

export default App;

const styles = StyleSheet.create({});
