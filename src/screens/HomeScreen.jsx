import {Pressable, StyleSheet, Text, View} from 'react-native';
import AllItems from './AllItems';
import AddITem from './AddITem';
import {useState} from 'react';

const data = [
  {id: 1, name: 'Wheat', stock: 5, unit: 'Kg'},
  {id: 2, name: 'Rice', stock: 15, unit: 'Kg'},
  {id: 3, name: 'Basmati Rice', stock: 25, unit: 'Kg'},
  {id: 4, name: 'Pulse', stock: 50, unit: 'Kg'},
  {id: 5, name: 'Corn', stock: 29, unit: 'Kg'},
];

const HomeScreen = () => {
  const [view, setView] = useState(0);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.buttonsContainer}>
        <Pressable
          style={[
            styles.button,
            view === 0 ? {backgroundColor: '#3477eb'} : null,
          ]}
          onPress={() => setView(0)}>
          <Text style={[styles.btnText, view === 0 ? {color: 'white'} : null]}>
            All Items
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            view === 1 ? {backgroundColor: '#3477eb'} : null,
          ]}
          onPress={() => setView(1)}>
          <Text style={[styles.btnText, view === 1 ? {color: 'white'} : null]}>
            Low Quantity
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            view === 2 ? {backgroundColor: '#3477eb'} : null,
          ]}
          onPress={() => setView(2)}>
          <Text style={[styles.btnText, view === 2 ? {color: 'white'} : null]}>
            Create
          </Text>
        </Pressable>
      </View>
      {view === 0 && <AllItems data={data} />}
      {view === 1 && <AllItems data={data.filter(item => item.stock < 20)} />}
      {view === 2 && <AddITem />}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: '5%',
    backgroundColor: '#ffffff',
    gap: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 10,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'blue',
  },
  btnText: {
    color: 'blue',
    fontSize: 13,
  },
});
