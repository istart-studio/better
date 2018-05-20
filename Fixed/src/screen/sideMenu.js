import React from 'react';
import {
    RkStyleSheet, RkText,
} from 'react-native-ui-kitten';
import {ScrollView, TouchableHighlight, View} from "react-native";
import {NavigationActions} from "react-navigation";
import {DrugListScreen} from "./drugListScreen";
import {TakeDrugScreen} from "./takeDrugScreen";
import AddDrugScreen from "./addDrugScreen";

export default class SideMenu extends React.Component {
    constructor(props) {
        super(props);
        this._navigateAction = this._navigate.bind(this);
        this.MainRoutes = [
            {id: 'DrugList', screen: DrugListScreen, title: '药品管理', icon: '1'},
            {id: 'TakeDrug', screen: TakeDrugScreen, title: '今日用药', icon: '2'},
            {id: 'AddDrug', screen: AddDrugScreen, title: '新增药品', icon: '3'},
            ];
    }

    _navigate(route) {
        let resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: route.id})
            ]
        });
        this.props.navigation.dispatch(resetAction)
    }

    render() {
        let menu = this.MainRoutes.map((route, index) => {
            return (
                <TouchableHighlight
                    style={styles.container}
                    key={route.id}
                    // underlayColor={RkTheme.current.colors.button.underlay}
                    activeOpacity={1}
                    onPress={() => this._navigateAction(route)}>
                    <View style={styles.content}>
                        <View style={styles.content}>
                            <RkText style={styles.icon}
                                    rkType='moon primary xlarge'>{route.icon}</RkText>
                            <RkText>{route.title}</RkText>
                        </View>
                        {/*<RkText rkType='awesome secondaryColor small'>{FontAwesome.chevronRight}</RkText>*/}
                    </View>
                </TouchableHighlight>
            )
        });

        return (
            <View style={styles.root}>
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <View style={[styles.container, styles.content]}>
                        {this._renderIcon()}
                    </View>
                    {menu}
                </ScrollView>
            </View>
        )
    }
}
let styles = RkStyleSheet.create(theme => ({
    container: {
        height: 80,
        paddingHorizontal: 16,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: theme.colors.border.base
    },
    root: {
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
        backgroundColor: theme.colors.screen.base
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        marginRight: 13,
    }
}));