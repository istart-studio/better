import {RkTheme} from 'react-native-ui-kitten';

export let bootstrap = () => {
    RkTheme.setType('RkCard', 'horizontal', {
        container: {
            flexDirection: 'row',
            height: 110
        },
        content: {
            flex: 1,
        },
        img: {
            height: null,
            flex: -1,
            width: 120
        }
    });
};