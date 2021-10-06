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
  Alert,
} from 'react-native';
import Colors from '../constants/Colors';
import {AuthContext} from '../navigations/authentication';
import auth from '@react-native-firebase/auth';

const SignUpScreen = props => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const {register} = useContext(AuthContext);

  const signUp = async () => {
    try {
      await auth().createUserWithEmailAndPassword(userName, password);
      props.navigation.navigate('SignIn');
    } catch (error) {
      console.log(error);
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
      <View style={styles.footerSection}>
        <Text style={styles.signInText}>Sign Up Page</Text>

        <TextInput
          style={styles.textArea}
          placeholder="User Name"
          value={userName}
          onChangeText={Value => setUserName(Value)}
        />
        <TextInput
          style={styles.textArea}
          placeholder="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={Value => setPassword(Value)}
        />

        <TextInput
          style={styles.textArea}
          placeholder="Re Enter Password"
          value={password}
          secureTextEntry={true}
          onChangeText={Value => setPassword(Value)}
        />

        <View style={styles.buttonAreaContainer}>
          <TouchableOpacity
            style={styles.buttonArea}
            onPress={() => {
              console.log(userName);
              signUp();
              // const e = register(userName, password);
              //   console.log('Values' + e.uid)
              //   props.navigation.navigate('SignIn');
            }}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

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
      </View>
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
    marginTop: 20,
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
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTextArea: {
    marginLeft: 10,
    color: Colors.primary,
  },
});
