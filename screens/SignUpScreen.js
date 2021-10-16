/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import Colors from '../constants/Colors';
import {AuthContext} from '../navigations/authentication';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignUpScreen = props => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [userNameError, setUserNameError] = useState('s');
  const [passwordError, setPasswordError] = useState('s');
  const [rePasswordError, setRePasswordError] = useState('s');
  const [firstNameError, setFirstNameError] = useState('s');
  const [lastNameError, setLastNameError] = useState('s');
  const [contactNoError, setContactNoError] = useState('s');

  const [loading, setLoading] = useState(false);

  const {register} = useContext(AuthContext);

  const signUp = async () => {
    try {
      await auth().createUserWithEmailAndPassword(userName, password);
      try {
        await firestore().collection('User').add({
          email: userName,
          firstName: firstName,
          lastName: lastName,
          mobile: contactNo,
          listOfFav: [],
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
      props.navigation.navigate('SignIn');
    } catch (error) {
      console.log(error);
      setLoading(false);
      let err;
      console.log(error.code);
      if (error.code == 'auth/weak-password') {
        err = 'Password should be at least 6 characters';
      } else if (error.code == 'auth/email-already-in-use') {
        err = 'The email address is already in use by another account';
      } else if (error.code == 'auth/invalid-email') {
        err = 'The email address is badly formatted';
      }
      Alert.alert('Error on Creating Account', err, [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  function userNameValidate() {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let isValid = re.test(userName);
    console.log(isValid);
    if (userName == '') {
      setUserNameError('Cannot be Empty');
    } else if (!isValid) {
      setUserNameError('Email type not Valid');
    } else {
      setUserNameError('');
    }
  }

  function passwordValidate() {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i;
    let isValidPassword = re.test(password);
    console.log(isValidPassword);
    if (password === '') {
      setPasswordError('Cannot be Empty');
    } else if (!isValidPassword) {
      setPasswordError('Password type not Valid');
    } else {
      setPasswordError('');
    }
  }

  function rePasswordValidate() {
    if (rePassword === '') {
      setRePasswordError('Cannot be Empty');
    } else if (rePassword !== password) {
      setRePasswordError('Password are not matching');
    } else {
      setRePasswordError('');
    }
  }

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
    const valid = regex.test(contactNo);
    if (contactNo === '') {
      setContactNoError('Cannot be Empty');
    } else if (!valid) {
      setContactNoError('Mobile number not valid');
    } else {
      setContactNoError('');
    }
  }

  return (
    <View style={styles.mainConatainer}>
      <View style={styles.headerSection}>
        <View style={styles.imageConatainer}>
          <Image
            source={require('../Images/logo.jpg')}
            style={styles.imageSet}
          />
        </View>
        <Text style={styles.welcomeText}>Welcome to Antiques</Text>
      </View>
      <ScrollView style={styles.footerSection}>
        <View>
          <Text style={styles.signInText}>Sign Up Page</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Email"
            value={userName}
            onChangeText={Value => setUserName(Value)}
            onBlur={() => userNameValidate()}
          />
          {userNameError === 'Cannot be Empty' ? (
            <Text style={styles.errorHandles}>*Email {userNameError}</Text>
          ) : userNameError === 'Email type not Valid' ? (
            <Text style={styles.errorHandles}>*Email {userNameError}</Text>
          ) : null}
          <TextInput
            style={styles.textArea}
            placeholder="Password"
            value={password}
            secureTextEntry={true}
            maxLength={15}
            onChangeText={Value => setPassword(Value)}
            onBlur={() => passwordValidate()}
          />
          {passwordError === 'Cannot be Empty' ? (
            <Text style={styles.errorHandles}>*password {passwordError}</Text>
          ) : passwordError === 'Password type not Valid' ? (
            <Text style={styles.errorHandles}>*password {passwordError}</Text>
          ) : null}

          <TextInput
            style={styles.textArea}
            placeholder="Re Enter Password"
            value={rePassword}
            secureTextEntry={true}
            onChangeText={Value => setRePassword(Value)}
            onBlur={() => rePasswordValidate()}
          />
          {rePasswordError === 'Cannot be Empty' ? (
            <Text style={styles.errorHandles}>*{rePasswordError}</Text>
          ) : rePasswordError === 'Password are not matching' ? (
            <Text style={styles.errorHandles}>*{rePasswordError}</Text>
          ) : null}
          <TextInput
            style={styles.textArea}
            placeholder="First Name"
            value={firstName}
            onChangeText={Value => setFirstName(Value)}
            onBlur={() => firstNameValidate()}
          />
          {firstNameError === 'Cannot be Empty' ? (
            <Text style={styles.errorHandles}>
              *First Name {firstNameError}
            </Text>
          ) : firstNameError === 'Only letters allowed' ? (
            <Text style={styles.errorHandles}>
              *First Name {firstNameError}
            </Text>
          ) : null}
          <TextInput
            style={styles.textArea}
            placeholder="Last Name"
            value={lastName}
            onChangeText={Value => setLastName(Value)}
            onBlur={() => lastNameValidate()}
          />
          {lastNameError === 'Cannot be Empty' ? (
            <Text style={styles.errorHandles}>*Last Name {lastNameError}</Text>
          ) : lastNameError === 'Only letters allowed' ? (
            <Text style={styles.errorHandles}>*Last Name {lastNameError}</Text>
          ) : null}

          <TextInput
            style={styles.textArea}
            placeholder="Contact No"
            value={contactNo}
            onChangeText={Value => setContactNo(Value)}
            onBlur={() => phoneValidate()}
          />
          {contactNoError === 'Cannot be Empty' ? (
            <Text style={styles.errorHandles}>
              *Contact number {contactNoError}
            </Text>
          ) : contactNoError === 'Mobile number not valid' ? (
            <Text style={styles.errorHandles}>
              *Contact number {contactNoError}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.bottomText}
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => {
              props.navigation.navigate('SignIn');
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text>Do you have a account?</Text>
              <Text style={styles.bottomTextArea}>Sign In</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.buttonAreaContainer}>
            <TouchableOpacity
              disabled={
                userNameError !== '' ||
                passwordError !== '' ||
                rePasswordError !== '' ||
                firstNameError !== '' ||
                lastNameError !== '' ||
                contactNoError !== ''
              }
              style={styles.buttonArea}
              onPress={() => {
                console.log(userName);
                setLoading(true);
                signUp();
                // const e = register(userName, password);
                //   console.log('Values' + e.uid)
                //   props.navigation.navigate('SignIn');
              }}>
              {loading ? (
                <ActivityIndicator color={Colors.thirdly} />
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;

const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  mainConatainer: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.primary,
  },
  headerSection: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageConatainer: {
    width: 100,
    height: 100,
  },
  signInText: {
    fontWeight: '800',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 15,
  },
  welcomeText: {
    color: Colors.thirdly,
    fontWeight: '800',
    fontSize: 22,
    marginTop: 10,
  },
  imageSet: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  footerSection: {
    flex: 1,
    marginTop: 10,
    padding: 15,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'white',
  },
  textArea: {
    margin: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 10,
    paddingLeft: 10,
  },
  buttonAreaContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 25,
  },
  buttonArea: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 16,
    width: '45%',
  },
  buttonText: {
    color: Colors.thirdly,
    fontWeight: '300',
    fontSize: 15,
  },
  bottomText: {
    marginTop: 10,
    marginBottom: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTextArea: {
    marginLeft: 10,
    color: Colors.primary,
  },
  errorHandles: {color: 'red', marginLeft: 12},
});
