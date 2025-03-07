import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';

const AddITem = ({data, setdata}) => {
  const [itemName, setitemName] = useState('');
  const [stockAmt, setstockAmt] = useState('');
  const [isEdit, setisEdit] = useState(false);
  const [editItemId, seteditItemId] = useState(null);
  const AddItemhandler = () => {
    const newItem = {
      id: Date.now(),
      name: itemName,
      stock: stockAmt,
    };
    setdata([...data, newItem]);
    setitemName('');
    setstockAmt('');
    setisEdit(false);
  };

  const editItemHandler = item => {
    setitemName(item.name);
    setisEdit(true);
    seteditItemId(item.id);
  };
  const deleteItemHandler = id => {
    setdata(data.filter(item => item.id !== id));
  };
  const updateItemHandler = () => {
    setdata(
      data.map(item =>
        item.id === editItemId
          ? {...item, name: itemName, stock: stockAmt}
          : item,
      ),
    );
  };
  return (
    <View style={styles.container}>
      {/* Input Feild for Items */}

      <TextInput
        placeholder="Enter an item name..."
        placeholderTextColor="#3477eb"
        style={styles.input}
        value={itemName}
        onChangeText={item => setitemName(item)}
      />
      {/* Input Feild for stock */}

      <TextInput
        placeholder="Enter quantity of item..."
        placeholderTextColor="#3477eb"
        style={styles.input}
        value={stockAmt}
        onChangeText={stock => setstockAmt(stock)}
      />
      <Pressable
        style={styles.AddItemBtn}
        onPress={() => (isEdit ? updateItemHandler() : AddItemhandler())}>
        <Text style={styles.itemBtnText}>
          {isEdit ? 'Edit Item in Stock' : 'Add Item in Stock'}
        </Text>
      </Pressable>
      {/* List of all items  */}

      <View>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>All items in the stock</Text>
        </View>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={[
                styles.itemContainer,
                {backgroundColor: item.stock < 20 ? '#a15858' : '#34ebd6'},
              ]}>
              <Text style={styles.headingText}>{item.name}</Text>
              <View style={{flexDirection: 'row', gap: 20}}>
                <Text style={styles.headingText}>{item.stock}</Text>
                <Pressable onPress={() => editItemHandler(item)}>
                  <Text>Edit</Text>
                </Pressable>
                <Pressable onPress={() => deleteItemHandler(item.id)}>
                  <Text>Delete</Text>
                </Pressable>
              </View>
            </View>
          )}
          contentContainerStyle={{gap: 10}}
        />
      </View>
    </View>
  );
};

export default AddITem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    gap: 12,
  },
  input: {
    borderWidth: 1.5,
    borderColor: 'lightblue',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 7,
  },
  AddItemBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#329ea8',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 7,
  },
  itemBtnText: {
    fontWeight: 600,
    color: 'white',
    fontSize: 15,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headingText: {
    fontWeight: '600',
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '15',
    paddingVertical: 10,
    borderRadius: 10,
  },
});
