import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeStackNavigation from './homeScreenNavigation';
import MainStack from './mainStack';
import {AuthContext} from './authentication';
import auth from '@react-native-firebase/auth';

const MainNavigation = () => {
  //   const {user, setUser} = useContext(AuthContext);
  //   const [loading, setLoading] = useState(true);
  //   const [initializing, setInitializing] = useState(true);
  //   // Handle user state changes
  //   function onAuthStateChanged(user) {
  //     setUser(user);
  //     console.log('user is:' + user);
  //     if (initializing) setInitializing(false);
  //     setLoading(false);
  //   }
  //   useEffect(() => {
  //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //     return subscriber; // unsubscribe on unmount
  //   },[]);
  //     if (loading) {
  //       return <Loading />;
  //     }
  //   return (
  //     <NavigationContainer>
  //       {user == null ? (
  //         <MainStack intialPage={'SignIn'} />
  //       ) : (
  //         <MainStack intialPage={'HomePageScreen'} />
  //       )}
  //     </NavigationContainer>
  //   );
  return (
    <NavigationContainer>
      <MainStack intialPage={'SignIn'}></MainStack>
    </NavigationContainer>
  );
};

export default MainNavigation;
