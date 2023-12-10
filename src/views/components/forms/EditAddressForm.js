import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ScrollView, View } from 'react-native';
import { TextInput, HelperText, Button } from 'react-native-paper';
import { useAuth } from 'context/authContext';
import { authRepository } from '@repository';
import { alerts, storage } from '@utils';

import RegionSelect from '@components/inputs/RegionSelect';
import ProvinceSelect from '@components/inputs/ProvinceSelect';
import CitySelect from '../inputs/CitySelect';
import BrgySelect from '../inputs/BrgySelect';

export default function EditAddressForm(props) {

    const { me, token, setMe } = useAuth();

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
                initialValues={{
                    ...me.address,
                    province: me.address?.zipcode?.province,
                    city: me.address?.zipcode?.area,
                    zipcode: me.address?.zipcode?.zipcode,
                    brgy: me.address?.barangay?.barangay,
                    barangay: me?.address?.barangay?.id.toString(),
                }}
                validationSchema={validationSchema}
                validateOnBlur
                onSubmit={async (data) => {

                    const newAddress = {
                        region: data?.region,
                        street: data?.street,
                        barangay_id: data?.barangay,
                        zipcode: data?.zipcode
                    }

                    let result = await authRepository.updateAddress(token.token, JSON.stringify(newAddress));

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
                                <RegionSelect
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    handleChange={handleChange('region')}
                                    setFieldValue={(region) => {
                                        setFieldValue('region', region);
                                    }}
                                    editable={props.isEdit}
                                />
                                <ProvinceSelect
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    handleChange={handleChange('province')}
                                    setFieldValue={(province) => {
                                        setFieldValue('province', province);
                                    }}
                                    editable={props.isEdit}
                                />
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
                                    editable={props.isEdit && props.isValueChange('province')}
                                />
                                {props.isEdit &&
                                    <HelperText type='info' visible>
                                        Editable when province is changed
                                    </HelperText>
                                }
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
                                    editable={props.isEdit && props.isValueChange('zipcode') && props.isValueChange('province')}
                                />
                                {props.isEdit &&
                                    <HelperText type='info' visible>
                                        Editable when city is changed
                                    </HelperText>
                                }
                                <TextInput
                                    label="Street / Purok / Block *"
                                    values={values.street}
                                    defaultValue={values.street}
                                    mode="outlined"
                                    left={<TextInput.Icon icon="home-map-marker" />}
                                    style={{ marginTop: 10 }}
                                    onBlur={handleBlur('street')}
                                    onChangeText={handleChange('street')}
                                    error={errors.street && touched.street}
                                    editable={props.isEdit}
                                />
                                {errors.street && touched.street &&
                                    <HelperText type='error' visible={errors.street}>
                                        {errors.street}
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
