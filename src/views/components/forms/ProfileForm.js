import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { View } from 'react-native';
import { TextInput, HelperText, Button } from 'react-native-paper';
import { useTheme, Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import BirthDatePicker from '@components/inputs/BirthDatePicker';
import GenderSelect from '@components/inputs/GenderSelect';
import CivilStatusSelect from '../inputs/CivilStatusSelect';


export default function ProfileForm(props) {

    const theme = useTheme();

    const validationSchema = Yup.object().shape({
        first_name: Yup.string().required('Please enter your first name'),
        last_name: Yup.string().required('Please enter your last name'),
        middle_name: Yup.string().nullable(),
        suffix: Yup.string().nullable(),
        birthplace: Yup.string().required('Please enter your birthplace'),
        birthdate: Yup.date().typeError("Invalid Birthdate").required('Please input your birthdate'),
        gender: Yup.string().required('Please select a gender'),
        civil_status: Yup.string().required('Please select a civil status'),
        contact_number: Yup.number().required('Please enter your contact number'),
        religion: Yup.string().required('Please enter your religion'),
    });

    return (
        <View>
            <Formik
                initialValues={{ ...props.regData }}
                validationSchema={validationSchema}
                onSubmit={(data) => props.submitData(data)}
                validateOnBlur
            >
                {({ handleChange, handleBlur, submitForm, setFieldValue, values, errors, touched, isValid, isSubmitting }) => (
                    <View style={{ marginBottom: 20 }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <MaterialIcons name='person' size={30} color={theme.colors.primary} />
                            <Text variant='headlineSmall' style={{ color: theme.colors.primary }}>
                                Profile
                            </Text>
                        </View>
                        <Text variant='titleMedium' style={{ marginBottom: 10 }}>Please fill in the required(*) fields</Text>
                        <TextInput
                            label="First Name *"
                            values={values.first_name}
                            defaultValue={values.first_name}
                            mode="outlined"
                            left={<TextInput.Icon icon="account" />}
                            style={{ marginTop: 10 }}
                            onBlur={handleBlur('first_name')}
                            onChangeText={handleChange('first_name')}
                            error={errors.first_name && touched.first_name}
                            autoCapitalize="words"
                        />
                        {errors.first_name && touched.first_name &&
                            <HelperText type='error' visible={errors.first_name}>
                                {errors.first_name}
                            </HelperText>
                        }
                        <TextInput
                            label="Last Name *"
                            values={values.last_name}
                            defaultValue={values.last_name}
                            mode="outlined"
                            left={<TextInput.Icon icon="account" />}
                            style={{ marginTop: 10 }}
                            onBlur={handleBlur('last_name')}
                            onChangeText={handleChange('last_name')}
                            error={errors.last_name && touched.last_name}
                            autoCapitalize="words"
                        />
                        {errors.last_name && touched.last_name &&
                            <HelperText type='error' visible={errors.last_name}>
                                {errors.last_name}
                            </HelperText>
                        }
                        <TextInput
                            label="Middle Name"
                            values={values.middle_name}
                            defaultValue={values.middle_name}
                            mode="outlined"
                            left={<TextInput.Icon icon="account" />}
                            style={{ marginTop: 10 }}
                            onBlur={handleBlur('middle_name')}
                            onChangeText={handleChange('middle_name')}
                            error={errors.middle_name && touched.middle_name}
                            autoCapitalize="words"
                        />
                        {errors.middle_name && touched.middle_name &&
                            <HelperText type='error' visible={errors.middle_name}>
                                {errors.middle_name}
                            </HelperText>
                        }
                        <TextInput
                            label="Suffix (e.g Jr., Sr., III)"
                            values={values.nameSuffix}
                            defaultValue={values.nameSuffix}
                            mode="outlined"
                            left={<TextInput.Icon icon="account" />}
                            style={{ marginTop: 10 }}
                            onBlur={handleBlur('nameSuffix')}
                            onChangeText={handleChange('nameSuffix')}
                            error={errors.nameSuffix && touched.nameSuffix}
                            autoCapitalize="words"
                        />
                        {errors.nameSuffix && touched.nameSuffix &&
                            <HelperText type='error' visible={errors.nameSuffix}>
                                {errors.nameSuffix}
                            </HelperText>
                        }
                        <GenderSelect
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleChange={handleChange('gender')}
                            setFieldValue={(gender) => {
                                setFieldValue('gender', gender);
                            }}
                        />
                        <TextInput
                            label="Birthplace *"
                            values={values.birthplace}
                            defaultValue={values.birthplace}
                            mode="outlined"
                            left={<TextInput.Icon icon="account" />}
                            style={{ marginTop: 10 }}
                            onBlur={handleBlur('birthplace')}
                            onChangeText={handleChange('birthplace')}
                            error={errors.birthplace && touched.birthplace}
                            autoCapitalize="words"
                        />
                        {errors.birthplace && touched.birthplace &&
                            <HelperText type='error' visible={errors.birthplace}>
                                {errors.birthplace}
                            </HelperText>
                        }
                        <BirthDatePicker
                            values={values}
                            touched={touched}
                            handleChange={handleChange('birthdate')}
                            setFieldValue={(bdate) => {
                                setFieldValue('birthdate', bdate);
                            }}
                            errors={errors.birthdate && touched.birthdate}
                            handleDate={(value) => updateField({ key: "birthdate", value })}
                        />
                        {errors.birthdate && touched.birthdate &&
                            <HelperText type='error' visible={errors.birthdate}>
                                {errors.birthdate}
                            </HelperText>
                        }
                        <CivilStatusSelect
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleChange={handleChange('civil_status')}
                            setFieldValue={(status) => {
                                setFieldValue('civil_status', status);
                            }}
                        />
                        <TextInput
                            label="Contact Number *"
                            values={values.contact_number}
                            defaultValue={values.contact_number}
                            keyboardType="phone-pad"
                            mode="outlined"
                            left={<TextInput.Icon icon="account" />}
                            style={{ marginTop: 10 }}
                            onBlur={handleBlur('contact_number')}
                            onChangeText={handleChange('contact_number')}
                            error={errors.contact_number && touched.contact_number}
                        />
                        {errors.contact_number && touched.contact_number &&
                            <HelperText type='error' visible={errors.contact_number}>
                                {errors.contact_number}
                            </HelperText>
                        }
                        <TextInput
                            label="Religion *"
                            values={values.religion}
                            defaultValue={values.religion}
                            mode="outlined"
                            left={<TextInput.Icon icon="church" />}
                            style={{ marginTop: 10 }}
                            onBlur={handleBlur('religion')}
                            onChangeText={handleChange('religion')}
                            error={errors.religion && touched.religion}
                        />
                        {errors.religion && touched.religion &&
                            <HelperText type='error' visible={errors.religion}>
                                {errors.religion}
                            </HelperText>
                        }
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
                                disabled={!isValid}
                                icon='arrow-right'
                                style={{
                                    width: '30%',
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
                                Next
                            </Button>
                        </View>
                    </View>
                )}
            </Formik>
        </View>
    )
}
