import React from 'react';
import {StyleSheet, FlatList, Text, View, TouchableOpacity, ScrollView, Image} from "react-native";
import DrugService from "../service/drugService";
import {Badge, Label, ListRow, Button, NavigationBar, Theme} from "teaset";
import {RkText, RkStyleSheet, RkCard} from "react-native-ui-kitten";

export class TakeDrugScreen extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title: "今日服用",
        tabBarIcon: ({tintColor,activeTintColor}) => (
            <Image source={require('../asserts/images/take_drug_plan.png')}
                   style={{width:16,height:16,tintColor:tintColor,activeTintColor:'#8a8a8a'}}
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
        this.setState({todayDrugs: [{drugName: '阿莫西林胶囊'}, {drugName: '阿莫西林胶囊-1'}, {drugName: '阿莫西林胶囊-2'}]});
    }

    _renderItemProps(rowItem) {
        return (<View style={{flex: 1, flexDirection: "row", justifyContent: 'space-between', alignItems: 'center',}}>
            <View style={styles.propBlock}>
                <View style={styles.propUnit}>
                    <Label style={styles.prop} type='title' size='xl' text='规格'/>
                    <Label style={styles.prop} type='title' size='xl' text='20*500mg'/>
                </View>
                <View style={styles.propUnit}>
                    <Label style={styles.prop} type='title' size='xl' text='本次用量'/>
                    <Label style={styles.prop} type='title' size='xl' text='1*500mg'/>
                </View>
            </View>
            <TouchableOpacity onPress={() => {
                alert('take drug..')
            }}>
                <Image style={{width: 32, height: 32, tintColor: '#8a6d3b'}}
                       source={require('../asserts/images/take_drug.png')}
                />
            </TouchableOpacity>
        </View>);
    }

    _renderItem(rowItem) {
        var detail = this._renderItemProps(rowItem);
        return (
            <ListRow
                style={styles.row}
                title={'阿莫西林胶囊'}
                titlePlace='top'
                icon={require('../asserts/images/morning.png')}
                detail={detail}
                swipeActions={[
                    <ListRow.SwipeActionButton title='暂不服用' type='danger'
                                               onPress={() => alert('Remove')}/>,
                ]}
            />
        );
    }

    render() {

        return (
            <ScrollView
                style={styles.container}>

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
        paddingHorizontal: 4,
        paddingVertical: 4,
    },
    propBlock: {
        flex: 1,
        flexDirection: 'column',
        marginVertical: 4,
        marginHorizontal: 4,
    },
    propUnit: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // borderBottomWidth: 0.2,//StyleSheet.hairlineWidth,
        // borderColor: theme.colors.border.base,
        // paddingVertical: 5,
        marginVertical: 4,
        marginHorizontal: 4,
    },
    prop: {
        flex: 1,
        color: '#8a6d3b',
        fontSize: 12,
    }
}));