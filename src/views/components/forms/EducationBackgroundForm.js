import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { View } from 'react-native';
import { TextInput, HelperText, Button, TouchableRipple } from 'react-native-paper';
import { useTheme, Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import { authRepository } from '@repository';
import { alerts } from '@utils';
import EducationLevelSelect from '../inputs/EducationLevelSelect';
import LastYearAttendedSelect from '../inputs/LastYearAttendedSelect';

export default function EducationBackgroundForm(props) {

    const theme = useTheme();

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
                initialValues={{ ...props.regData }}
                validationSchema={validationSchema}
                validateOnBlur
                onSubmit={async (data) => {
                    let result = await authRepository.register(JSON.stringify(data));
                    if (!result.error) {
                        props.submitData(data);
                    } else {
                        alerts.error({ message: result.message });
                    }
                }}
            >
                {({ handleChange, handleBlur, submitForm, setFieldValue, values, errors, touched, isValid, isSubmitting }) => (
                    <View style={{ marginBottom: 20 }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <MaterialIcons name='school' size={30} color={theme.colors.primary} />
                            <Text variant='headlineSmall' style={{ color: theme.colors.primary, marginLeft: 5 }}>
                                Education
                            </Text>
                        </View>
                        <Text variant='titleMedium' style={{ marginBottom: 10 }}>Please fill in the required(*) fields</Text>
                        <EducationLevelSelect
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleChange={handleChange('highestEducationalAttained')}
                            setLevel={setLevel}
                            setFieldValue={(highestEducationalAttained) => {
                                setFieldValue('highestEducationalAttained', highestEducationalAttained);
                            }}
                        />
                        <LastYearAttendedSelect
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleChange={handleChange('lastYearAttended')}
                            setFieldValue={(lastYearAttended) => {
                                setFieldValue('lastYearAttended', lastYearAttended);
                            }}
                        />
                        {parseInt(level) <= 5 && yearNow !== values.lastYearAttended && values.lastYearAttended &&
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
                            />
                        }

                        {errors.reasonForNotAttendingSchool && touched.reasonForNotAttendingSchool &&
                            <HelperText type='error' visible={errors.reasonForNotAttendingSchool}>
                                {errors.reasonForNotAttendingSchool}
                            </HelperText>
                        }
                        <View style={{ marginTop: 10, flexDirection: 'row' }}>
                            <Text variant='titleMedium' style={{ textAlign: 'justify' }}>By tapping submit you agree to our </Text><TouchableRipple onPress={() => props.navigation.navigate('Privacy Statement')}><Text variant='titleMedium' style={{ color: theme.colors.primary }}>privacy policy</Text></TouchableRipple>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Button
                                mode='text'
                                compact
                                icon='arrow-left'
                                style={{
                                    width: '30%',
                                    alignSelf: 'flex-end',
                                    padding: 5,
                                    borderRadius: 5,
                                    marginTop: 30,
                                    marginLeft: -10,
                                    backgroundColor: 'none'
                                }}
                                buttonColor="white"
                                labelStyle={{ fontSize: 20, marginLeft: 15 }}
                                onPress={props.prevStep}
                                disabled={isSubmitting}
                            >
                                Back
                            </Button>
                            <Button
                                mode='text'
                                compact
                                loading={isSubmitting}
                                disabled={!isValid || isSubmitting}
                                icon='check'
                                style={{
                                    width: '34%',
                                    alignSelf: 'flex-end',
                                    padding: 5,
                                    borderRadius: 5,
                                    marginTop: 30,
                                    backgroundColor: 'none'
                                }}
                                buttonColor="white"
                                contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'flex-start' }}
                                labelStyle={{ fontSize: 20, marginRight: 15 }}
                                onPress={submitForm}
                            >
                                Submit
                            </Button>
                        </View>
                    </View>
                )}
            </Formik>
        </View>
    )
}
