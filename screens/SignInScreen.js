import {auto} from 'async';
import React from 'react';
import {Button, Text, View, Dimensions, StyleSheet, Image} from 'react-native';
import Colors from '../constants/Colors';

const SignInScreen = props => {
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
        <Text>Sign In Page</Text>
        <Button
          title="Login"
          onPress={() => {
            props.navigation.replace('HomePageScreen');
          }}
        />
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
    paddingTop: 20,
    paddingBottom: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'white',
  },
});
