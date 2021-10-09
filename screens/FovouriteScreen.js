import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import FavouriteCard from '../components/FavouriteCard';
import firestore from '@react-native-firebase/firestore';

const FavouriteScreen = props => {
  const [favList, setFavlist] = useState([]);


  useEffect(() => {});

  return (
    <ScrollView style={styles.container}>
      <FavouriteCard />
      <FavouriteCard />
      <FavouriteCard />
      <FavouriteCard />
      <FavouriteCard />
      <FavouriteCard />
      <FavouriteCard />
      <FavouriteCard />
      <FavouriteCard />
    </ScrollView>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
