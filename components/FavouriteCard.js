import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import OptionsMenu from 'react-native-options-menu';
const MoreIcon = require('../Images/more.png');
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FavouriteCard = props => {
  function showMenu() {
    Alert.alert(
      'Delete from favourite List',
      'Do you want to Delete it from favourite list',
      [
        {
          text: 'yes',
          onPress: () => {
            console.log('okey');
          },
        },
      ],
    );
    console.log('hello Menu');
  }

  function edit() {
    console.log('edit');
  }

  return (
    <TouchableOpacity style={styles.product}>
      <View style={styles.productContainer}>
        <View style={styles.imageArea}>
          <Image
            source={{
              uri: 'https://5.imimg.com/data5/KC/PC/MY-38629861/dummy-chronograph-watch-500x500.jpg',
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.contentArea}>
          <Text style={{fontSize: 20, marginBottom: 3}}>Product Name</Text>
          <Text style={{fontSize: 14, color: 'grey', marginBottom: 3}}>
            Rs.300.00
          </Text>
          <Text>created by:damish</Text>
        </View>
        <TouchableOpacity
          style={styles.contentAreaDelete}
          onPress={() => showMenu()}>
          <MaterialCommunityIcons
            name="bookmark-remove-outline"
            size={25}
            color="red"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default FavouriteCard;

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 140,
    margin: 20,
    padding: 10,
  },
  productContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  imageArea: {
    flex: 1,
    backgroundColor: 'black',
    minWidth: '20%',
  },
  contentArea: {
    flex: 6,
    maxWidth: '80%',
    padding: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentAreaDelete: {
    paddingTop: 10,
  },
});
