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
} from 'react-native';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ddd'}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={require('./assets/original_panda.png')}
          style={{borderWidth: 5, borderColor: '#fff'}}
        />
        <Text style={{marginTop: 5}}>
          Original transparent PNG&nbsp;
          <Text style={{fontWeight: 'bold', color: 'red'}}>57KB</Text>
        </Text>
        <View style={{height: 20}} />
        <Image
          source={require('./assets/shrunk_panda.png')}
          style={{borderWidth: 5, borderColor: '#fff'}}
        />
        <Text style={{marginTop: 5}}>
          Shrunk transparent PNG&nbsp;
          <Text style={{fontWeight: 'bold', color: 'red'}}>16KB</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default App;
