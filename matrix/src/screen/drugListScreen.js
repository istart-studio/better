import React from 'react';
import {StyleSheet, FlatList, Button, Text, View, TouchableOpacity, ScrollView, Image} from "react-native";
import DrugService from "../service/drugService";
import {Badge, Label, ListRow, NavigationBar, Theme} from "teaset";
import {RkText, RkStyleSheet, RkCard} from "react-native-ui-kitten";

export class DrugListScreen extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title: "药品管理",
        tabBarIcon: ({tintColor,activeTintColor}) => (
            <Image source={require('../asserts/images/drug_default.png')}
                   style={{width: 16, height: 16, tintColor: tintColor, activeTintColor: activeTintColor}}
            />
        ),
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
        this.setState({todayDrugs: [{}, {}, {}]});
    }

    _renderItemProps(rowItem) {
        return (<View style={styles.row}>
            <View style={styles.propUnit}>
                <Label style={styles.prop} type='title' size='xl' text='规格'/>
                <Label style={styles.prop} type='title' size='xl' text='20*500mg'/>
            </View>
            <View style={styles.propUnit}>
                <Label style={styles.prop} type='title' size='xl' text='厂商'/>
                <Label style={styles.prop} type='title' size='xl' text='阿乐'/>
            </View>
            <View style={styles.propUnit}>
                <Label style={styles.prop} type='title' size='xl' text='价格'/>
                <Label style={styles.prop} type='title' size='xl' text='20'/>
            </View>
        </View>);
    }

    _renderItem(rowItem) {
        var detail = this._renderItemProps(rowItem);
        var info = {};
        return (
            <ListRow
                title={'阿莫西林胶囊'}
                icon={require('../asserts/images/drug_default.png')}
                detail={detail}
                swipeActions={[
                    <ListRow.SwipeActionButton title='编辑' type='warn'
                                               onPress={() => alert('edit')}/>,
                    <ListRow.SwipeActionButton title='移除' type='danger'
                                               onPress={() => alert('Remove')}/>,
                ]}
                titlePlace='top'/>

        );
    }

    render() {

        return (
            <ScrollView style={styles.container}>

                <FlatList
                    data={this.state.todayDrugs}
                    renderItem={this._renderItem}
                />
            </ScrollView>
        );
    }
}

let styles = RkStyleSheet.create(theme => ({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 65,
        paddingHorizontal: 14,
    },
    row: {
        flex: 1,
        flexDirection: 'column',
        marginVertical: 4,
    },
    propUnit: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.2,//StyleSheet.hairlineWidth,
        borderColor: theme.colors.border.base,
        paddingVertical: 5,
        marginVertical: 2,
        marginHorizontal: 5,
        flexWrap: 'wrap',

    },
    prop: {
        flex: 1,
        color: '#8a6d3b',
        fontSize: 12,
        flexWrap: 'wrap'
    }
}));