import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme, Text, Divider, HelperText } from 'react-native-paper';
import SelectDropdown from '@mrodavell/react-native-select-dropdown';
import { MaterialCommunityIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

function GenderSelect(props) {
    const theme = useTheme();
    const styles = makeStyles(theme);

    const gendersList = [
        { id: 'male', value: 'Male', icon: 'gender-male' },
        { id: 'female', value: 'Female', icon: 'gender-female' },
    ]

    const handleSelected = (value) => {
        if (props.setFieldValue) {
            props.setFieldValue(value);
        }
    }

    return (
        <React.Fragment>
            <SelectDropdown
                disabled={props.disabled ?? false}
                data={gendersList}
                onSelect={(selectedItem, _) => {
                    handleSelected(selectedItem.value);
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
                defaultButtonText={props.values.gender ? props.values.gender : 'Gender *'}
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
                errors={props.errors.gender && props.touched.gender}
                leftIcon={<MaterialIcons name="person" size={22} style={{ marginRight: 10, marginLeft: 8 }} />}
                titleText={<View style={{ width: '100%', padding: 10, justifyContent: 'center', alignSelf: 'center', flexDirection: 'column', backgroundColor: '#FFF' }}><Text variant='titleLarge'>Select Gender</Text><Divider style={{ marginTop: 10 }} /></View>}
            />
            {
                props.errors.gender && props.touched.gender &&
                <HelperText type='error' visible={props.errors.gender}>
                    {props.errors.gender}
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
    dropdown1DropdownStyle: { justifyContent: 'center', height: 160 },
    dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5', justifyContent: 'flex-start', marginTop: -5, marginLeft: 10, marginBottom: 5, marginRight: 10 },
    dropdown1RowTxtStyle: { color: 'red', textAlign: 'left' },
})

export default GenderSelect