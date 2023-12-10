import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { View, ScrollView } from 'react-native';
import { TextInput, HelperText, Button } from 'react-native-paper';
import { useAuth } from 'context/authContext';
import moment from 'moment';
import { authRepository } from 'repository';
import { alerts, storage } from 'utils';
import EducationLevelSelect from '../inputs/EducationLevelSelect';
import LastYearAttendedSelect from '../inputs/LastYearAttendedSelect';

export default function EditEducationBackgroundForm(props) {

    const { me, token, setMe } = useAuth();
    const validationSchema = Yup.object().shape({
        highestEducationalAttained: Yup.string().required('Please select highestEducationalAttained level'),
        lastYearAttended: Yup.string().required('Please select last year attended'),
        reasonForNotAttendingSchool: Yup.string().nullable(),
    })

    const [level, setLevel] = React.useState(null);
    const yearNow = moment().format('YYYY');

    return (
        <View>
            <Formik
                initialValues={{ ...me.learners_info }}
                validationSchema={validationSchema}
                validateOnBlur
                onSubmit={async (data) => {

                    let result = await authRepository.updateEducation(token.token, JSON.stringify(data));

                    if (!result.error) {
                        let newMe = await authRepository.me(token.token);
                        await storage.setItem('_me', newMe);
                        setMe(newMe);
                        props.setIsEdit(false);
                    } else {
                        alerts.error({ message: result.message });
                    }

                }}
                innerRef={props.formRef}
            >
                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched, isValid, isSubmitting }) => {
                    return (
                        <ScrollView>
                            <View style={{ marginBottom: 20, padding: 10 }}>
                                <EducationLevelSelect
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    handleChange={handleChange('highestEducationalAttained')}
                                    setLevel={setLevel}
                                    setFieldValue={(highestEducationalAttained) => {
                                        setFieldValue('highestEducationalAttained', highestEducationalAttained);
                                    }}
                                    editable={props.isEdit}
                                />
                                <LastYearAttendedSelect
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    handleChange={handleChange('lastYearAttended')}
                                    setFieldValue={(lastYearAttended) => {
                                        setFieldValue('lastYearAttended', lastYearAttended);
                                    }}
                                    editable={props.isEdit}
                                />
                                {(parseInt(level) <= 5 && yearNow !== values.lastYearAttended && values.lastYearAttended) || values.reasonForNotAttendingSchool !== '' &&
                                    <TextInput
                                        label="Reason for not attending school"
                                        values={values.reasonForNotAttendingSchool}
                                        defaultValue={values.reasonForNotAttendingSchool}
                                        mode="outlined"
                                        left={<TextInput.Icon icon="comment-text-outline" />}
                                        style={{ marginTop: 10 }}
                                        onBlur={handleBlur('reasonForNotAttendingSchool')}
                                        onChangeText={handleChange('reasonForNotAttendingSchool')}
                                        error={errors.reasonForNotAttendingSchool && touched.reasonForNotAttendingSchool}
                                        multiline
                                        numberOfLines={4}
                                        editable={props.isEdit}
                                    />
                                }

                                {errors.reasonForNotAttendingSchool && touched.reasonForNotAttendingSchool &&
                                    <HelperText type='error' visible={errors.reasonForNotAttendingSchool}>
                                        {errors.reasonForNotAttendingSchool}
                                    </HelperText>
                                }
                                {props.isEdit &&
                                    <Button
                                        mode='contained'
                                        compact
                                        icon="content-save"
                                        contentStyle={{ flexDirection: 'row-reverse' }}
                                        disabled={!isValid || isSubmitting}
                                        loading={isSubmitting}
                                        style={{
                                            padding: 5,
                                            borderRadius: 5,
                                            marginTop: 30,
                                        }}
                                        labelStyle={{ fontSize: 20, marginRight: 25 }}
                                        onPress={handleSubmit}
                                    >
                                        Save
                                    </Button>
                                }
                            </View>
                        </ScrollView>
                    )
                }}
            </Formik>
        </View>
    )
}
