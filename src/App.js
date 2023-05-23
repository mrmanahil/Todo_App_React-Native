import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Header from './components/Header';
import FloatingActionButton from './components/FloatingActionButton';
import AddTodoModal from './components/AddTodoModal';
import ConfirmDeleteModal from './components/ConfirmDeleteModal';
import UpdateTodoModal from './components/UpdateTodoModal';
import {getCall, postCall, deleteCall, putCall} from './services/apiService';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const App = () => {
  const [todoData, setTodoData] = useState([]);
  const [isAddTodoModalVisible, setIsAddTodoModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemToUpdate, setSelectedItemToUpdate] = useState(null);

  const renderTodoList = ({item}) => {
    return (
      <View style={styles.todoItemBox}>
        <View style={{width: '80%'}}>
          <Text style={styles.todoText}>{item?.content}</Text>
        </View>

        <View
          style={{
            width: '20%',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => handleUpdateTodo(item)}
            style={{
              backgroundColor: '#000000',
              width: 30,
              height: 30,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              name="square-edit-outline"
              style={{color: '#FFF', fontSize: 22}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDeleteTodo(item)}
            style={{
              backgroundColor: 'red',
              width: 30,
              height: 30,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="delete" style={{color: '#FFF', fontSize: 22}} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleAddTodo = () => {
    console.log('add todo pressed..');

    setIsAddTodoModalVisible(!isAddTodoModalVisible);
  };

  const handleDeleteTodo = item => {
    console.log('item to delete ==>> ', item);
    setSelectedItem(item);
    setIsConfirmModalVisible(!isConfirmModalVisible);
  };

  const handleUpdateTodo = item => {
    console.log('item to update ==>> ', item);
    setSelectedItemToUpdate(item);
    setIsUpdateModalVisible(!isUpdateModalVisible);
  };

  const handleSubmit = async data => {
    console.log('todo text to send ==>>> ', data);

    const dataObj = {
      content: data,
    };

    await postCall('/todos/addTodo', dataObj)
      .then(res => {
        console.log('response data addTodo ==>>> ', res.data);
        setIsAddTodoModalVisible(!isAddTodoModalVisible);
        setTodoData([...todoData, res.data.data]);
      })
      .catch(error => {
        console.log('error: ', error);
      });
  };

  const triggerDelete = async () => {
    console.log('item to delete is ====>>>> ', selectedItem);

    if (!selectedItem) {
      console.log('no item selected!');
    } else {
      await deleteCall(`/todos/delete/${selectedItem?._id}`)
        .then(res => {
          console.log('response data delete Todo ==>>> ', res.data);
          setIsConfirmModalVisible(!isConfirmModalVisible);
          const filteredData = todoData?.filter(
            item => item?._id !== res.data._id,
          );
          console.log(filteredData, 'filteredData');
          setTodoData(
            todoData?.filter(item => item?._id != res?.data?.data?._id),
          );
          // const tempObj = res.data;
          console.log(todoData);
          // const newData = todoData.filter(i => i?._id != tempObj?._id);

          // console.log('newData ===>> ', newData);

          // setTodoData(newData);
        })
        .catch(error => {
          console.log('error: ', error);
        });
    }
  };

  const triggerUpdate = async data => {
    console.log('item to update is ====>>>> ', selectedItemToUpdate);

    const dataObj = {
      content: data,
    };

    if (!selectedItemToUpdate) {
      console.log('no item selected!');
    } else {
      await putCall(`/todos/update/${selectedItemToUpdate?._id}`, dataObj)
        .then(res => {
          console.log('response data update Todo ==>>> ', res.data);
          setIsUpdateModalVisible(!isUpdateModalVisible);
        })
        .catch(error => {
          console.log('error: ', error);
        });
    }
  };

  const getTodos = async () => {
    await getCall('/todos/getAll')
      .then(res => {
        console.log('response get todo ===>> ', res?.data?.data);
        setTodoData(res?.data?.data);
      })
      .catch(error => {
        console.log('error: ', error);
      });
  };

  const handleRefresh = () => {
    console.log('pull to refresh...');
    getTodos();
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <View style={styles.container}>
      <Header title={'Todo App'} />

      <View style={{marginTop: 10}}>
        <FlatList
          data={todoData}
          renderItem={renderTodoList}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor="#fff"
            />
          }
        />
      </View>
      <FloatingActionButton onPress={() => handleAddTodo()} />

      <AddTodoModal
        isVisible={isAddTodoModalVisible}
        onClosePress={() => setIsAddTodoModalVisible(!isAddTodoModalVisible)}
        onAddPress={data => handleSubmit(data)}
      />

      <ConfirmDeleteModal
        isVisible={isConfirmModalVisible}
        onClosePress={() => setIsConfirmModalVisible(!isConfirmModalVisible)}
        onConfirmPress={() => triggerDelete()}
      />

      <UpdateTodoModal
        isVisible={isUpdateModalVisible}
        onClosePress={() => setIsUpdateModalVisible(!isUpdateModalVisible)}
        onUpdatePress={data => triggerUpdate(data)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  todoItemBox: {
    backgroundColor: 'blue',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  todoText: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default App;
