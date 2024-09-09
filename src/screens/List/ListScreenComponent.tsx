import React, { useLayoutEffect, useState, useEffect } from "react";
import { FlatList, Text, View, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Color, FontFamily } from "../../utills/theme";
import CustomIcon from "../../components/customIcon";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import HeaderLeft from "../../components/HeaderLeft";
import HeaderTitle from "../../components/HeaderTitle";
import Toast from "react-native-toast-message";
import { screenWidth } from "../../utills/globals";

interface Task {
    index: string; // Unique identifier
    title: string;
    subject: string;
    date: string;
}

const ListScreenComponent: React.FC = () => {
    const [userList, setUserList] = useState<Task[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const isFocused = useIsFocused();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <HeaderLeft
                    iconName={'home'}
                    onPress={() => {
                        navigation.navigate('HomeScreen');
                        setUserList([]);
                    }}
                />
            ),
            headerTitle: () => <HeaderTitle title="List Screen" />,
        });
    }, [navigation, isFocused]);

    useEffect(() => {
        if (isFocused) {
            fetchTasks();
        }
    }, [isFocused]);

    const fetchTasks = async () => {
        try {
            const storedTasks = await AsyncStorage.getItem('tasks');
            console.log("storedTasks---", storedTasks);

            if (storedTasks) {
                setUserList(JSON.parse(storedTasks));
            }
        } catch (error) {
            console.error('Failed to load tasks from storage:', error);
        }
    };

    const onPressDelete = async (item: Task) => {
        let temp = userList?.filter((selectedItem) => item.index != selectedItem.index);
        console.log("temp--", temp);

        setUserList(temp);

        try {
            // Save the updated list to AsyncStorage
            await AsyncStorage.setItem('tasks', JSON.stringify(temp));
            Toast.show({
                type: 'info',
                text1: 'Note',
                text2: `${item.title} Task is deleted.`,
                position: 'top',
                visibilityTime: 2500,
                autoHide: true,
                topOffset: 150,
                text1Style: {
                    fontSize: 18,
                    fontWeight: 'bold',
                    fontFamily: FontFamily.MODERUSTIC_BOLD,
                },
                text2Style: {
                    fontSize: 16,
                    fontFamily: FontFamily.MODERUSTIC_BOLD,
                },
            });
        } catch (error) {
            console.error('Failed to update task list in storage:', error);
        }

    };

    const onPressEdit = (item: Task) => {
        setSelectedTask(item);
        setModalVisible(true);
    };


    const handleSaveEdit = async () => {


        const updatedList = userList?.map((item) => {
            if (item.index === selectedTask?.index) {
                return { ...selectedTask };
            } else {
                return item;
            }
        });

        console.log("After update:", updatedList);

        setUserList(updatedList);

        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(updatedList));
            setModalVisible(false);
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Task updated successfully.',
                position: 'top',
                visibilityTime: 2500,
                autoHide: true,
                topOffset: 150,
                text1Style: {
                    fontSize: 18,
                    fontWeight: 'bold',
                    fontFamily: FontFamily.MODERUSTIC_BOLD,
                },
                text2Style: {
                    fontSize: 16,
                    fontFamily: FontFamily.MODERUSTIC_BOLD,
                },
            });
        } catch (error) {
            console.error('Failed to update task list in storage:', error);
        }
    };

    const renderItem = ({ item }: { item: Task }) => (
        <View style={styles.taskContainer}>
            <View>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text style={styles.taskSubject}>{item.subject}</Text>
                <Text style={styles.taskDate}>{item.date}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => onPressEdit(item)}>
                    <CustomIcon name="edit" size={24} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onPressDelete(item)}>
                    <CustomIcon name="delete" size={24} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <>
            <View style={styles.container}>
                {userList.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text>No Task available</Text>
                    </View>
                ) : (
                    <FlatList
                        data={userList}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id} // Use unique id as key
                    />
                )}
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.headerText}>Edit Task</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            value={selectedTask?.title || ''}
                            onChangeText={(text) => {
                                setSelectedTask(prev => prev ? { ...prev, title: text } : null);
                            }}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Subject"
                            value={selectedTask?.subject || ''}
                            onChangeText={(text) => {
                                setSelectedTask(prev => prev ? { ...prev, subject: text } : null);
                            }}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Date"
                            value={selectedTask?.date || ''}
                            onChangeText={(text) => {
                                setSelectedTask(prev => prev ? { ...prev, date: text } : null);
                            }}
                        />
                        <View style={styles.modalButtonContainer}>
                            <Button title="Save" onPress={handleSaveEdit} />
                            <Button title="Cancel" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    headerText: {
        fontFamily: FontFamily.MODERUSTIC_BOLD,
        fontSize: 20
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    input: {
        width: screenWidth - 100,
        height: 48,
        fontSize: 18,
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    taskContainer: {
        padding: 20,
        margin: 10,
        backgroundColor: Color.BOOKED_GRAY,
        borderRadius: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    taskTitle: {
        fontSize: 18,
        paddingVertical: 5,
        fontWeight: 'bold',
    },
    taskSubject: {
        fontSize: 16,
    },
    taskDate: {
        fontSize: 18,
        color: Color.PRIMARY,
        paddingVertical: 5,
        fontFamily: FontFamily.MODERUSTIC_BOLD
    },
});

export default ListScreenComponent;
