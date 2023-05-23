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

const UpdateTodoModal = ({isVisible, onUpdatePress, onClosePress}) => {
  const [todoText, setTodoText] = useState('');

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onClosePress}
          style={{
            marginBottom: 10,
            marginTop: 10,
            width: '100%',
            alignItems: 'flex-end',
            marginRight: 25,
          }}>
          <Icon name="close" style={{fontSize: 31, color: '#000000'}} />
        </TouchableOpacity>
        <Text style={styles.heading}>Update Todo</Text>

        <TextInput
          onChangeText={text => setTodoText(text)}
          placeholder="Enter todo content"
          style={styles.txtInput}
        />

        <TouchableOpacity
          onPress={() => onUpdatePress(todoText)}
          style={styles.submitBtn}>
          <Text style={{color: '#FFF', fontSize: 18}}>Submit</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    height: 320,
    alignItems: 'center',
    borderRadius: 20,
  },
  heading: {
    fontSize: 25,
    color: '#000000',
    marginTop: 20,
    marginBottom: 25,
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
export default UpdateTodoModal;
