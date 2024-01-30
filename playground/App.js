/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#eee' }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.intro}>Metro Asset plugin for compressing images in React Native.</Text>
        <Image
          source={require('./assets/boat.png')}
          style={styles.boatImage}
        />
        <Text style={styles.boatText}>
          ORIGINAL PNG&nbsp;
          <Text style={{ color: 'red' }}>1.1 MB</Text>
        </Text>
        {/* <Text style={styles.boatText}>
          TINIFY PNG&nbsp;
          <Text style={{ color: 'red' }}>302 KB</Text>
        </Text> */}
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.antText}>Okay, the first thing we should do...is give a <Text style={{ fontWeight: 'bold', color: '#faad14' }}>Star</Text>.</Text>
        <View style={{ height: 10 }}></View>
        <Image
          source={require('./assets/ant_man.png')}
          resizeMode='contain'
          style={styles.antImage}
        ></Image>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  intro: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 16,
    color: '#000',
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  boatImage: {
    borderWidth: 5,
    borderColor: '#fff',
    width: windowWidth - 10,
    height: 260,
    marginBottom: 5,
  },
  boatText: {
    color: '#000',
    fontWeight: 'bold',
  },
  antText: {
    color: '#666',
    width: 220,
    borderColor: '#fff',
    borderWidth: 5,
    borderRadius: 5,
    backgroundColor: '#fff'
  },
  antImage: {
    height: 160,
    width: 100
  },
})

export default App;
