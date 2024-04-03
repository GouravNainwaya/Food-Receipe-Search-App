import React, { useRef, lazy, Suspense } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();

// Lazy load screen components
const LazyHome = lazy(() => import('./screens/Home/Home'));
const LazyDetails = lazy(() => import('./screens/Details/Details'));
const LazyFavourites = lazy(() => import('./screens/Favourites/Favourites'));

// Fallback component for Suspense
const SuspenseFallback = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="orange" />
  </View>
);

const Navigation = () => {
  const navigationRef = useRef();

  return (
    <NavigationContainer ref={navigationRef} fallback={<ActivityIndicator size="large" color="orange" />}>
      <Stack.Navigator >
        <Stack.Screen options={{headerShown: false}} name="Home">
          {props => (
            <Suspense fallback={<SuspenseFallback />}>
              <LazyHome {...props} />
            </Suspense>
          )}
        </Stack.Screen>
        <Stack.Screen name="Details">
          {props => (
            <Suspense fallback={<SuspenseFallback />}>
              <LazyDetails {...props} />
            </Suspense>
          )}
        </Stack.Screen>
        <Stack.Screen  name="Favourites">
          {props => (
            <Suspense fallback={<SuspenseFallback />}>
              <LazyFavourites {...props} />
            </Suspense>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
