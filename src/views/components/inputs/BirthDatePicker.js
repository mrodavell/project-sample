import React from 'react';
import DateTimepicker from '@react-native-community/datetimepicker';
import moment from 'moment/moment';
import { TextInput } from 'react-native-paper';

function BirthDatePicker(props) {

    moment.suppressDeprecationWarnings = true;
    const [defaultDate, setDefaultDate] = React.useState(props.values.birthdate ? moment(props.values.birthdate).toDate() : null)
    const [showDatePicker, setShowDatePicker] = React.useState(false);

    const handleChange = (date) => {
        setShowDatePicker(false);
        let value = moment(date.nativeEvent.timestamp).format("MM/DD/YYYY");
        setDefaultDate(value);
        if (props.setFieldValue) {
            props.setFieldValue(value);
        }
    }

    return (
        <React.Fragment>
            <TextInput
                label="Birthdate *"
                value={defaultDate ? moment(defaultDate).format("MM/DD/YYYY") : null}
                defaultValue={defaultDate ? moment(defaultDate).format("MM/DD/YYYY") : null}
                mode="outlined"
                left={<TextInput.Icon icon="calendar" />}
                style={{ marginTop: 10 }}
                onFocus={() => setShowDatePicker(true)}
                onChangeText={props.handleChange}
                error={props.errors}
                editable={props.editable}
            />

            {showDatePicker &&
                <DateTimepicker
                    value={defaultDate ? new Date(defaultDate) : new Date()}
                    mode="date"
                    onChange={(date) => handleChange(date)}
                    minimumDate={moment().subtract(40, 'years').toDate()}
                    maximumDate={moment().subtract(6, 'years').toDate()}
                />
            }
        </React.Fragment>
    )
}

export default BirthDatePicker