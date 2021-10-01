import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import Colors from '../constants/Colors';

const SignInScreen = props => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
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
              console.log(userName);
              props.navigation.replace('HomePageScreen');
            }}>
            <Text style={styles.buttonText}>Sign In</Text>
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
