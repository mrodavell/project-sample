import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { View } from 'react-native';
import { Text, TextInput, HelperText, useTheme, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { authRepository } from '@repository';
import { alerts } from '@utils';

export default function VerificationCodeForm(props) {


    const theme = useTheme();

    const validationSchema = Yup.object().shape({
        code: Yup.string().required('Please enter the verification code'),
    })

    return (
        <View>
            <Formik
                initialValues={{ ...props.regData }}
                validationSchema={validationSchema}
                validateOnBlur
                onSubmit={async (data) => {
                    let result = await authRepository.verify({ "email": data.email, "code": data.code });
                    if (!result.error) {
                        props.submitData(data)
                    } else {
                        alerts.error({ message: result.message });
                    }
                }}
            >
                {({ handleChange, handleBlur, submitForm, values, errors, touched, isValid, isSubmitting }) => (
                    <View style={{ marginBottom: 20 }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <MaterialIcons name='qr-code' size={30} color={theme.colors.primary} />
                            <Text variant='headlineSmall' style={{ color: theme.colors.primary }}>
                                Verification Code
                            </Text>
                        </View>
                        <Text variant='titleMedium'>We've sent a verification code on your email.</Text>
                        <TextInput
                            label="Verification Code"
                            defaultValue={values.code}
                            values={values.code}
                            mode="outlined"
                            left={<TextInput.Icon icon="shield-check" />}
                            style={{ marginTop: 10 }}
                            onBlur={handleBlur('code')}
                            onChangeText={handleChange('code')}
                            error={errors.code && touched.code}
                        />
                        {errors.code && touched.code &&
                            <HelperText type='error' visible={errors.code}>
                                {errors.code}
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
