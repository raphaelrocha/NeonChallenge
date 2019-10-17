import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Profile from "./src/modules/profile/Profile";
import Contacts from "./src/modules/contacts/Contacts";

const MainNavigator = createStackNavigator({
  Profile: {screen: Profile},
  Contacts: {screen: Contacts},
}
,{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
}
);

console.disableYellowBox = true;

const App = createAppContainer(MainNavigator);

export default App;
