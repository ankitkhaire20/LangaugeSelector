import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');
export const screenWidth = width;
export const screenHeight = height;

export const REGEX = {
    EMAIL:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    SPECIAL_CHARECTERS: /^[\w&.\-]+$/,
    UPPER_CASE: /[A-Z]|[A-Z]/, // eslint-disable-next-line
    LOWER_CASE: /[a-z]|[a-z]/,
    NAME_NUMBER: /^[A-Za-z0-9]{1}[ A-Za-z0-9,.-]{0,}$/,
    NAME: /^[A-Z a-z,.-]+$/i,
    MIN_NUMBERS: "(^[0][1-9]+)|([1-9]d*)",
    NUMBER: /^[0-9]+$/,
    OTP_NUMBER: /[^0-9]/g,
    SPECIAL_ACCENTED: /^[ a-zA-Z-\u00C0-\u024F\u1E00-\u1EFF-.']+$/i,
    SPECIAL_ACCENTED_NAME:
        /^[ a-zA-Z.’\-\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F-\u024F\u1E00-\u1EFF]+$/, //with accent apostrophe
    // SPECIAL_ACCENTED_NAME: /^[ a-zA-Z\u00C0-\u024F\u1E00-\u1EFF']+$/i,
    // SPECIAL_ACCENTED_NAME: /^[ a-zA-Z.'\-\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F-\u024F\u1E00-\u1EFF]+$/,
};