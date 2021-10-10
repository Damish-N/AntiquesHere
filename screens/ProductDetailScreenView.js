import React from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonIconPapper from "../components/Button";

const ProductDetailsView = ({route}) => {
  const {product,productId} = route.params;
  return (
    <ScrollView>
      <Image source={{uri: product.imageUrl}} style={styles.image} />
      <View>
        <View style={styles.btn}>
          <Button
            color={Colors.primary}
            title="Add to favourite"
            onPress={() => {
              console.log('Added tp the Cart');
            }}
            style={styles.btn}
          />
        </View>
        <Text style={styles.price}>Rs:{product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.description}>{productId}</Text>
      </View>
      <View>
        {/*<TouchableOpacity>*/}
        {/*  <ButtonIconPapper iconName={'call'} detail={product.contactNo.toString()}/>*/}
        {/*</TouchableOpacity>*/}
      </View>
    </ScrollView>
  );
};

export default ProductDetailsView;

ProductDetailsView.navigationOptions = data => {
  var d = data.navigation.getParms('productId');
};

const styles = StyleSheet.create({
  image: {width: '100%', height: 300},
  price: {
    textAlign: 'center',
    fontSize: 21,
    color: 'black',
    marginVertical: 10,
  },
  description: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 15,
    color: '#888',
  },
  btn: {
    marginVertical: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
});
