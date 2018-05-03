import React from 'react';
import {Button, TextInput, View} from 'react-native';
import BaseStorage from "../framework/storage/baseStorage"
import DrugService from "../service/drugService";

const KEY = "Drugs";
/**
 *
 */
export default class AddDrugScreen extends React.Component {
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
            <View>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({drugName: text})}
                    value={this.state.text}
                    placeholder={"药品名称"}
                />
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({dosage: text})}
                    value={this.state.text}
                    placeholder={"每日用量"}
                />
                <Button
                    title="day"
                    onPress={() => {
                    }
                    }
                />
                <Button
                    title="night"
                    onPress={() => {
                    }
                    }
                />
                <Button
                    title="day and night"
                    onPress={() => {
                    }
                    }
                />
                <Button
                    title="day or night"
                    onPress={() => {
                    }}
                />
                <Button
                    title="save drug"
                    onPress={() => this._onSaveDrug()
                    }
                />
            </View>
        );
    }
}