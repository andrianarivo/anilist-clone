import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface DataItem {
  key: string;
  text: string;
  uri: string;
}

const ListItem = (item: DataItem) => {
  return (
    <View style={styles.item}>
      <Image
        source={{
          uri: item.uri,
        }}
        style={styles.itemPhoto}
        resizeMode='cover'
      />
      <Text style={styles.itemText}>{item.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    margin: 10,
  },
  itemPhoto: {
    width: 200,
    height: 200,
  },
  itemText: {
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 5,
  },
});
export default ListItem;
