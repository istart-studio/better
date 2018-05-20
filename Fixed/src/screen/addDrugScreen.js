import React from 'react';
import {ScrollView, Button, View, Text, StyleSheet, Image} from 'react-native';
import DrugService from "../service/drugService";
import {ListRow, Input, Toast, Checkbox, Label, Badge} from "teaset";
import {RkCard, RkStyleSheet} from "react-native-ui-kitten";
import {
    RkSwitch
} from '../component';

/**
 *
 */
export default class AddDrugScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: '添加新药',
        headerRight: (
            <Button
                title='完成'
                onPress={() =>
                    navigation.state.params.navigatePress()}
            />
        ),
        tabBarIcon: ({tintColor, activeTintColor}) => (
            <Image source={require('../asserts/images/new_drug.png')}
                   style={{width: 16, height: 16, tintColor: tintColor, activeTintColor: activeTintColor}}
            />
        ),
    });

    constructor(props) {
        super(props);
        this.state = {
            drugName: '',
            dosage: {isMorning: true, isNoon: true, isNight: true},
            props: {count: 0, unit: ''}
        };
        this._onSaveDrug = this._onSaveDrug.bind(this);
        this.props.navigation.setParams({navigatePress: this._onSaveDrug})
    }


    _onSaveDrug = () => {
        DrugService.newDrugs(this.state).then(function (isNewDrug) {
            // here you can use the result of promiseB
            if (isNewDrug) {
                this.props.navigation.goBack();
            } else {
                Toast.fail('已添加过同名药品');
            }
        })
    }


    render() {
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
                                        value={this.state.text}
                                        placeholder={"药品名称"}
                                    />
                                    <Label
                                        style={{flex: 1, paddingLeft: 2, paddingRight: 2}}
                                        size="sm"
                                        text=''/>
                                    <Input
                                        style={{flex: 2}}
                                        size='sm'
                                        onChangeText={(text) => this.setState({props: {count: text}})}
                                        value={this.state.props.count}
                                        placeholder={"20"}
                                    />
                                    <Label
                                        style={{paddingLeft: 2, paddingRight: 2}}
                                        size="sm"
                                        text='*'/>
                                    <Input
                                        style={{flex: 2}}
                                        size='sm'
                                        onChangeText={(text) => this.setState({props: {unit: text}})}
                                        value={this.state.props.unit}
                                        placeholder={"0.5mg"}
                                    />
                                </View>}/>
                            <ListRow detail={
                                <View style={styles.row}>
                                    <Input
                                        style={{flex: 4}}
                                        size='sm'
                                        onChangeText={(text) => this.setState({drugName: text})}
                                        value={this.state.text}
                                        placeholder={"药品厂商"}
                                    />
                                    <Label
                                        style={{flex: 1, paddingLeft: 2, paddingRight: 2}}
                                        size="sm"
                                        text=''/>
                                    <Input
                                        style={{flex: 3}}
                                        size='sm'
                                        onChangeText={(text) => this.setState({drugName: text})}
                                        value={this.state.text}
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
                            <ListRow icon={require('../asserts/images/morning.png')} detail={
                                <View style={styles.row}>
                                    <Input
                                        style={{flex: 1}}
                                        size='sm'
                                        onChangeText={(text) => this.setState({dosage: text})}
                                        value={this.state.text}
                                        placeholder={"每日用量"}
                                    />
                                    <Label
                                        style={{paddingLeft: 1, paddingRight: 2}}
                                        size="sm"
                                        text='*'/>
                                    <Input
                                        style={{flex: 1}}
                                        size='sm'
                                        onChangeText={(text) => this.setState({dosage: text})}
                                        value={this.state.props.unit}
                                        placeholder={"0.5mg"}
                                    />
                                    <Label
                                        style={{flex: 1, paddingLeft: 2, paddingRight: 2}}
                                        size="sm"
                                        text=''/>
                                    <RkSwitch style={styles.switch}
                                              value={this.state.sendPush}
                                              name="Push"
                                              onValueChange={(sendPush) => this.setState({sendPush})}/>
                                </View>
                            }/>
                            <ListRow
                                titleStyle={{width: 16, height: 16}}
                                icon={require('../asserts/images/noon.png')}
                                detail={
                                    <View style={styles.row}>
                                        <Input
                                            style={{flex: 1}}
                                            size='sm'
                                            onChangeText={(text) => this.setState({dosage: text})}
                                            value={this.state.text}
                                            placeholder={"每日用量"}
                                        />
                                        <Label
                                            style={{paddingLeft: 1, paddingRight: 2}}
                                            size="sm"
                                            text='*'/>
                                        <Input
                                            style={{flex: 1}}
                                            size='sm'
                                            onChangeText={(text) => this.setState({dosage: text})}
                                            value={this.state.props.unit}
                                            placeholder={"0.5mg"}
                                        />
                                        <Label
                                            style={{flex: 1, paddingLeft: 2, paddingRight: 2}}
                                            size="sm"
                                            text=''/>
                                        <RkSwitch style={styles.switch}
                                                  value={this.state.sendPush}
                                                  name="Push"
                                                  onValueChange={(sendPush) => this.setState({sendPush})}/>
                                    </View>
                                }/>
                            <ListRow icon={require('../asserts/images/night.png')} detail={
                                <View style={styles.row}>
                                    <Input
                                        style={{flex: 1}}
                                        size='sm'
                                        onChangeText={(text) => this.setState({dosage: text})}
                                        value={this.state.text}
                                        placeholder={"每日用量"}
                                    />
                                    <Label
                                        style={{paddingLeft: 1, paddingRight: 2}}
                                        size="sm"
                                        text='*'/>
                                    <Input
                                        style={{flex: 1}}
                                        size='sm'
                                        onChangeText={(text) => this.setState({dosage: text})}
                                        value={this.state.props.unit}
                                        placeholder={"0.5mg"}
                                    />
                                    <Label
                                        style={{flex: 1, paddingLeft: 2, paddingRight: 2}}
                                        size="sm"
                                        text=''/>
                                    <RkSwitch style={styles.switch}
                                              value={this.state.sendPush}
                                              name="Push"
                                              onValueChange={(sendPush) => this.setState({sendPush})}/>
                                </View>
                            }/>
                        </ScrollView>
                    </View>

                </RkCard>
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
        // paddingHorizontal: 17.5,
        // borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: theme.colors.border.base,
        alignItems: 'center'
    },
    switch: {
        marginVertical: 5
    },
}));