import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { ScrollView, View } from 'react-native';
import { TextInput, HelperText, Button, Text } from 'react-native-paper';
import { agencyRepository } from 'repository/agencyRepository';
import { alerts } from 'utils';
import GenericSelect from '../inputs/GenericSelect';
import { useAuth } from 'context/authContext';

export default function HEIForm({ navigation, route }) {

    const { agency_id } = route.params;
    const { token } = useAuth();
    const minYears = parseInt(moment().subtract(31, 'years').format('YYYY'));
    const maxYears = parseInt(moment().format('YYYY'));

    let yearAttended = [];
    for (let i = maxYears; i >= minYears; i--) {
        yearAttended.push(i.toString());
    }


    const validationSchema = Yup.object().shape({
        institution: Yup.string().required('Please specify the HEI institution'),
        course: Yup.string().required('Please specify the course you\'ve taken'),
        year_attended: Yup.string().required('Please select last year you attended HEI'),
    });

    const submitData = async (data) => {

        let result = await agencyRepository.submitHEIData(token.token, JSON.stringify(data));

        if (!result.error) {
            navigation.popToTop();
        } else {
            alerts.error({ message: result.message });
        }
    }

    return (
        <Formik
            initialValues={{
                agency_id: agency_id.toString(),
                institution: "",
                course: "",
                year_attended: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(data) => submitData(data)}
        >
            {({ handleChange, handleSubmit, handleBlur, setFieldValue, values, errors, touched, isValid, isSubmitting }) => {
                return (
                    <View>
                        <Text variant='titleMedium' style={{ marginLeft: 10, marginVertical: 10, alignSelf: 'center' }}>Please fill in the required (<Text style={{ color: 'tomato' }}>*</Text>) fields</Text>
                        <ScrollView>
                            <View style={{ marginBottom: 120, padding: 10 }}>
                                <TextInput
                                    label="Institution"
                                    values={values.institution}
                                    defaultValue={values.institution}
                                    mode="outlined"
                                    left={<TextInput.Icon icon="office-building" />}
                                    style={{ marginTop: 10 }}
                                    onBlur={handleBlur('institution')}
                                    onChangeText={handleChange('institution')}
                                />
                                {errors.institution && touched.institution &&
                                    <HelperText type='error' visible={errors.institution}>
                                        {errors.institution}
                                    </HelperText>
                                }
                                <TextInput
                                    label="Course"
                                    values={values.course}
                                    defaultValue={values.course}
                                    mode="outlined"
                                    left={<TextInput.Icon icon="school" />}
                                    style={{ marginTop: 10 }}
                                    onBlur={handleBlur('course')}
                                    onChangeText={handleChange('course')}
                                />
                                {errors.course && touched.course &&
                                    <HelperText type='error' visible={errors.course}>
                                        {errors.course}
                                    </HelperText>
                                }
                                <GenericSelect
                                    selectTitle="Last year attended"
                                    defaultBtnText="Year Attended *"
                                    dataList={yearAttended}
                                    keyIndex="year_attended"
                                    height={400}
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    handleChange={handleChange('year_attended')}
                                    setFieldValue={(value) => {
                                        setFieldValue('year_attended', value);
                                    }}
                                />
                                <Button
                                    mode='contained'
                                    compact
                                    icon="content-save"
                                    contentStyle={{ flexDirection: 'row-reverse' }}
                                    disabled={touched && (!isValid || isSubmitting)}
                                    loading={isSubmitting}
                                    style={{
                                        padding: 5,
                                        borderRadius: 5,
                                        marginTop: 25,
                                    }}
                                    labelStyle={{ fontSize: 20, marginRight: 25 }}
                                    onPress={handleSubmit}
                                >
                                    Save
                                </Button>
                            </View>
                        </ScrollView>
                    </View >
                )
            }}
        </Formik >
    )
}
