import {FlatList, StyleSheet, Text, View} from 'react-native';

const AllItems = ({data, setdata}) => {
  return (
    <View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Items</Text>
        <Text style={styles.headingText}>Quantity</Text>
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
            <Text style={styles.headingText}>{item.stock}</Text>
          </View>
        )}
        contentContainerStyle={{gap: 10}}
      />
    </View>
  );
};

export default AllItems;

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headingText: {
    fontWeight: '500',
    fontSize: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '15',
    paddingVertical: 10,
    borderRadius: 10,
  },
});
