import React from 'react';

import {Button} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const ButtonIconPapper = props => {
  return (
    <Button icon={props.iconName} style={styles.containerButton}>
      {props.detail}{' '}
    </Button>
  );
};

export default ButtonIconPapper;
const styles = StyleSheet.create({
  containerButton: {
    backgroundColor: 'red',
  },
});
