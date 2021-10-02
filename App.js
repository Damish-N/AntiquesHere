import React from 'react';
import 'react-native-gesture-handler';
import MainNavigation from './navigations/mainNavigation';
import {AuthProvider} from './navigations/authentication';

const App = () => {
  return (
    <AuthProvider>
      <MainNavigation />
    </AuthProvider>
  );
};

export default App;
