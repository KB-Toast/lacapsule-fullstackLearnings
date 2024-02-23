import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCity, removeCity } from '../reducers/user';

export default function PlacesScreen() {

  const user = useSelector((state) => state.user.value);
  const cities = useSelector((state) => state.user.cities);
  const dispatch = useDispatch();

  const [cityInput, setCityInput] = useState();

  const placesData = [
    { name: 'Paris', latitude: 48.859, longitude: 2.347 },
    { name: 'Lyon', latitude: 45.758, longitude: 4.835 },
    { name: 'Marseille', latitude: 43.282, longitude: 5.405 },
  ];

  const handleTextChange = (v) => {
    setCityInput(v);
  }

  const handlePress = () => {
    // api stuff
    fetch(`https://api-adresse.data.gouv.fr/search/?q=${cityInput}`).then(response => response.json()).then(data => { 
    console.log(data);  
    data && dispatch(addCity({city: data}));
    });
  };

  const handleDelete = (v) => {
    dispatch(removeCity({city: v}));
  };

  /*
  const places = placesData.map((data, i) => {
    return (
      <View key={i} style={styles.card}>
        <View>
          <Text style={styles.name}>{data.name}</Text>
          <Text>LAT : {data.latitude} LON : {data.longitude}</Text>
        </View>
        <FontAwesome name='trash-o' size={25} color='#ec6e5b' />
      </View>
    );
  });
*/
///*
 const places = cities !== 'undefined' && cities.map((data, i) => {
    return (
      <View key={i} style={styles.card}>
        <View>
          <Text style={styles.name}>{data.features[0].properties.city}</Text>
          <Text>LAT : {data.features[0].properties.x} LON : {data.features[0].properties.y}</Text>
        </View>
        <FontAwesome name='trash-o' size={25} color='#ec6e5b' onPress={() => handleDelete(data.features[0].properties.city)} />
      </View>
    );
  });
  //*/

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{user} places</Text>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="New city" onChangeText={(value) => handleTextChange(value)}  />
        <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => handlePress()}>
          <Text style={styles.textButton}>Add</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        {places}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 20,
  },
  scrollView: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  input: {
    width: '65%',
    marginTop: 6,
    borderBottomColor: '#ec6e5b',
    borderBottomWidth: 1,
    fontSize: 16,
  },
  button: {
    width: '30%',
    alignItems: 'center',
    paddingTop: 8,
    backgroundColor: '#ec6e5b',
    borderRadius: 10,
  },
  textButton: {
    color: '#ffffff',
    height: 24,
    fontWeight: '600',
    fontSize: 15,
  },
});
