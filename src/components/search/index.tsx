import React, { forwardRef } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View, ViewStyle } from "react-native";
import { Color } from "../../utills/theme";
import IconButton from "../iconButton";
import CustomIcon from "../customIcon";

interface SearchProps {
  value: string;
  onChangeText?: (text: string) => void;
  textInputStyle: ViewStyle;
  mainContainerStyle: ViewStyle;
  handleSubmitEditing: any;
  placeholder: string;
  returnKeyType: any;
  onPressIcon: () => void;
  iconName?: string
}

const Search = forwardRef<TextInput, SearchProps>((props, ref) => {
  const {
    value,
    textInputStyle,
    placeholder,
    returnKeyType,
    handleSubmitEditing,
    mainContainerStyle,
    onChangeText,
    iconName,
    onPressIcon
  } = props;

  return (
    <View style={[styles.mainContainer, mainContainerStyle]}>
      <TextInput
        value={value}
        ref={ref}
        returnKeyType={returnKeyType}
        placeholder={placeholder}
        placeholderTextColor={Color.GRAY}
        style={[styles.inputStyle, textInputStyle]}
        onChangeText={onChangeText}
        editable={true}
        onSubmitEditing={handleSubmitEditing}
      />
      <TouchableOpacity onPress={onPressIcon} style={styles.iconButton}>
        <CustomIcon name={iconName} size={24} />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
    backgroundColor: Color.WHITE,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 20,
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
    height: 48,
  },
  iconButton: {
    padding: 10,
  },
});

export default Search;
