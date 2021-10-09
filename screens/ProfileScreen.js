import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Avatar} from 'react-native-elements';
import Colors from '../constants/Colors';

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
        console.log('Total users:', querySnapshot.size);

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
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={styles.headerWelcome}>Hello!</Text>
        <Text style={styles.headerText}>
          {firstName.toUpperCase()} {lastName.toUpperCase()}
        </Text>
        <Avatar
          size="xlarge"
          rounded
          title={
            firstName.substring(0, 1).toUpperCase() +
            lastName.substring(0, 1).toUpperCase()
          }
          source={{
            uri: 'https://api-private.atlassian.com/users/8f525203adb5093c5954b43a5b6420c2/avatar',
          }}
        />
      </View>
      <View style={styles.formContainer}>
        <Text>Hello</Text>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    padding: '4%',
  },
  formContainer: {
    backgroundColor: 'orange',
  },
  headerText: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 19,
    marginBottom: 10,
  },
  headerWelcome: {
    color: 'black',
    fontSize: 15,
  },
});
