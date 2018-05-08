import React from 'react';
import {ScrollView, TextInput, View} from 'react-native';
import DrugService from "../service/drugService";
import {ListRow, Button, Input, NavigationBar, Theme} from "teaset";

const KEY = "Drugs";
/**
 *
 */
export default class AddDrugScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header: <NavigationBar title='new drug'
                               rightView={
                                   <View style={{flexDirection: 'row'}}>
                                       <NavigationBar.LinkButton title='SAVE' onPress={() =>
                                           navigation.navigate('DrugList', {name: 'Jane'})
                                       }/>
                                   </View>
                               }/>
    });

    constructor(props) {
        super(props);
        this.state = {drugName: '', dosage: ''};
        this._onSaveDrug = this._onSaveDrug.bind(this);
    }


    _onSaveDrug = () => {
        DrugService.newDrugs(this.state);
    }


    render() {
        return (
            <ScrollView style={{flex: 1, paddingTop: Theme.statusBarHeight + 45}}>
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
                        <Button
                            title="白天"
                            onPress={() => this._onSaveDrug()
                            }
                        />
                        <Button
                            title="夜晚"
                            onPress={() => this._onSaveDrug()
                            }
                        />
                    </View>
                }/>
            </ScrollView>
        );
    }
}