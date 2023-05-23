import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={{color: '#FFF', fontSize: 22}}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;
