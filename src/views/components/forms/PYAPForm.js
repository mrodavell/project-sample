import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { ScrollView, View } from 'react-native';
import { TextInput, HelperText, Button, Text, Divider } from 'react-native-paper';
import { agencyRepository } from 'repository/agencyRepository';
import { alerts } from 'utils';
import GenericSelect from '../inputs/GenericSelect';
import { useAuth } from 'context/authContext';
import CoursesList from '../list/CoursesList';
import WorkExperienceList from '../list/WorkExperienceList';
import WorkExperienceDialog from '../dialogs/WorkExperienceDialog';

export default function PYAPForm({ navigation, route }) {

    const { agency_id } = route.params;
    const { token } = useAuth();
    const [showWorkExpDialog, setShowWorkExpDialog] = React.useState(false);

    const kindofyouth = [
        "Out of school youth",
        "In school youth",
        "Working youth",
        "Working student youth",
        "College level",
        "College graduate",
        'Others'
    ];

    const minYears = parseInt(moment().subtract(31, 'years').format('YYYY'));
    const maxYears = parseInt(moment().format('YYYY'));

    let yearAttended = [];
    for (let i = maxYears; i >= minYears; i--) {
        yearAttended.push(i.toString());
    }

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
        kind_of_youth: Yup.string().required("Please select youth type"),
        number_of_siblings: Yup.number().required('Please specify numebr of siblings'),
        fathers_name: Yup.string().required('Please father fullname'),
        fathers_occupation: Yup.string().required('Please father occupation'),
        mothers_name: Yup.string().required('Please mother fullname'),
        mothers_occupation: Yup.string().required('Please mother occupation'),
        reason_for_stopping_school: Yup.string().when('kind_of_youth', {
            is: (kind_of_youth) => kind_of_youth === kindofyouth[0],
            then: Yup.string().required('Please specify reasons'),
        }),
        isInterested_in_tech_voc_training: Yup.number().required("Please select if interested in TechVoc courses"),
        highest_educational_attainment: Yup.string().required("Please select education level"),
        year_lastAttended_or_graduated: Yup.string().required("Please select last year attended/graduated"),
        pyap_programs: Yup.array().when('isInterested_in_tech_voc_training', {
            is: (interested) => interested === 1,
            then: Yup.array().min(3, "Please specify your options"),
        }),
    });

    const submitData = async (data) => {
        let result = await agencyRepository.submitPYAPData(token.token, JSON.stringify(data));
        if (!result.error) {
            navigation.popToTop();
        } else {
            alerts.error({ message: result.message });
        }
    }

    return (
        <Formik
            initialValues={{
                agency_id: agency_id,
                kind_of_youth: "",
                number_of_siblings: "",
                fathers_name: "",
                fathers_occupation: "",
                mothers_name: "",
                mothers_occupation: "",
                reason_for_stopping_school: "",
                isInterested_in_tech_voc_training: "",
                highest_educational_attainment: "",
                year_lastAttended_or_graduated: "",
                pyap_programs: [],
                work_experiences: []
            }}
            validationSchema={validationSchema}
            onSubmit={(data) => submitData(data)}
        >
            {({ handleChange, handleSubmit, handleBlur, setFieldValue, values, errors, touched, isValid, isSubmitting }) => {

                return (
                    <View>
                        <Text variant='titleMedium' style={{ marginLeft: 10, marginVertical: 10, alignSelf: 'center' }}>Please fill in the required (<Text style={{ color: 'tomato' }}>*</Text>) fields</Text>
                        <ScrollView>
                            <View style={{ marginBottom: 120, padding: 10 }}>
                                <GenericSelect
                                    selectTitle="What type of youth are you?"
                                    defaultBtnText="Type of Youth *"
                                    dataList={kindofyouth}
                                    keyIndex="kind_of_youth"
                                    height={420}
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    handleChange={handleChange('kind_of_youth')}
                                    setFieldValue={(value) => {
                                        setFieldValue('kind_of_youth', value);
                                    }}
                                />
                                {values.kind_of_youth === kindofyouth[0] &&
                                    <>
                                        <TextInput
                                            label="Please specify your reason"
                                            values={values.reason_for_stopping_school}
                                            defaultValue={values.reason_for_stopping_school}
                                            mode="outlined"
                                            left={<TextInput.Icon icon="format-list-checks" />}
                                            style={{ marginTop: 10 }}
                                            onBlur={handleBlur('reason_for_stopping_school')}
                                            onChangeText={handleChange('reason_for_stopping_school')}
                                            error={errors.reason_for_stopping_school && touched.reason_for_stopping_school}
                                        />
                                        {errors.reason_for_stopping_school && touched.reason_for_stopping_school &&
                                            <HelperText type='error' visible={errors.reason_for_stopping_school}>
                                                {errors.reason_for_stopping_school}
                                            </HelperText>
                                        }
                                    </>
                                }
                                <GenericSelect
                                    selectTitle="What is your highest education attainment?"
                                    defaultBtnText="Highest educational attainment *"
                                    dataList={educationLevel}
                                    keyIndex="highest_educational_attainment"
                                    height={420}
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    handleChange={handleChange('highest_educational_attainment')}
                                    setFieldValue={(value) => {
                                        setFieldValue('highest_educational_attainment', value);
                                    }}
                                />
                                <GenericSelect
                                    selectTitle="Last year you attended/graduated school"
                                    defaultBtnText="Year Attended *"
                                    dataList={yearAttended}
                                    keyIndex="year_lastAttended_or_graduated"
                                    height={400}
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    handleChange={handleChange('year_lastAttended_or_graduated')}
                                    setFieldValue={(value) => {
                                        setFieldValue('year_lastAttended_or_graduated', value);
                                    }}
                                />
                                <TextInput
                                    label="Father's Name *"
                                    values={values.fathers_name}
                                    defaultValue={values.fathers_name}
                                    mode="outlined"
                                    left={<TextInput.Icon icon="format-list-checks" />}
                                    style={{ marginTop: 10 }}
                                    onBlur={handleBlur('fathers_name')}
                                    onChangeText={handleChange('fathers_name')}
                                    error={errors.fathers_name && touched.fathers_name}
                                />
                                {errors.fathers_name && touched.fathers_name &&
                                    <HelperText type='error' visible={errors.fathers_name}>
                                        {errors.fathers_name}
                                    </HelperText>
                                }
                                <TextInput
                                    label="Father's Occupation *"
                                    values={values.fathers_occupation}
                                    defaultValue={values.fathers_occupation}
                                    mode="outlined"
                                    left={<TextInput.Icon icon="format-list-checks" />}
                                    style={{ marginTop: 10 }}
                                    onBlur={handleBlur('fathers_occupation')}
                                    onChangeText={handleChange('fathers_occupation')}
                                    error={errors.fathers_occupation && touched.fathers_occupation}
                                />
                                {errors.fathers_occupation && touched.fathers_occupation &&
                                    <HelperText type='error' visible={errors.fathers_occupation}>
                                        {errors.fathers_occupation}
                                    </HelperText>
                                }
                                <TextInput
                                    label="Mother's Name *"
                                    values={values.mothers_name}
                                    defaultValue={values.mothers_name}
                                    mode="outlined"
                                    left={<TextInput.Icon icon="format-list-checks" />}
                                    style={{ marginTop: 10 }}
                                    onBlur={handleBlur('mothers_name')}
                                    onChangeText={handleChange('mothers_name')}
                                    error={errors.mothers_name && touched.mothers_name}
                                />
                                {errors.mothers_name && touched.mothers_name &&
                                    <HelperText type='error' visible={errors.mothers_name}>
                                        {errors.mothers_name}
                                    </HelperText>
                                }
                                <TextInput
                                    label="Mother's Occupation *"
                                    values={values.mothers_occupation}
                                    defaultValue={values.mothers_occupation}
                                    mode="outlined"
                                    left={<TextInput.Icon icon="format-list-checks" />}
                                    style={{ marginTop: 10 }}
                                    onBlur={handleBlur('mothers_occupation')}
                                    onChangeText={handleChange('mothers_occupation')}
                                    error={errors.mothers_occupation && touched.mothers_occupation}
                                />
                                {errors.mothers_occupation && touched.mothers_occupation &&
                                    <HelperText type='error' visible={errors.mothers_occupation}>
                                        {errors.mothers_occupation}
                                    </HelperText>
                                }
                                <TextInput
                                    label="Number of siblings *"
                                    values={values.number_of_siblings}
                                    defaultValue={values.number_of_siblings}
                                    keyboardType='decimal-pad'
                                    mode="outlined"
                                    left={<TextInput.Icon icon="format-list-checks" />}
                                    style={{ marginTop: 10 }}
                                    onBlur={handleBlur('number_of_siblings')}
                                    onChangeText={handleChange('number_of_siblings')}
                                    error={errors.number_of_siblings && touched.number_of_siblings}
                                />
                                {errors.number_of_siblings && touched.number_of_siblings &&
                                    <HelperText type='error' visible={errors.number_of_siblings}>
                                        {errors.number_of_siblings}
                                    </HelperText>
                                }
                                <GenericSelect
                                    selectTitle="Are you interested in TechVoc Training?"
                                    defaultBtnText="Interested in TechVoc Training? *"
                                    dataList={["Yes", "No"]}
                                    keyIndex="isInterested_in_tech_voc_training"
                                    height={185}
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    handleChange={handleChange('isInterested_in_tech_voc_training')}
                                    setFieldValue={(value) => {
                                        if (value != "") {
                                            setFieldValue('isInterested_in_tech_voc_training', (value === "Yes" ? 1 : 0));
                                        }
                                    }}
                                />
                                {values.isInterested_in_tech_voc_training === 1 &&
                                    <CoursesList courseSelected={values.pyap_programs} handleUpdate={(newData) => {
                                        setFieldValue('pyap_programs', newData);
                                    }} />
                                }
                                <Text variant='titleMedium' style={{ textAlign: 'justify', alignSelf: "flex-start", marginTop: 25, fontWeight: 'bold' }}>
                                    Work Experience
                                </Text>
                                <Divider style={{ marginVertical: 10 }} />
                                <WorkExperienceList workExperience={values.work_experiences} setWorkExperience={(workExp) => setFieldValue('work_experiences', workExp)} />
                                <Button onPress={() => setShowWorkExpDialog(true)} mode='contained-tonal' icon="briefcase-plus" style={{ borderRadius: 5, marginTop: 10 }} contentStyle={{ flexDirection: 'row-reverse' }}>Add Work Experience</Button>
                                <WorkExperienceDialog show={showWorkExpDialog} add={(data) => {
                                    let prevValues = [...values.work_experiences];
                                    let isExist = prevValues.filter(filterData => {
                                        return filterData.company === data.company;
                                    })

                                    if (isExist.length > 0) {
                                        alerts.info({ message: "Data already added" });
                                        return null;
                                    }

                                    prevValues.push(data);
                                    setFieldValue('work_experiences', prevValues);

                                }} cancel={() => setShowWorkExpDialog(!setShowWorkExpDialog)}
                                />
                                <Button
                                    mode='contained'
                                    compact
                                    icon="content-save"
                                    contentStyle={{ flexDirection: 'row-reverse' }}
                                    disabled={touched && (!isValid || isSubmitting)}
                                    loading={isSubmitting}
                                    style={{
                                        padding: 5,
                                        borderRadius: 5,
                                        marginTop: 25,
                                    }}
                                    labelStyle={{ fontSize: 20, marginRight: 25 }}
                                    onPress={handleSubmit}
                                >
                                    Save
                                </Button>

                            </View>
                        </ScrollView>
                    </View>
                )
            }}
        </Formik>
    )
}
