import React from 'react';
import {FlatList, Image, ScrollView, Text, View} from "react-native";
import DrugService from "../service/drugService";
import {Label, ListRow, Toast} from "teaset";
import {RkStyleSheet} from "react-native-ui-kitten";

export class DrugListScreen extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title: "药品管理",
        tabBarIcon: ({tintColor, activeTintColor}) => (
            <Image source={require('../asserts/images/drug_default.png')}
                   style={{width: 16, height: 16, tintColor: tintColor}}
            />
        ),
    });

    constructor(props) {
        super(props);
        this.state = {drugs: []};
        this._initDrugs = this._initDrugs.bind(this);
        DrugService.getDrugs = DrugService.getDrugs.bind(this);
        this._editDrug = this._editDrug.bind(this);
        this._deleteDrug = this._deleteDrug.bind(this);
        DrugService.deleteDrug = DrugService.deleteDrug.bind(this);
        this._renderItem = this._renderItem.bind(this);
    }

    componentWillMount() {
        this._initDrugs();
    }

    componentWillReceiveProps(props) {
        console.log('componentWillReceiveProps');
        this._initDrugs();
    }

    _initDrugs = function () {
        DrugService.getDrugs().then(drugs => {
            this.setState({drugs: drugs});
        });
    };

    _editDrug = function (drug) {
        const navigation = this.props.navigation;
        navigation.navigate('AddDrug', {drugInfo: drug});
    };
    _deleteDrug = function (drug) {
        DrugService.deleteDrug(drug).then(result => {
            Toast.success("删除成功");
            this._initDrugs();
        });

    };

    _renderItemProps(drug) {
        let specification = drug.amount + "*" + drug.quantity;
        return (<View style={styles.row}>
            <View style={styles.propUnit}>
                <Label style={styles.prop} type='title' size='xl' text='规格'/>
                <Label style={styles.prop} type='title' size='xl' text={specification}/>
            </View>
            <View style={styles.propUnit}>
                <Label style={styles.prop} type='title' size='xl' text='厂商'/>
                <Label style={styles.prop} type='title' size='xl' text={drug.vendor}/>
            </View>
            <View style={styles.propUnit}>
                <Label style={styles.prop} type='title' size='xl' text='价格'/>
                <Label style={styles.prop} type='title' size='xl' text={drug.price}/>
            </View>
        </View>);
    }

    _renderItem(rowItem) {
        let drug = rowItem.item;
        const detail = this._renderItemProps(drug);
        return (
            <ListRow
                title={drug.drugName}
                icon={require('../asserts/images/drug_default.png')}
                detail={detail}
                swipeActions={[
                    <ListRow.SwipeActionButton title='编辑' type='default'
                                               onPress={() => this._editDrug(drug)}/>,
                    <ListRow.SwipeActionButton title='移除' type='danger'
                                               onPress={() => this._deleteDrug(drug)}/>,
                ]}
                titlePlace='top'/>
        );
    }

    _extraUniqueKey(item, index) {
        return "index" + index + item;
    }

    render() {
        if (this.state.drugs && this.state.drugs.length > 0) {
            return (
                <ScrollView style={styles.container}>
                    <FlatList
                        keyExtractor={this._extraUniqueKey}
                        data={this.state.drugs}
                        renderItem={this._renderItem}
                    />
                </ScrollView>
            );
        } else {
            return (<View style={styles.blank_container}>
                <Text style={styles.blank_content}>暂无管理药品</Text>
            </View>);
        }
    }
}

let styles = RkStyleSheet.create(theme => ({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 65,
        paddingHorizontal: 14,
    },
    blank_container: {
        backgroundColor: 'white',
        paddingTop: 65,
        paddingHorizontal: 14,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    blank_content: {
        color: '#c7c7c7'
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