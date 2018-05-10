import React from 'react';
import {ScrollView, Button, View} from 'react-native';
import DrugService from "../service/drugService";
import {ListRow, Input, Toast, Checkbox, Label} from "teaset";

const KEY = "Drugs";
/**
 *
 */
export default class AddDrugScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: '添加新药',
        headerRight: (
            <Button
                title='完成'
                onPress={() =>
                    navigation.state.params.navigatePress()}
            />
        )
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
            <ScrollView style={{flex: 1}}>
                <ListRow detail={
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <Input
                            style={{flex: 4}}
                            size='md'
                            onChangeText={(text) => this.setState({drugName: text})}
                            value={this.state.text}
                            placeholder={"药品名称"}
                        />
                        <Label
                            style={{flex: 2, paddingLeft: 2, paddingRight: 2}}
                            size="md"
                            text=''/>
                        <Input
                            style={{flex: 2}}
                            size='md'
                            onChangeText={(text) => this.setState({props: {count: text}})}
                            value={this.state.props.count}
                            placeholder={"20"}
                        />
                        <Label
                            style={{paddingLeft: 2, paddingRight: 2}}
                            size="md"
                            text='X'/>
                        <Input
                            style={{flex: 2}}
                            size='md'
                            onChangeText={(text) => this.setState({props: {unit: text}})}
                            value={this.state.props.unit}
                            placeholder={"0.5mg"}
                        />
                    </View>
                }/>
                <ListRow detail={
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <Checkbox
                            title='早晨'
                            style={{flex: 1}}
                            checked={this.state.isMorning}
                            onChange={checked => this.setState({isMorning: checked})}
                        />
                        <Input
                            style={{flex: 2}}
                            size='md'
                            onChangeText={(text) => this.setState({dosage: text})}
                            value={this.state.text}
                            placeholder={"每日用量"}
                        />
                        <Label
                            style={{paddingLeft: 1, paddingRight: 2}}
                            size="md"
                            text='X'/>
                        <Input
                            style={{flex: 1}}
                            size='md'
                            onChangeText={(text) => this.setState({dosage: text})}
                            value={this.state.props.unit}
                            disabled={true}
                            placeholder={"0.5mg"}
                        />
                    </View>
                }/>
                <ListRow detail={
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <Checkbox
                            title='早晨'
                            style={{flex: 1}}
                            checked={this.state.isMorning}
                            onChange={checked => this.setState({isMorning: checked})}
                        />
                        <Input
                            style={{flex: 2}}
                            size='md'
                            onChangeText={(text) => this.setState({dosage: text})}
                            value={this.state.text}
                            placeholder={"每日用量"}
                        />
                        <Label
                            style={{paddingLeft: 1, paddingRight: 2}}
                            size="md"
                            text='X'/>
                        <Input
                            style={{flex: 1}}
                            size='md'
                            onChangeText={(text) => this.setState({dosage: text})}
                            value={this.state.props.unit}
                            placeholder={"0.5mg"}
                        />
                    </View>
                }/>
                <ListRow detail={
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <Checkbox
                            title='早晨'
                            style={{flex: 1}}
                            checked={this.state.isMorning}
                            onChange={checked => this.setState({isMorning: checked})}
                        />
                        <Input
                            style={{flex: 2}}
                            size='md'
                            onChangeText={(text) => this.setState({dosage: text})}
                            value={this.state.text}
                            placeholder={"每日用量"}
                        />
                        <Label
                            style={{paddingLeft: 1, paddingRight: 2}}
                            size="md"
                            text='X'/>
                        <Input
                            style={{flex: 1}}
                            size='md'
                            onChangeText={(text) => this.setState({dosage: text})}
                            value={this.state.props.unit}
                            placeholder={"0.5mg"}
                        />
                    </View>
                }/>
            </ScrollView>
        );
    }
}