import React from 'react';
import {createBottomTabNavigator,} from 'react-navigation';
import {bootstrap} from "./src/config/bootstrap";
import {DrugListScreen} from "./src/screen/drugListScreen";
import AddDrugScreen from "./src/screen/addDrugScreen";
import {TakeDrugScreen} from "./src/screen/takeDrugScreen";
// import {YellowBox} from 'react-native';

// ignore some warnings
// YellowBox.ignoreWarnings(['Warning', 'Module RCTImageLoader']);

bootstrap();
// DrugService.clearDrugs();
const App = createBottomTabNavigator({
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
        fontColor: '#8a8a8a'
    },
});
export default App;
