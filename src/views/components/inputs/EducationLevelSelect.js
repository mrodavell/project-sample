import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme, Text, Divider, HelperText, Button } from 'react-native-paper';
import SelectDropdown from '@mrodavell/react-native-select-dropdown';
import { MaterialCommunityIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

function EducationLevelSelect(props) {

    const ref = React.useRef();
    const theme = useTheme();
    const styles = makeStyles(theme);

    const educationLevelList = [
        { id: 'Elementary Level', value: 'Elementary Level', icon: 'school', level: 1 },
        { id: 'Elementary Graduate', value: 'Elementary Graduate', icon: 'school', level: 2 },
        { id: 'High School Level', value: 'High School Level', icon: 'school', level: 3 },
        { id: 'High School Graduate', value: 'High School Graduate', icon: 'school', level: 4 },
        { id: 'College Level', value: 'College Level', icon: 'school', level: 5 },
        { id: 'College Graduate', value: 'College Graduate', icon: 'school', level: 6 },
    ]

    const handleSelected = (value) => {
        if (props.setFieldValue) {
            props.setFieldValue(value);
        }
    }

    return (
        <React.Fragment>
            <SelectDropdown
                ref={ref}
                data={educationLevelList}
                onSelect={(selectedItem, _) => {
                    handleSelected(selectedItem.value);
                    props.setLevel(selectedItem.level);
                }}
                buttonTextAfterSelection={(selectedItem, _) => {
                    return selectedItem.value;
                }}
                rowTextForSelection={(item, _) => {
                    return item.value;
                }}
                renderDropdownIcon={isOpened => {
                    return <FontAwesome5 name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={12} style={{ marginRight: 5 }} />;
                }}
                defaultButtonText={props.values.highestEducationalAttained ? props.values.highestEducationalAttained : 'Education Level *'}
                renderCustomizedRowChild={(selectedItem, _) => {
                    return <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name={selectedItem.icon} size={24} style={{ marginRight: 10, marginLeft: 5 }} />
                        <Text variant="titleMedium">{selectedItem?.value}</Text>
                    </View>
                }}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                dropdownIconPosition={'left'}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
                errors={props.errors.highestEducationalAttained && props.touched.highestEducationalAttained}
                leftIcon={<MaterialIcons name="person" size={22} style={{ marginRight: 10, marginLeft: 8 }} />}
                titleText={<View style={{ width: '100%', padding: 10, justifyContent: 'center', alignSelf: 'center', flexDirection: 'column', backgroundColor: '#FFF' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text variant='titleLarge' style={{ marginTop: 7 }}>Select Education Level</Text>
                        <Button mode='text' onPress={() => ref.current.closeDropdown()} style={{ marginRight: -15 }}>
                            <FontAwesome5 name="times" size={18} style={{ color: 'red' }} />
                        </Button>
                    </View>
                    <Divider style={{ marginTop: 10 }} />
                </View>}
            />
            {
                props.errors.highestEducationalAttained && props.touched.highestEducationalAttained &&
                <HelperText type='error' visible={props.errors.highestEducationalAttained}>
                    {props.errors.highestEducationalAttained}
                </HelperText>
            }
        </React.Fragment >
    )
};

const makeStyles = (theme) => StyleSheet.create({
    dropdown1BtnStyle: {
        width: '100%',
        height: 50,
        backgroundColor: theme.colors.background,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#444',
        marginTop: 15
    },
    dropdown1BtnTxtStyle: { textAlign: 'left', fontSize: 16 },
    dropdown1DropdownStyle: { justifyContent: 'center', height: 370 },
    dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5', justifyContent: 'flex-start', marginTop: -5, marginLeft: 10, marginBottom: 5, marginRight: 10 },
    dropdown1RowTxtStyle: { color: 'red', textAlign: 'left' },
})

export default EducationLevelSelect