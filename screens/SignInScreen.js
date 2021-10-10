import React, {useState, useContext} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Colors from '../constants/Colors';
import {AuthContext} from '../navigations/authentication';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = props => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const {login} = useContext(AuthContext);

  const _storeData = async c => {
    try {
      console.log(c);
      await AsyncStorage.setItem('userName', c);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);

      // Error saving data
    }
  };

  const signIn = async () => {
    try {
      const c = await auth().signInWithEmailAndPassword(userName, password);
      const cd = JSON.stringify(c);
      console.log('return value:' + cd);
      await _storeData(cd);
      //   login(userName, password);
      props.navigation.replace('HomePageScreen');
    } catch (error) {
      setLoading(false);
      console.log(error);
      let err = 'sss';
      console.log(error.code);
      if (error.code === 'auth/weak-password') {
        err = 'Password should be at least 6 characters';
      } else if (error.code === 'auth/email-already-in-use') {
        err = 'The email address is already in use by another account';
      } else if (error.code === 'auth/invalid-email') {
        err = 'The email address is badly formatted';
      } else if (error.code === 'auth/user-not-found') {
        err =
          'There is no user record corresponding to this identifier. The user may have been deleted';
      } else if (error.code === 'auth/wrong-password') {
        err = 'User name or password is invalid';
      }
      Alert.alert('Error on Login Account', err, [
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
        <Text style={styles.signInText}>Sign In Page</Text>

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

        <View style={styles.buttonAreaContainer}>
          <TouchableOpacity
            style={styles.buttonArea}
            onPress={() => {
              setLoading(true);
              signIn();
              console.log(userName);
            }}>
            {loading ? (
              <ActivityIndicator color={Colors.thirdly} />
            ) : (
              <Text style={styles.buttonText}>Sign in</Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.bottomText}
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() => {
            props.navigation.navigate('SignUp');
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

export default SignInScreen;

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
