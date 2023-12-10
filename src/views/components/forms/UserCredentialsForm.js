import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { View, Keyboard } from 'react-native';
import { Text, TextInput, useTheme, HelperText, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { authRepository } from '@repository';
import { alerts } from '@utils';

export default function UserCredentialsForm(props) {

    const theme = useTheme();
    const [showPassword, setShowPassword] = React.useState(false);
    const [showRePassword, setShowRePassword] = React.useState(false);

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Please enter your email'),
        password: Yup.string().min(6, 'Please enter minimum of 6 characters').required('Please enter your password'),
        password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Please confirm your password'),
    })

    return (
        <View>
            <Formik
                initialValues={{ ...props.regData }}
                validationSchema={validationSchema}
                validateOnBlur
                onSubmit={async (data) => {
                    let result = await authRepository.sendCode({ "email": data.email });
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
                            <MaterialIcons name='person' size={30} color={theme.colors.primary} />
                            <Text variant='headlineSmall' style={{ color: theme.colors.primary }}>
                                Account
                            </Text>
                        </View>
                        <Text variant='titleMedium' style={{ marginBottom: 10 }}>Please fill in the required(*) fields</Text>
                        <TextInput
                            label="Email *"
                            defaultValue={values.email}
                            values={values.email}
                            mode="outlined"
                            left={<TextInput.Icon icon="email" />}
                            error={errors.email && touched.email}
                            keyboardType="email-address"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            autoComplete='off'
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        {errors.email && touched.email &&
                            <HelperText type='error' visible={errors.email}>
                                {errors.email}
                            </HelperText>
                        }
                        <TextInput
                            secureTextEntry={!showPassword}
                            label="Password *"
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
                            mode='text'
                            compact
                            loading={isSubmitting}
                            disabled={!isValid}
                            icon='arrow-right'
                            style={{ width: '30%', alignSelf: 'flex-end', padding: 5, borderRadius: 5, marginTop: 30 }}
                            contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'flex-start' }}
                            labelStyle={{ fontSize: 20, marginRight: 15 }}
                            onPress={submitForm}
                        >
                            Next
                        </Button>
                    </View>
                )}
            </Formik>
        </View>
    )
}
