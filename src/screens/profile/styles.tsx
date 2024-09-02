import { StyleSheet } from "react-native";
import { Color } from "../../utills/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Color.GREY_TEXT,

    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Color.LIGHT_GRAY,
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
    },
    labelText: {
        fontSize: 16,
        color: Color.PRIMARY,
        fontWeight: "500",
    },
    contentContainer: {
        padding: 20,
    },
    title: {
        fontSize: 18,
        marginBottom: 20,
    },
    checkboxContainer: {
        width: '100%',
        justifyContent: 'center',
    },
    checkboxWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    checkboxLabel: {
        fontSize: 16,
        marginLeft: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 18,
    },
    bottomSheetContent: {
        flex: 1,
        padding: 20,
    },
    optionText: {
        fontSize: 16,
    },
    changeThemeButton: {
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,

    },
    option: {
        padding: 15,
        borderRadius: 5,
        marginVertical: 5,
    }
});

export default styles;
