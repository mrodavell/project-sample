import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { View } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import BirthDatePicker from '@components/inputs/BirthDatePicker';
import GenericSelect from '@components/inputs/GenericSelect';

export default function DependentsForm(props) {

    const educationLevel = [
        "Elementary Level",
        "Elementary Graduate",
        "Alternative Learning System",
        "Open High School Program",
        "Junior High School Level",
        "Junior High School Graduate",
        "Senior High School Level",
        "Senior High School Graduate",
        "College Level",
        "College Graduate",
        "TESDA Graduate",
    ];

    const validationSchema = Yup.object().shape({
        eccd: Yup.string().nullable(),
        name: Yup.string().required('Please specify dependents name'),
        relationship: Yup.string().required('Please specify dependents relationship'),
        birthdate: Yup.date().typeError("Invalid Birthdate").required('Please input your birthdate'),
        highestEducationalAttainment: Yup.string().required('Please specify dependents education level'),
        occupation: Yup.string().required('Please specify occupation'),
        monthlyIncome: Yup.number().required('Please specify monthly income'),
    })

    const handleAdd = async (data) => {
        if (props.add) {
            props.add(data);
            props.cancel();
        }
    }

    return (
        <View>
            <Formik
                initialValues={{
                    name: "",
                    relationship: "",
                    birthdate: "",
                    highestEducationalAttainment: "",
                    occupation: "",
                    monthlyIncome: "",
                    eccd: "",
                }}
                onSubmit={async (values) => {
                    await handleAdd(values);
                }}
                validationSchema={validationSchema}
            >
                {({ handleSubmit, handleChange, handleBlur, values, errors, touched, setTouched, setFieldValue, isSubmitting }) => (
                    <View>
                        <TextInput
                            label="ECCD (Optional)"
                            defaultValue={values.eccd}
                            values={values.eccd}
                            mode="outlined"
                            left={<TextInput.Icon icon="account-key" />}
                            error={errors.eccd && touched.eccd}
                            onFocus={() => setTouched({ "eccd": true }, false)}
                            onChangeText={handleChange('eccd')}
                            onBlur={handleBlur('eccd')}
                        />
                        <TextInput
                            label="Full name"
                            defaultValue={values.name}
                            values={values.name}
                            mode="outlined"
                            left={<TextInput.Icon icon="account" />}
                            error={errors.name && touched.name}
                            onFocus={() => setTouched({ "name": true }, false)}
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            style={{ marginTop: 10 }}
                        />
                        {errors.name && touched.name &&
                            <HelperText type='error' visible={errors.name}>
                                {errors.name}
                            </HelperText>
                        }
                        <TextInput
                            label="Relationship"
                            defaultValue={values.relationship}
                            values={values.relationship}
                            mode="outlined"
                            left={<TextInput.Icon icon="account" />}
                            error={errors.relationship && touched.relationship}
                            onFocus={() => setTouched({ "relationship": true }, false)}
                            onChangeText={handleChange('relationship')}
                            onBlur={handleBlur('relationship')}
                            style={{ marginTop: 10 }}
                        />
                        {errors.relationship && touched.relationship &&
                            <HelperText type='error' visible={errors.relationship}>
                                {errors.relationship}
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
                        <TextInput
                            label="Occupation"
                            defaultValue={values.occupation}
                            values={values.occupation}
                            mode="outlined"
                            left={<TextInput.Icon icon="account" />}
                            error={errors.occupation && touched.occupation}
                            onFocus={() => setTouched({ "occupation": true }, false)}
                            onChangeText={handleChange('occupation')}
                            onBlur={handleBlur('occupation')}
                            style={{ marginTop: 10 }}
                        />
                        {errors.occupation && touched.occupation &&
                            <HelperText type='error' visible={errors.occupation}>
                                {errors.occupation}
                            </HelperText>
                        }
                        <GenericSelect
                            selectTitle="Educational Attainment"
                            defaultBtnText="Educational Attainment *"
                            dataList={educationLevel}
                            keyIndex="highestEducationalAttainment"
                            height={400}
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleChange={handleChange('highestEducationalAttainment')}
                            setFieldValue={(value) => {
                                setFieldValue('highestEducationalAttainment', value);
                            }}
                        />
                        <TextInput
                            label="Monthly Income *"
                            keyboardType='decimal-pad'
                            values={values.monthlyIncome}
                            defaultValue={values.monthlyIncome}
                            mode="outlined"
                            left={<TextInput.Icon icon="format-list-checks" />}
                            style={{ marginTop: 10 }}
                            onBlur={handleBlur('monthlyIncome')}
                            onChangeText={handleChange('monthlyIncome')}
                            error={errors.monthlyIncome && touched.monthlyIncome}
                        />
                        {errors.monthlyIncome && touched.monthlyIncome &&
                            <HelperText type='error' visible={errors.monthlyIncome}>
                                {errors.monthlyIncome}
                            </HelperText>
                        }
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 }}>
                            <Button loading={isSubmitting} onPress={handleSubmit} mode="contained" style={{ borderRadius: 5 }} contentStyle={{ minWidth: 100 }}>Add</Button>
                            <Button disabled={isSubmitting} onPress={props.cancel} mode="contained-tonal" style={{ borderRadius: 5, marginLeft: 5 }} contentStyle={{ minWidth: 100 }}>Cancel</Button>
                        </View>
                    </View>
                )}
            </Formik>
        </View>
    )
}
