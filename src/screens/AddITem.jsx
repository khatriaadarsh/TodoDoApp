import {
  Alert,
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
  const [errors, setErrors] = useState({itemName: '', stockAmt: ''});
  const stringRegex = /^[a-zA-Z\']+$/; // Letters, spaces, hyphens, apostrophes
  const numberRegex = /^[0-9]+$/; //  Positive integers (including 0)

  const validateInput = () => {
    let isValid = true;
    const newError = {itemName: '', stockAmt: ''};
    if (!itemName.trim) {
      newError.itemName = Alert.alert('Item name is required');
    } else if (!stringRegex.test(itemName.trim())) {
      newError.itemName = Alert.alert('The item contains only letters');
      isValid = false;
    }

    if (!stockAmt.trim()) {
      newError.stockAmt = Alert.alert('stock quantity is requried');
      isValid = false;
    } else if (!numberRegex.test(stockAmt.trim())) {
      newError.stockAmt = Alert.alert('Stock must be a positive whole number');
      isValid = false;
    } else if (parseInt(stockAmt) < 0) {
      newError.stockAmt = Alert.alert('Stock cannot be negative!');
      isValid = false;
    }

    setErrors(newError);
    return isValid;
  };
  const AddItemhandler = () => {
    if (!validateInput()) return;
    const newItem = {
      id: Date.now(),
      name: itemName,
      stock: stockAmt ? parseInt(stockAmt) : 0,
    };
    setdata([...data, newItem]);
    setitemName('');
    setstockAmt('');
    // setisEdit(false);
    setErrors({itemName: '', stockAmt: ''});
  };

  const editItemHandler = item => {
    setitemName(item.name);
    setstockAmt(item.stock.toString());
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
          ? {...item, name: itemName, stock: stockAmt ? parseInt(stockAmt) : 0}
          : item,
      ),
    );
    setitemName('');
    setstockAmt('');
    setisEdit(false);
    seteditItemId(null);
    setErrors({itemName: '', stockAmt: ''});
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
        onChangeText={item => setstockAmt(item)}
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
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
