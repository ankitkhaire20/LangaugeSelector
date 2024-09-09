import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import PropTypes from 'prop-types';

import IconButton from '../iconButton';

const HeaderLeft = (props) => {
    const { onPress, iconName, iconStyle } = props;
    return (
        <Pressable onPress={onPress}>
            <IconButton
                style={styles.container}
                iconName={iconName}
                disabled={true}
                iconStyle={[styles.iconStyle, iconStyle]} />
        </Pressable>
    )
}

HeaderLeft.defaultProps = {
    iconName: 'left-arrow'
}

HeaderLeft.propTypes = {
    onPress: PropTypes.func,

    iconName: PropTypes.string,
    iconStyle: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 5,
    },
    iconStyle: {
        fontSize: 16,
        
    }
});

export default HeaderLeft