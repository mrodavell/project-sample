import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { View } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import BirthDatePicker from '@components/inputs/BirthDatePicker';
import GenericSelect from '@components/inputs/GenericSelect';

export default function DependentsForm(props) {

    let gradeLevels = [];
    let grade = "Kinder";
    for (let i = 0; i <= 12; i++) {
        if (i > 0) {
            grade = `Grade ${i}`;
        }

        gradeLevels.push(grade);
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Please specify dependents name'),
        relationship: Yup.string().required('Please specify dependents relationship'),
        birthdate: Yup.date().typeError("Invalid Birthdate").required('Please input your birthdate'),
        grade_level: Yup.string().required('Please specify dependents grade level'),
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
                initialValues={{ name: "", relationship: "", birthdate: "", grade_level: "" }}
                onSubmit={async (values) => {
                    await handleAdd(values);
                }}
                validationSchema={validationSchema}
            >
                {({ handleSubmit, handleChange, handleBlur, values, errors, touched, setTouched, setFieldValue, isSubmitting }) => (
                    <View>
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
                        <GenericSelect
                            selectTitle="Grade Level"
                            defaultBtnText="Grade Level *"
                            dataList={gradeLevels}
                            keyIndex="grade_level"
                            height={400}
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleChange={handleChange('grade_level')}
                            setFieldValue={(value) => {
                                setFieldValue('grade_level', value);
                            }}
                        />
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
