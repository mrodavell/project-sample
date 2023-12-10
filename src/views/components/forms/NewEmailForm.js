import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { View } from 'react-native';
import { Text, TextInput, useTheme, HelperText, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { authRepository } from '@repository';
import { alerts } from '@utils';

export default function NewEmailForm(props) {

    const theme = useTheme();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Please enter your email')
    })

    return (
        <View>
            <Formik
                initialValues={{ ...props.newEmailData }}
                validationSchema={validationSchema}
                validateOnBlur
                onSubmit={async (data) => {
                    let result = await authRepository.sendCode(JSON.stringify(data));
                    if (!result.error) {
                        props.submitData(data)
                    } else {
                        alerts.error({ message: result.message });
                    }
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, isSubmitting }) => (
                    <View style={{ marginBottom: 20 }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <MaterialIcons name='email' size={30} color={theme.colors.primary} />
                            <Text variant='headlineSmall' style={{ color: theme.colors.primary }}>
                                New Email
                            </Text>
                        </View>
                        <Text variant='bodyLarge' style={{ marginBottom: 10 }}>Please enter your new email</Text>
                        <TextInput
                            label="Email"
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
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Button
                                mode='text'
                                compact
                                loading={isSubmitting}
                                disabled={!isValid || isSubmitting}
                                icon='arrow-right'
                                style={{ width: '32%', alignSelf: 'flex-end', padding: 5, borderRadius: 5, marginTop: 30 }}
                                contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'flex-start' }}
                                labelStyle={{ fontSize: 20, marginRight: 15 }}
                                onPress={handleSubmit}
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
