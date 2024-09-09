import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle, TextStyle, Text } from 'react-native';
import IconButton from '../iconButton';
import { Color, FontFamily, FontSize } from '../../utills/theme';

interface CustomButtonProps {
  style?: ViewStyle;
  buttonCustomStyle?: ViewStyle;
  activeOpacity?: number;
  disabled?: boolean;
  onPress: () => void;
  btnIconName?: string;
  btnIconCustomStyle?: TextStyle;
  title?: string;
  titleStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = props => {
  const {
    buttonCustomStyle,
    activeOpacity,
    disabled,
    onPress,
    btnIconName,
    btnIconCustomStyle,
    titleStyle,
    title,
  } = props;


  return (
    <TouchableOpacity
      style={[
        styles.buttonStyle,
        { backgroundColor: disabled ? Color.DISABLE_BUTTON : Color.BUTTON },
        buttonCustomStyle,
      ]}
      activeOpacity={activeOpacity}
      disabled={disabled}
      onPress={onPress}>
      {btnIconName && (
        <IconButton
          disabled={true}
          iconName={btnIconName}
          iconStyle={[styles.btnIconStyle, btnIconCustomStyle]}
        />
      )}
      {title && (
        <Text
          style={[
            styles.textStyle,
            {
              color: disabled ? Color.DISABLE_TEXT : Color.WHITE,
            },
            titleStyle || {}, // Use an empty object if titleStyle is undefined
          ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 42,
  },
  textStyle: {
    fontFamily: FontFamily.ROBOTO_MEDIUM,
    fontSize: FontSize.SIZE_16,
  },
  btnIconStyle: {
    fontSize: FontSize.SIZE_18,
    marginRight: 6,
  },
});

export default CustomButton;
