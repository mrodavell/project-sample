import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme, Text, Divider, HelperText, Button } from 'react-native-paper';
import SelectDropdown from '@mrodavell/react-native-select-dropdown';
import { FontAwesome5 } from '@expo/vector-icons';


function RegionSelect(props) {

    const ref = React.useRef();
    const theme = useTheme();
    const styles = makeStyles(theme);
    const [defaultRegion, setDefaultRegion] = React.useState("");

    const regionsList = [
        { id: '1', value: 'Region 1 (Ilocos Region)' },
        { id: '2', value: 'Region 2 (Cagayan Valley)' },
        { id: '3', value: 'Region 3 (Central Luzon)' },
        { id: '4a', value: 'Region 4-A (CALABARZON)' },
        { id: '4b', value: 'Region 4-B (MIMAROPA)' },
        { id: '5', value: 'Region 5 (Bicol Region)' },
        { id: '6', value: 'Region 6 (Western Visayas)' },
        { id: '7', value: 'Region 7 (Central Visayas)' },
        { id: '8', value: 'Region 8 (Eastern Visayas)' },
        { id: '9', value: 'Region 9 (Zamboanga Peninsula)' },
        { id: '10', value: 'Region 10 (Nothern Mindanao)' },
        { id: '11', value: 'Region 11 (Davao Region)' },
        { id: '12', value: 'Region 12 (SOCCSKSARGEN)' },
        { id: '13', value: 'Region 13 (Caraga)' },
        { id: 'NCR', value: 'NCR (National Capital Region)' },
        { id: 'CAR', value: 'CAR (Cordillera Administrative Region)' },
        { id: 'BARMM', value: 'BARMM (Bangsamoro Autonomous Region in Muslim Mindanao)' },
    ]

    const handleSelected = (value) => {
        if (props.setFieldValue) {
            props.setFieldValue(value);
        }
    }

    React.useEffect(() => {
        let r = regionsList.find(d => d.id === props.values.region);
        setDefaultRegion(r?.value);
    }, [props.values.region])

    return (
        <React.Fragment>
            <SelectDropdown
                ref={ref}
                search
                searchPlaceHolder='Type the region'
                data={regionsList}
                disabled={props.editable ? props.editable : false}
                onSelect={(selectedItem, _) => {
                    handleSelected(selectedItem.id);
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
                defaultButtonText={defaultRegion ? defaultRegion : "Region *"}
                renderCustomizedRowChild={(selectedItem, _) => {
                    return <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome5 name={selectedItem.icon} size={24} style={{ marginRight: 10, marginLeft: 5 }} />
                        <Text variant="titleMedium">{selectedItem?.value}</Text>
                    </View>
                }}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                dropdownIconPosition={'left'}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
                errors={props.errors.region && props.touched.region}
                leftIcon={<FontAwesome5 name="globe-asia" size={22} style={{ marginRight: 10, marginLeft: 8 }} />}
                titleText={<View style={{ width: '100%', padding: 10, justifyContent: 'center', alignSelf: 'center', flexDirection: 'column', backgroundColor: '#FFF' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text variant='titleLarge' style={{ marginTop: 7 }}>Select Province</Text>
                        <Button mode='text' onPress={() => ref.current.closeDropdown()} style={{ marginRight: -15 }}>
                            <FontAwesome5 name="times" size={18} style={{ color: 'red' }} />
                        </Button>
                    </View>
                    <Divider style={{ marginTop: 10 }} />
                </View>}
            />
            {props.errors.region && props.touched.region &&
                <HelperText type='error' visible={props.errors.region}>
                    {props.errors.region}
                </HelperText>
            }
        </React.Fragment>
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
    dropdown1DropdownStyle: { justifyContent: 'center', height: 400 },
    dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5', justifyContent: 'flex-start', marginTop: -5, marginLeft: 10, marginBottom: 5, marginRight: 10 },
    dropdown1RowTxtStyle: { color: 'red', textAlign: 'left' },
})

export default RegionSelect