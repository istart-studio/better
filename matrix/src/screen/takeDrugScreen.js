import React from 'react';
import {FlatList, Image, ScrollView, TouchableOpacity, View} from "react-native";
import {Label, ListRow} from "teaset";
import {RkStyleSheet} from "react-native-ui-kitten";
import TakeDrugService from "../service/takeDrugService";

export class TakeDrugScreen extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title: "今日服用",
        tabBarIcon: ({tintColor, activeTintColor}) => (
            <Image source={require('../asserts/images/take_drug_plan.png')}
                   style={{width: 16, height: 16, tintColor: tintColor}}
            />
        ),
    });

    constructor(props) {
        super(props);
        this.state = {todayDrugs: []};
        this._loadingTodayDrugs = this._loadingTodayDrugs.bind(this);
        this._renderItem = this._renderItem.bind(this);
    }

    componentWillMount() {
        this._loadingTodayDrugs();
    }

    _loadingTodayDrugs = function () {
        TakeDrugService.getTodayDrugs().then(takeDrugs => {
            console.log(takeDrugs);
            this.setState({todayDrugs: takeDrugs});
        });

    };

    _renderItemProps(takeDrug) {
        const specification = `${takeDrug.amount}*${takeDrug.quantity}`;
        const taking = `${takeDrug.takeAmount}*${takeDrug.takeQuantity}`;
        return (<View style={{flex: 1, flexDirection: "row", justifyContent: 'space-between', alignItems: 'center',}}>
            <View style={styles.propBlock}>
                <View style={styles.propUnit}>
                    <Label style={styles.prop} type='title' size='xl' text='规格'/>
                    <Label style={styles.prop} type='title' size='xl' text={specification}/>
                </View>
                <View style={styles.propUnit}>
                    <Label style={styles.prop} type='title' size='xl' text='本次用量'/>
                    <Label style={styles.prop} type='title' size='xl' text={taking}/>
                </View>
            </View>
            <TouchableOpacity onPress={() => {
                alert('take drug..')
            }}>
                <Image style={{width: 32, height: 32, tintColor: '#58AF0C'}}
                       source={require('../asserts/images/take_drug.png')}
                />
            </TouchableOpacity>
        </View>);
    }

    _renderItem(rowItem) {
        const takeDrug = rowItem.item;
        const detail = this._renderItemProps(takeDrug);
        let iconSrc = "";
        if (takeDrug.planTime < 12) {
            iconSrc = require("../asserts/images/morning.png");
        } else if (takeDrug.planTime > 12 && takeDrug.planTime < 19) {
            iconSrc = require("../asserts/images/noon.png");
        } else {
            iconSrc = require("../asserts/images/night.png");
        }
        return (
            <ListRow
                style={styles.row}
                title={takeDrug.drugName}
                titlePlace='top'
                icon={iconSrc}
                detail={detail}
                swipeActions={[
                    <ListRow.SwipeActionButton title='今日不服用' type='danger'
                                               onPress={() => alert('Remove')}/>,
                ]}
            />
        );
    }

    _extraUniqueKey(item, index) {
        return "index" + index + item;
    }

    render() {

        return (
            <ScrollView
                style={styles.container}>

                <FlatList
                    data={this.state.todayDrugs}
                    keyExtractor={this._extraUniqueKey}
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