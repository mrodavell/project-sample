import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { View } from 'react-native';
import { TextInput, HelperText, Button } from 'react-native-paper';
import { useTheme, Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import RegionSelect from '@components/inputs/RegionSelect';
import ProvinceSelect from '@components/inputs/ProvinceSelect';
import CitySelect from '../inputs/CitySelect';
import BrgySelect from '../inputs/BrgySelect';

export default function AddressForm(props) {

    const theme = useTheme();

    const validationSchema = Yup.object().shape({
        region: Yup.string().required('Please select a region'),
        province: Yup.string().required('Please select a province'),
        zipcode: Yup.string().required('Please select a zipcode'),
        barangay: Yup.string().required('Please enter your barangay name'),
        street: Yup.string().required('Please enter your street or purok name'),
    })

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
                            <MaterialIcons name='edit-location' size={30} color={theme.colors.primary} />
                            <Text variant='headlineSmall' style={{ color: theme.colors.primary }}>
                                Address
                            </Text>
                        </View>
                        <Text variant='titleMedium' style={{ marginBottom: 10 }}>Please fill in the required(*) fields</Text>
                        <RegionSelect
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleChange={handleChange('region')}
                            setFieldValue={(region) => {
                                setFieldValue('region', region);
                            }}
                        />
                        <ProvinceSelect
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleChange={handleChange('province')}
                            setFieldValue={(province) => {
                                setFieldValue('province', province);
                            }}
                        />
                        {values.province &&
                            <CitySelect
                                values={values}
                                province={values.province}
                                errors={errors}
                                touched={touched}
                                handleChange={handleChange('zipcode')}
                                setCity={(city) => {
                                    setFieldValue('city', city)
                                }}
                                setFieldValue={(zipcode) => {
                                    setFieldValue('zipcode', zipcode);
                                }}
                            />
                        }
                        {values.zipcode &&
                            <BrgySelect
                                values={values}
                                zipcode={values.zipcode}
                                errors={errors}
                                touched={touched}
                                handleChange={handleChange('barangay')}
                                setBrgy={(brgy) => {
                                    setFieldValue('brgy', brgy)
                                }}
                                setFieldValue={(barangay) => {
                                    setFieldValue('barangay', barangay);
                                }}
                            />
                        }
                        <TextInput
                            label="Street / Purok / Block / Zone *"
                            values={values.street}
                            defaultValue={values.street}
                            mode="outlined"
                            left={<TextInput.Icon icon="home-map-marker" />}
                            style={{ marginTop: 10 }}
                            onBlur={handleBlur('street')}
                            onChangeText={handleChange('street')}
                            error={errors.street && touched.street}
                        />
                        {errors.street && touched.street &&
                            <HelperText type='error' visible={errors.street}>
                                {errors.street}
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
