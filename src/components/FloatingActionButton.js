import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const FloatingActionButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.btnIcon}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'blue',
    borderRadius: 60,
    bottom: 30,
    right: 30,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnIcon: {
    fontSize: 35,
    color: '#FFF',
  },
});

export default FloatingActionButton;
