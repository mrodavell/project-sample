import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { View } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import GenericSelect from '@components/inputs/GenericSelect';

export default function WorkExperienceForm(props) {

    const minYears = parseInt(moment().subtract(31, 'years').format('YYYY'));
    const maxYears = parseInt(moment().format('YYYY'));

    let yearAttended = [];
    for (let i = maxYears; i >= minYears; i--) {
        yearAttended.push(i.toString());
    }

    const validationSchema = Yup.object().shape({
        company: Yup.string().required('Please specify company'),
        position: Yup.string().required('Please specify position'),
        year_employed: Yup.string().required('Please specify year employed'),
    })

    const handleAdd = async (data) => {
        if (props.add) {
            props.add(data);
            props.cancel();
        }
    }

    return (
        <View>
            <Formik
                initialValues={{ company: "", position: "", year_employed: "" }}
                onSubmit={async (values) => {
                    await handleAdd(values);
                }}
                validationSchema={validationSchema}
            >
                {({ handleSubmit, handleChange, handleBlur, values, errors, touched, setTouched, setFieldValue, isSubmitting }) => (
                    <View>
                        <TextInput
                            label="Company name *"
                            defaultValue={values.company}
                            values={values.company}
                            mode="outlined"
                            left={<TextInput.Icon icon="office-building" />}
                            error={errors.company && touched.company}
                            onFocus={() => setTouched({ "company": true }, false)}
                            onChangeText={handleChange('company')}
                            onBlur={handleBlur('company')}
                        />
                        {errors.company && touched.company &&
                            <HelperText type='error' visible={errors.company}>
                                {errors.company}
                            </HelperText>
                        }
                        <TextInput
                            label="Position"
                            defaultValue={values.position}
                            values={values.position}
                            mode="outlined"
                            left={<TextInput.Icon icon="briefcase-variant" />}
                            error={errors.position && touched.position}
                            onFocus={() => setTouched({ "position": true }, false)}
                            onChangeText={handleChange('position')}
                            onBlur={handleBlur('position')}
                            style={{ marginTop: 10 }}
                        />
                        {errors.position && touched.position &&
                            <HelperText type='error' visible={errors.position}>
                                {errors.position}
                            </HelperText>
                        }
                        <GenericSelect
                            selectTitle="Year Employed"
                            defaultBtnText="Year Employed *"
                            dataList={yearAttended}
                            keyIndex="year_employed"
                            height={400}
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleChange={handleChange('year_employed')}
                            setFieldValue={(value) => {
                                setFieldValue('year_employed', value);
                            }}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 }}>
                            <Button loading={isSubmitting} onPress={handleSubmit} mode="contained" style={{ borderRadius: 5 }} contentStyle={{ minWidth: 100 }}>Add</Button>
                            <Button disabled={isSubmitting} onPress={props.cancel} mode="contained-tonal" style={{ borderRadius: 5, marginLeft: 5 }} contentStyle={{ minWidth: 100 }}>Cancel</Button>
                        </View>
                    </View>
                )}
            </Formik>
        </View>
    )
}
