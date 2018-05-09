import React from 'react';
import {StyleSheet, FlatList, Button, Text, View, TouchableOpacity, ScrollView} from "react-native";
import DrugService from "../service/drugService";
import {Badge, Label, ListRow, NavigationBar, Theme} from "teaset";

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
        this._renderItem = this._renderItem.bind(this);
        DrugService.getTodayDrugs().then(drugs => {
            this._loadingTodayDrugs(drugs);
        });
    }

    componentDidMount() {

    }

    _loadingTodayDrugs = function (drugs) {
        console.log("_loadingTodayDrugs");
        console.log(drugs);
        this.setState({todayDrugs: drugs});
    }

    _renderItemProps(rowItem) {
        return (<View style={{flex: 1, flexDirection: 'row'}}>
            <Badge type='square' style={{flex: 1,backgroundColor: 'blue'}} count='早'/>
            <Badge style={{flex: 1,backgroundColor: '#777', paddingLeft: 0, paddingRight: 0}}>
                <Text style={{color: '#fff'}}>{rowItem.item.dosage}10</Text>
            </Badge>
        </View>);
    }

    _renderItem(rowItem) {
        var detail = this._renderItemProps(rowItem);
        return (
            <ListRow title={<Label style={{fontSize: 18, color: '#31708f'}} text={rowItem.item.drugName}/>}
                     detail={detail}
                     swipeActions={[
                         <ListRow.SwipeActionButton title='编辑'/>,
                         <ListRow.SwipeActionButton title='移除' type='danger'
                                                    onPress={() => alert('Remove')}/>,
                     ]}
                     detailStyle={{fontSize: 15, color: '#31708f'}}
                     titlePlace='top'/>
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