import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Profile from "./src/modules/profile/Profile";
import Contacts from "./src/modules/contacts/Contacts";

const MainNavigator = createStackNavigator({
  Home: {screen: Profile},
  Profile: {screen: Contacts},
});

const App = createAppContainer(MainNavigator);

export default App;
