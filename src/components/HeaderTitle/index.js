import React from 'react';
import { StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Color, FontFamily, FontSize } from '../../utills/theme';

const HeaderTitle = (props) => {
    const { title, titleStyle } = props;
    return (
        <Text style={[styles.title, titleStyle]}>
            {title}
        </Text>
    )
}

HeaderTitle.propTypes = {
    title: PropTypes.string,
};

const styles = StyleSheet.create({
    title: {
        fontSize: FontSize.SIZE_16,
        fontFamily: FontFamily.OPENSANS_SEMIBOLD,
        color: Color.DARKBLACKTEXT,
        alignSelf: 'center',
    }
});

export default HeaderTitle;