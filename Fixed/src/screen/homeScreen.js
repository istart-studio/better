import React from 'react';
import {StyleSheet, FlatList, Button, Text, View, TouchableOpacity} from "react-native";
import DrugService from "../service/drugService";

export class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Durgs',
    };

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
    _onPressItem = (item) => {
        // if (id == null || id.trim() == "") return;
        console.log('report item : ' + item);
    };

    _renderItem(rowItem) {
        console.log(rowItem);
        return (
            <TouchableOpacity onPress={() => {
                this._onPressItem(rowItem.item);
            }}>
                <View>
                    <Text>药品名称：{rowItem.item.drugName}</Text>
                    <Text>用量：{rowItem.item.dosage}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Button
                    title="Add Drug"
                    onPress={() =>
                        navigate('AddDrug', {name: 'Jane'})
                    }
                />
                <FlatList
                    data={this.state.todayDrugs}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
})