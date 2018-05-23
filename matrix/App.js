import React from 'react';
import {
    StackNavigator, TabNavigator,
} from 'react-navigation';
import {bootstrap} from "./src/config/bootstrap";
import {DrugListScreen} from "./src/screen/drugListScreen";
import AddDrugScreen from "./src/screen/addDrugScreen";
import {TakeDrugScreen} from "./src/screen/takeDrugScreen";
import {Image, View} from "react-native";
import {RkStyleSheet} from "react-native-ui-kitten";
import DrugService from "./src/service/drugService";


bootstrap();
// DrugService.clearDrugs();
const App = TabNavigator({
    TakeDrug: {
        screen: TakeDrugScreen,
    },
    DrugList: {screen: DrugListScreen},
    AddDrug: {screen: AddDrugScreen},
}, {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
        activeTintColor: '#000000',
    },
    labelStyle: {
        fontSize: 20, // 文字大小
        fontColor:'#8a8a8a'
    },
});
export default App;
