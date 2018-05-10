import React from 'react';
import {
    StackNavigator,
} from 'react-navigation';
import {DrugListScreen} from "./src/screen/drugListScreen";
import AddDrugScreen from "./src/screen/addDrugScreen";
// import {Theme} from 'teaset';

// Theme.set({fitIPhoneX: true});
const App = StackNavigator({
    AddDrug: {screen: AddDrugScreen},
    DrugList: {screen: DrugListScreen},
})
export default App;
