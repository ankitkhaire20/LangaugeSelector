import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, FlatList } from 'react-native';
import Search from '../../components/search';
import CustomButton from '../../components/customButton';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { FontFamily } from '../../utills/theme';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import Routes from '../../navigation/routes';

// Define the type for a task
interface Task {
    title: string;
    subject: string;
    date: string;
    index: number;
}1

const HomeScreenComponent: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [subject, setSubject] = useState<string>('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [list, setList] = useState<Task[]>([]); // Specify the type of list

    const subjectInputRef = useRef<TextInput>(null);
    const navigation = useNavigation(); // Initialize useNavigation





    const handleTitleChange = (text: string) => {
        setTitle(text);
    };

    const handleSubjectChange = (text: string) => {
        setSubject(text);
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        const formattedDate = moment(date).format('DD-MM-YYYY');
        setSelectedDate(formattedDate);
        hideDatePicker();
    };

    const handleAddTask = async () => {
        if (title && subject && selectedDate) {
            try {
                // Fetch the current list from AsyncStorage
                const storedTasks = await AsyncStorage.getItem('tasks');
                const currentList = storedTasks ? JSON.parse(storedTasks) : [];

                // Create a new task object
                const newTask: Task = {
                    index: currentList.length + 1,  // Increment index based on the current list length
                    title,
                    subject,
                    date: selectedDate
                };

                // Append the new task to the existing list
                const updatedList = [...currentList, newTask];
                setList(updatedList);

                // Store the updated list in AsyncStorage
                await AsyncStorage.setItem('tasks', JSON.stringify(updatedList));

                Toast.show({
                    type: 'info',
                    text1: 'Note',
                    text2: 'Your Task is added Successfully!',
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

                // Reset the input fields
                setTitle('');
                setSubject('');
                setSelectedDate('');
            } catch (error) {
                console.error('Failed to save task list:', error);
            }
        } else {
            console.log("Please fill in all fields.");
        }
    };



    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add Your Task</Text>
            <Search
                onChangeText={handleTitleChange}
                mainContainerStyle={styles.inputContainer}
                value={title}
                placeholder='Enter the Title'
                handleSubmitEditing={() => subjectInputRef.current?.focus()}
                returnKeyType='next'
                textInputStyle={styles.textInputStyle}
                onPressIcon={() => setTitle('')}
            />
            <View style={{ paddingVertical: 15 }} />
            <Search
                ref={subjectInputRef}
                onPressIcon={() => setSubject('')}
                onChangeText={handleSubjectChange}
                mainContainerStyle={styles.inputContainer}
                value={subject}
                placeholder='Enter the Subject'
                handleSubmitEditing={showDatePicker}
                returnKeyType='next'
                textInputStyle={styles.textInputStyle}
            />
            <View style={{ paddingVertical: 10 }} />
            <View style={styles.datePickerContainer}>
                <TouchableOpacity onPress={showDatePicker} style={styles.data}>
                    <Text style={styles.datePickerButtonText}>Select Date</Text>
                </TouchableOpacity>
                <Text style={styles.selectedDateText}>{selectedDate}</Text>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton
                    title='Add'
                    style={styles.addButton}
                    onPress={handleAddTask}
                    disabled={!title || !subject || !selectedDate}
                />
                <CustomButton
                    title='List'
                    style={styles.listButton}
                    onPress={() => navigation.navigate('ListScreen')} // Pass the list to ListScreen
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    header: {
        marginBottom: 50,
        fontSize: 24,
        fontFamily: FontFamily.MODERUSTIC_BOLD
    },
    inputContainer: {
        marginRight: 20,
        width: '100%',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 10,  // For Android elevation
        backgroundColor: 'white',  // Ensure background color for shadow visibility
    },
    textInputStyle: {
        // width: '100%',
    },
    datePickerContainer: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    datePickerButtonText: {
        fontSize: 18,
        color: 'black',  // Ensure text is visible
    },
    selectedDateText: {
        fontSize: 18,
        marginLeft: 10,
    },
    data: {
        borderWidth: 1,
        padding: 10,
        fontSize: 18,
        borderRadius: 10,
        elevation: 5,  // Adjusted for a softer shadow
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },  // Adjusted for more subtle shadow
        shadowOpacity: 1,  // Adjusted for a softer shadow
        shadowRadius: 10,  // Adjusted for a softer shadow
        backgroundColor: 'white',  // Ensure background color for shadow visibility
    },
    buttonContainer: {
        marginTop: 30,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    addButton: {
        flex: 1,
        backgroundColor: 'red'
    },
    listButton: {
        width: 100
    }
});

export default HomeScreenComponent;
