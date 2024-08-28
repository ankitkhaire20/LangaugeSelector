import { StyleSheet } from "react-native";
import { Color } from "../../utills/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Color.WHITE,
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
});

export default styles;
