import React from 'react';
import {
    StackNavigator,
} from 'react-navigation';
import {bootstrap} from "./src/config/bootstrap";
import {DrugListScreen} from "./src/screen/drugListScreen";
import AddDrugScreen from "./src/screen/addDrugScreen";
import {TakeDrugScreen} from "./src/screen/takeDrugScreen";


bootstrap();
const App = StackNavigator({
    TakeDrug: {screen: TakeDrugScreen},
    AddDrug: {screen: AddDrugScreen},
    DrugList: {screen: DrugListScreen},
})
export default App;
