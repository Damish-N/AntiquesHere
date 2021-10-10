import React from 'react';
import {
  StyleSheet,
  Text,
  Button,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import Colors from '../constants/Colors';

const ProductItem = props => {
  return (
    <TouchableOpacity onPress={props.onViewDetail}>
      <View style={styles.product}>
        <Image source={{uri: props.image}} style={styles.image} />

        <View style={styles.detail}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.price}>Rs.{props.price}</Text>
        </View>

        <View style={styles.action}>
          <Button
            title="View Details"
            onPress={props.onViewDetail}
            color={Colors.primary}
          />
          {/*<Button*/}
          {/*  title="Add to favourite"*/}
          {/*  onPress={props.onAddToCart}*/}
          {/*  color={'green'}*/}
          {/*/>*/}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 280,
    margin: 20,
    padding: 10,
  },
  image: {
    width: '100%',
    height: '60%',
  },
  detail: {
    alignItems: 'center',
    height: '15%',
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    marginVertical: 4,
    color: '#888',
  },
  action: {
    height: '24%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
