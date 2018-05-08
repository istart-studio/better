import React from 'react';
import {StyleSheet, FlatList, Button, Text, View, TouchableOpacity, ScrollView} from "react-native";
import DrugService from "../service/drugService";
import {ListRow, NavigationBar, Theme} from "teaset";

export class DrugListScreen extends React.Component {

    static navigationOptions = ({navigation}) => ({

        header: <NavigationBar title='drugs'
                               rightView={
                                   <View style={{flexDirection: 'row'}}>
                                       <NavigationBar.LinkButton title='ADD' onPress={() =>
                                           navigation.navigate('AddDrug', {name: 'Jane'})
                                       }/>
                                   </View>
                               }/>
    });

    constructor(props) {
        super(props);
        this.state = {todayDrugs: []}
        this._loadingTodayDrugs = this._loadingTodayDrugs.bind(this);
        DrugService.getTodayDrugs(this._loadingTodayDrugs);
    }

    componentDidMount() {

    }

    _loadingTodayDrugs = function (drugs) {
        console.log("_loadingTodayDrugs");
        this.setState({todayDrugs: drugs});
        console.log(this.state.todayDrugs);
    }

    _renderItem(rowItem) {
        console.log(rowItem);
        return (
            <ListRow title={rowItem.item.drugName}
                     detail={<View>
                         <Text>{rowItem.item.dosage}</Text>
                         <Text>{rowItem.item.drugName}</Text>
                     </View>}
                     swipeActions={[
                         <ListRow.SwipeActionButton title='Cancel'/>,
                         <ListRow.SwipeActionButton title='Remove' type='danger' onPress={() => alert('Remove')}/>,
                     ]}
                     detailStyle={{fontSize: 15, color: '#31708f'}}/>
        );
    }

    render() {

        return (
            <ScrollView style={{flex: 1, paddingTop: Theme.statusBarHeight + 45}}>

                <FlatList
                    data={this.state.todayDrugs}
                    renderItem={this._renderItem}
                />
            </ScrollView>
        );
    }
}