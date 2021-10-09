import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ProfileScreen = () => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [userProfileData, setUserProfileData] = useState({});

  useEffect(() => {
    _retrieveData();
    // unsubscribe on unmount
  }, []);

  useEffect(() => {
    _storeData(user);
  }, []);

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('userName');
      if (value !== null) {
        // We have data!!
        let val = typeof value;
        let js = JSON.parse(value);
        console.log('user name:1 ', js.user.email);
        setEmail(js.user.email);
        _getId(js.user.email);
        // console.log(c);
      }
    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  };
  const _getId = async e => {
    const list = [];
    let l;
    console.log('email is', e);
    firestore()
      .collection('User')
      .where('email', '==', e)
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
          setUser(documentSnapshot.id);
          setFirstName(documentSnapshot.data().firstName);
          setLastName(documentSnapshot.data().lastName);
          setPhone(documentSnapshot.data().mobile);
        });
      });
  };
  const _storeData = async user => {
    try {
      await AsyncStorage.setItem('userKey', user);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      // Error saving data
    }
  };

  return loading ? (
    <ActivityIndicator />
  ) : (
    <View>
      <Text>
        Hello{user}
        {firstName}
        {lastName}
        {phone}
      </Text>
      <Button
        title={'add'}
        onPress={() => {
          setLoading(true);
        }}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
