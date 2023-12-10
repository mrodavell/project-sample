import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ScrollView, View } from 'react-native';
import { TextInput, HelperText, Button } from 'react-native-paper';
import { useAuth } from 'context/authContext';
import { authRepository } from 'repository';
import { alerts, storage } from 'utils';

import BirthDatePicker from '@components/inputs/BirthDatePicker';
import GenderSelect from '@components/inputs/GenderSelect';
import CivilStatusSelect from '../inputs/CivilStatusSelect';



export default function EditProfileForm(props) {

    const { me, token, setMe } = useAuth();

    const validationSchema = Yup.object().shape({
        first_name: Yup.string().required('Please enter your first name'),
        last_name: Yup.string().required('Please enter your last name'),
        middle_name: Yup.string().nullable(),
        suffix: Yup.string().nullable(),
        birthplace: Yup.string().required('Please enter your birthplace'),
        birthdate: Yup.date().typeError("Invalid Birthdate").required('Please input your birthdate'),
        gender: Yup.string().required('Please select a gender'),
        civil_status: Yup.string().required('Please select a civil status'),
        contact_no: Yup.number().required('Please enter your contact number'),
        religion: Yup.string().required('Please enter your religion'),
    });

    return (
        <Formik
            initialValues={{ ...me }}
            validateOnMount
            validationSchema={validationSchema}
            onSubmit={async (data) => {
                let result = await authRepository.updateProfile(token.token, JSON.stringify(data));
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
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched, isValid, isSubmitting }) => (
                <ScrollView>
                    <View style={{ marginBottom: 20, padding: 10 }}>
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
                            editable={props.isEdit}
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
                            editable={props.isEdit}
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
                            editable={props.isEdit}
                        />
                        {errors.middle_name && touched.middle_name &&
                            <HelperText type='error' visible={errors.middle_name}>
                                {errors.middle_name}
                            </HelperText>
                        }
                        <TextInput
                            label="Suffix (e.g Jr., Sr., III)"
                            values={values.suffix}
                            defaultValue={values.suffix}
                            mode="outlined"
                            left={<TextInput.Icon icon="account" />}
                            style={{ marginTop: 10 }}
                            onBlur={handleBlur('suffix')}
                            onChangeText={handleChange('suffix')}
                            error={errors.suffix && touched.suffix}
                            autoCapitalize="words"
                            editable={props.isEdit}
                        />
                        {errors.suffix && touched.suffix &&
                            <HelperText type='error' visible={errors.suffix}>
                                {errors.suffix}
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
                            editable={!props.isEdit}
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
                            editable={props.isEdit}
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
                            editable={props.isEdit}
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
                            editable={!props.isEdit}
                        />
                        <TextInput
                            label="Contact Number *"
                            values={values.contact_no}
                            defaultValue={values.contact_no}
                            keyboardType="phone-pad"
                            mode="outlined"
                            left={<TextInput.Icon icon="account" />}
                            style={{ marginTop: 10 }}
                            onBlur={handleBlur('contact_no')}
                            onChangeText={handleChange('contact_no')}
                            error={errors.contact_no && touched.contact_no}
                            editable={props.isEdit}
                        />
                        {errors.contact_no && touched.contact_no &&
                            <HelperText type='error' visible={errors.contact_no}>
                                {errors.contact_no}
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
                            editable={props.isEdit}
                        />
                        {errors.religion && touched.religion &&
                            <HelperText type='error' visible={errors.religion}>
                                {errors.religion}
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
            )}
        </Formik>
    )
}
