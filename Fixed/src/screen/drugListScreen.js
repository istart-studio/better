import React from 'react';
import {StyleSheet, FlatList, Button, Text, View, TouchableOpacity, ScrollView} from "react-native";
import DrugService from "../service/drugService";
import {ListRow, NavigationBar, Theme} from "teaset";

export class DrugListScreen extends React.Component {

    static navigationOptions = ({navigation}) => ({
        headerRight: (
            <Button
                title='添加药品'
                onPress={() => navigation.navigate('AddDrug', {name: 'Jane'})}
            />
        )
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
        console.log(drugs);
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
            <ScrollView style={{flex: 1}}>

                <FlatList
                    data={this.state.todayDrugs}
                    renderItem={this._renderItem}
                />
            </ScrollView>
        );
    }
}