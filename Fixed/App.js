import React from 'react';
import {
    StackNavigator,
} from 'react-navigation';
import {HomeScreen} from "./src/screen/homeScreen";
import AddDrugScreen from "./src/screen/addDrugScreen";

const App = StackNavigator({
    Home: {screen: HomeScreen},
    AddDrug: {screen: AddDrugScreen},
})
export default App;
