import React from 'react';
import {ScrollView, Button, View} from 'react-native';
import DrugService from "../service/drugService";
import {ListRow, Input, Toast, Checkbox} from "teaset";

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
        this.state = {drugName: '', dosage: '', isMorning: true, isNoon: true, isNight: true};
        this._onSaveDrug = this._onSaveDrug.bind(this);
        this.props.navigation.setParams({navigatePress: this._onSaveDrug})
    }


    _onSaveDrug = () => {
        DrugService.newDrugs(this.state).then(function(isNewDrug) {
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
                <ListRow detail={<Input
                    style={{flex: 1}}
                    size='md'
                    onChangeText={(text) => this.setState({drugName: text})}
                    value={this.state.text}
                    placeholder={"药品名称"}
                />}/>
                <ListRow detail={<Input
                    style={{flex: 1}}
                    size='md'
                    onChangeText={(text) => this.setState({dosage: text})}
                    value={this.state.text}
                    placeholder={"每日用量"}
                />}/>
                <ListRow detail={
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Checkbox
                            title='早晨'
                            style={{flex: 1}}
                            checked={this.state.isMorning}
                            onChange={checked => this.setState({isMorning: checked})}
                        />
                        <Checkbox
                            title='正午'
                            style={{flex: 1}}
                            checked={this.state.isNoon}
                            onChange={checked => this.setState({isNoon: checked})}
                        />
                        <Checkbox
                            title='夜晚'
                            style={{flex: 1}}
                            checked={this.state.isNight}
                            onChange={checked => this.setState({isNight: checked})}
                        />
                    </View>
                }/>
            </ScrollView>
        );
    }
}