import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import DrugInfoModel from "../model/drugInfoModel";
import DrugService from "../service/drugService"
import {Button, Input, Label, ListRow, Toast} from "teaset";
import {RkCard, RkStyleSheet} from "react-native-ui-kitten";
import {RkSwitch} from '../component';

/**
 *
 */
export default class AddDrugScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: '添加新药',
        // headerRight: (
        //     <Button
        //         title='完成'
        //         onPress={() =>
        //             navigation.state.params.navigatePress()}
        //     />
        // ),
        tabBarIcon: ({tintColor}) => (
            <Image source={require('../asserts/images/new_drug.png')}
                   style={{width: 16, height: 16, tintColor: tintColor}}
            />
        ),
    });

    constructor(props) {
        super(props);
        this.state = {};
        this._initObject = this._initObject.bind(this);
        this._onSaveDrug = this._onSaveDrug.bind(this);
        this._changePlan = this._changePlan.bind(this);
        this.props.navigation.setParams({navigatePress: this._onSaveDrug})

    }

    componentWillMount() {
        let drug = this.props.navigation.getParam('drugInfo');
        this._initObject(drug);
    }

    componentWillReceiveProps(props) {
        console.log('componentWillReceiveProps');
        let drug = props.navigation.getParam('drugInfo');
        this.setState(drug);
        // this._initObject(drug);
    }

    _initObject(rawObject) {
        let drugInfo = rawObject;
        if (!drugInfo) {
            drugInfo = DrugInfoModel.newModel();
            drugInfo.plan.push(DrugInfoModel.newPlan("09", 1, drugInfo.quantity));
            drugInfo.plan.push(DrugInfoModel.newPlan("13", 1, drugInfo.quantity));
            drugInfo.plan.push(DrugInfoModel.newPlan("19", 1, drugInfo.quantity));
        }
        this.setState(drugInfo);
    }


    _onSaveDrug = () => {
        let drugInfo = this.state;
        if (drugInfo.drugName === "") {
            Toast.fail('药品名必须填写');
            return;
        }
        DrugService.newDrugs(drugInfo).then(isNewDrug => {
            if (isNewDrug) {
                Toast.success('保存成功');
                this.props.navigation.goBack();
            } else {
                Toast.fail('已添加过同名药品');
            }
        })
    };

    _changePlan(element) {
        this.state.plan.forEach(item => {
            if (item.time === element.time) {
                item.amount = element.amount;
                item.quantity = element.quantity;
                item.enable = element.enable;
            }
        });
        this.setState({plan: this.state.plan});
    }

    _renderPlanItem(element) {
        let iconSrc = "";
        if (element.time < 12) {
            iconSrc = require("../asserts/images/morning.png");
        } else if (element.time > 12 && element.time < 19) {
            iconSrc = require("../asserts/images/noon.png");
        } else {
            iconSrc = require("../asserts/images/night.png");
        }
        return (<ListRow
            key={element.time}
            icon={iconSrc}
            detail={
                <View style={styles.row}>
                    <Input
                        style={{flex: 1}}
                        size='sm'
                        onChangeText={(text) => {
                            element.amount = text;
                            element.enable = parseFloat(element.amount) > 0;
                            this._changePlan(element);
                        }}
                        keyboardType='numeric'
                        value={String(element.amount)}
                        placeholder={"每日用量"}
                    />
                    <Label
                        style={{paddingLeft: 1, paddingRight: 2}}
                        size="sm"
                        text='*'/>
                    <Input
                        style={{flex: 1}}
                        size='sm'
                        onChangeText={(text) => {
                            element.quantity = text;
                            this._changePlan(element);
                        }}
                        value={this.state.quantity}
                        placeholder={"0.5mg"}
                        disabled={true}
                    />
                    <Label
                        style={{flex: 1, paddingLeft: 2, paddingRight: 2}}
                        size="sm"
                        text=''/>
                    <RkSwitch style={styles.switch}
                              value={element.enable}
                              name="Push"
                              onValueChange={enable => {
                                  element.enable = enable;
                                  this._changePlan(element)
                              }}/>
                </View>
            }/>);
    }

    _renderPlan() {
        const planViews = [];
        for (let i = 0; i < this.state.plan.length; i++) {
            planViews.push(this._renderPlanItem(this.state.plan[i]));
        }
        return planViews;
    }

    render() {
        const _renderPlan = this._renderPlan();
        return (
            <ScrollView style={styles.container}>
                <RkCard style={styles.card}>
                    <View rkCardHeader style={{justifyContent: "flex-start"}}>
                        <Image style={{width: 16, height: 16, marginRight: 5}}
                               source={require('../asserts/images/drug_info.png')}
                        />
                        <Text style={{fontSize: 16}}>药品信息</Text>
                    </View>
                    <View rkCardContent>
                        <ScrollView style={{flex: 1}}>
                            <ListRow detail={
                                <View style={styles.row}>
                                    <Input
                                        style={{flex: 5}}
                                        size='sm'
                                        onChangeText={(text) => this.setState({drugName: text})}
                                        value={String(this.state.drugName)}
                                        placeholder={"药品名称"}
                                    />
                                    <Label
                                        style={{flex: 1, paddingLeft: 2, paddingRight: 2}}
                                        size="sm"/>
                                    <Input
                                        style={{flex: 2, width: 10}}
                                        size='sm'
                                        onChangeText={(text) => this.setState({amount: text})}
                                        value={String(this.state.amount)}
                                        placeholder={"20"}
                                    />
                                    <Label
                                        style={{paddingLeft: 2, paddingRight: 2}}
                                        size="sm"
                                        text='*'/>
                                    <Input
                                        style={{flex: 2}}
                                        size='sm'
                                        onChangeText={(text) => this.setState({quantity: text})}
                                        value={String(this.state.quantity)}
                                        placeholder={"0.5mg"}
                                    />
                                </View>}/>
                            <ListRow detail={
                                <View style={styles.row}>
                                    <Input
                                        style={{flex: 4}}
                                        size='sm'
                                        onChangeText={(text) => this.setState({vendor: text})}
                                        value={String(this.state.vendor)}
                                        placeholder={"药品厂商"}
                                    />
                                    <Label
                                        style={{flex: 1, paddingLeft: 2, paddingRight: 2}}
                                        size="sm"
                                        text=''/>
                                    <Input
                                        style={{flex: 3}}
                                        size='sm'
                                        onChangeText={(text) => this.setState({price: text})}
                                        value={String(this.state.price)}
                                        placeholder={"购买价格"}
                                    />
                                </View>}/>
                        </ScrollView>
                    </View>

                </RkCard>
                <RkCard style={styles.card}>
                    <View rkCardHeader style={{justifyContent: "flex-start"}}>
                        <Image style={{width: 16, height: 16, marginRight: 5}}
                               source={require('../asserts/images/take_drug_plan.png')}
                        />
                        <Text style={{fontSize: 16}}>用药计划</Text>
                    </View>
                    <View rkCardContent>

                        <ScrollView style={{flex: 1}}>
                            {_renderPlan}
                        </ScrollView>
                    </View>

                </RkCard>
                <Button title='确认' onPress={() => this._onSaveDrug()}/>
            </ScrollView>
        );
    }
}

let styles = RkStyleSheet.create(theme => ({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 45,
        paddingHorizontal: 14
    },
    card: {
        marginVertical: 8,
    },
    section: {
        marginVertical: 25
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: theme.colors.border.base,
        alignItems: 'center'
    },
    switch: {
        marginVertical: 5
    },
}));