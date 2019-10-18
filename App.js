import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Profile from "./src/modules/profile/Profile";
import Contacts from "./src/modules/contacts/Contacts";

console.disableYellowBox = true;

const MainNavigator = createStackNavigator({
  Profile: {screen: Profile},
  Contacts: {screen: Contacts},
},{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
});

const App = createAppContainer(MainNavigator);

export default App;
