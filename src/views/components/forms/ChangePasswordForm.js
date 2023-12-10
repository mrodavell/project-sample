import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { View, Keyboard } from 'react-native';
import { TextInput, HelperText, Button } from 'react-native-paper';
import { authRepository } from '@repository';
import { alerts } from '@utils';

export default function ChangePasswordForm(props) {

    const [showPassword, setShowPassword] = React.useState(false);
    const [showRePassword, setShowRePassword] = React.useState(false);

    const validationSchema = Yup.object().shape({
        password: Yup.string().min(6, 'Please enter minimum of 6 characters').required('Please enter your password'),
        password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Please confirm your password'),
    })

    return (
        <View>
            <Formik
                initialValues={{ password: '', password_confirmation: '' }}
                validationSchema={validationSchema}
                validateOnBlur
                onSubmit={async (data) => {
                    let result = await authRepository.resetPassword(JSON.stringify(data));
                    if (!result.error) {
                        props.submitData(data)
                    } else {
                        alerts.error({ message: result.message });
                    }
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, isSubmitting }) => (
                    <View style={{ marginBottom: 20, padding: 10 }}>
                        <TextInput
                            secureTextEntry={!showPassword}
                            label="New Password *"
                            defaultValue={values.password}
                            values={values.password}
                            mode="outlined"
                            left={<TextInput.Icon icon="lock" />}
                            right={
                                <TextInput.Icon
                                    icon={showPassword ? "eye" : "eye-off"}
                                    onPress={() => {
                                        Keyboard.dismiss;
                                        setShowPassword(!showPassword);
                                    }} />
                            }
                            style={{ marginTop: 5 }}
                            error={errors.password && touched.password}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            autoComplete='off'
                        />
                        {errors.password && touched.password &&
                            <HelperText type='error' visible={errors.password}>
                                {errors.password}
                            </HelperText>
                        }
                        <TextInput
                            secureTextEntry={!showRePassword}
                            label="Confirm Password *"
                            defaultValue={values.password_confirmation}
                            values={values.password_confirmation}
                            mode="outlined"
                            left={<TextInput.Icon icon="lock" />}
                            right={
                                <TextInput.Icon
                                    icon={showRePassword ? "eye" : "eye-off"}
                                    onPress={() => {
                                        Keyboard.dismiss;
                                        setShowRePassword(!showRePassword);
                                    }} />
                            }
                            style={{ marginTop: 5 }}
                            error={errors.password_confirmation && touched.password_confirmation}
                            onChangeText={handleChange('password_confirmation')}
                            onBlur={handleBlur('password_confirmation')}
                            autoComplete='off'
                        />
                        {errors.password_confirmation && touched.password_confirmation &&
                            <HelperText type='error' visible={errors.password_confirmation}>
                                {errors.password_confirmation}
                            </HelperText>
                        }

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
                    </View>
                )}
            </Formik>
        </View>
    )
}
