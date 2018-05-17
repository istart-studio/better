import React from 'react';
import {
    StackNavigator,
} from 'react-navigation';
import {DrugListScreen} from "./src/screen/drugListScreen";
import AddDrugScreen from "./src/screen/addDrugScreen";
import {bootstrap} from "./src/config/bootstrap";


bootstrap();
const App = StackNavigator({
    DrugList: {screen: DrugListScreen},
    AddDrug: {screen: AddDrugScreen},
})
export default App;
