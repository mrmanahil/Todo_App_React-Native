import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';

const ConfirmDeleteModal = ({isVisible, onConfirmPress, onClosePress}) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.container}>
        <Text style={styles.heading}>
          Are you sure you want to delete this todo?
        </Text>

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity onPress={onConfirmPress} style={styles.submitBtn}>
            <Text style={{color: '#FFF', fontSize: 18}}>Yes</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClosePress} style={styles.submitBtn}>
            <Text style={{color: '#FFF', fontSize: 18}}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  heading: {
    fontSize: 22,
    color: '#000000',
    marginBottom: 25,
    paddingLeft: 30,
    paddingRight: 30,
    textAlign: 'center',
  },
  txtInput: {
    borderWidth: 1,
    width: '80%',
    padding: 10,
    marginBottom: 25,
    color: '#000000',
  },
  submitBtn: {
    backgroundColor: 'blue',
    width: 120,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
});
export default ConfirmDeleteModal;
