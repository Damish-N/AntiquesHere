import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Avatar, Input} from 'react-native-elements';
import Colors from '../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [userProfileData, setUserProfileData] = useState({});
  const [editable, setEditable] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [contactNoError, setContactNoError] = useState('s');
  const [firstNameError, setFirstNameError] = useState('s');
  const [lastNameError, setLastNameError] = useState('s');
  const [phoneError, setPhoneError] = useState('s');

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

  const _updateDetailes = async => {
    firestore()
      .collection('User')
      .doc(user)
      .update({
        firstName: firstName,
        lastName: lastName,
        mobile: phone,
      })
      .then(() => {
        setLoadingUpdate(false);
        Alert.alert('Update Profile', 'Successfully updated profile', [
          {
            text: 'Okay',
            onPress: () => {
              console.log('okay');
            },
          },
        ]);
        console.log('User updated!');
      });
  };

  function firstNameValidate() {
    const reName = /^[a-zA-Z]+$/i;
    const validName = reName.test(firstName);
    if (firstName === '') {
      setFirstNameError('Cannot be Empty');
    } else if (!validName) {
      setFirstNameError('Only letters allowed');
    } else {
      setFirstNameError('');
    }
  }

  function lastNameValidate() {
    const reName = /^[a-zA-Z]+$/i;
    const validName = reName.test(lastName);
    if (lastName === '') {
      setLastNameError('Cannot be Empty');
    } else if (!validName) {
      setLastNameError('Only letters allowed');
    } else {
      setLastNameError('');
    }
  }
  function phoneValidate() {
    const regex =
      /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i;
    const valid = regex.test(phone);
    if (phone === '') {
      setPhoneError('Cannot be Empty');
    } else if (!valid) {
      setPhoneError('Mobile number not valid');
    } else {
      setPhoneError('');
    }
  }
  return (
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
        <View style={styles.editContainer}>
          <Text style={styles.editText}>Edit the profile</Text>
          <TouchableOpacity
            onPress={() => {
              setEditable(!editable);
            }}>
            <MaterialCommunityIcons size={20} name={'lead-pencil'} />
          </TouchableOpacity>
        </View>
        <Input
          label={'First Name'}
          editable={editable}
          onChangeText={value => {
            setFirstName(value);
            firstNameValidate();
          }}
          errorMessage={
            firstNameError !== '' && firstNameError !== 's'
              ? firstNameError
              : null
          }
          value={firstName}
          onBlur={() => firstNameValidate()}
          placeholder={'First Name'}
        />
        <Input
          label={'Last Name'}
          editable={editable}
          onChangeText={value => {
            setLastName(value);
          }}
          value={lastName}
          errorMessage={
            lastNameError !== '' && lastNameError !== 's' ? lastNameError : null
          }
          onBlur={() => lastNameValidate()}
          placeholder={'Last Name'}
        />
        <Input
          label={'Mobile Number'}
          editable={editable}
          onChangeText={value => setPhone(value)}
          value={phone}
          placeholder={'Mobile Number'}
          onBlur={() => phoneValidate()}
          errorMessage={
            phoneError !== '' && phoneError !== 's' ? phoneError : null
          }
        />
        <View style={styles.btnContainer}>
          {loadingUpdate ? (
            <ActivityIndicator />
          ) : (
            <Button
              title={'Update Profile'}
              color={Colors.secondry}
              onPress={() => {
                setLoadingUpdate(true);
                _updateDetailes();
              }}
            />
          )}
        </View>
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
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
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
  inputArea: {
    borderWidth: 1,
    borderColor: Colors.secondry,
    borderRadius: 10,
    paddingLeft: 10,
  },
  editText: {textAlign: 'right', padding: 12, fontSize: 15, marginRight: '7%'},
  editContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});
