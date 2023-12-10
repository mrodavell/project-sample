import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { ScrollView, View } from 'react-native';
import { TextInput, HelperText, Button, Text, Divider, Checkbox, TouchableRipple } from 'react-native-paper';
import { agencyRepository } from 'repository/agencyRepository';
import { alerts } from 'utils';
import GenericSelect from '../inputs/GenericSelect';
import { useAuth } from 'context/authContext';
import DependentsList from '../list/DependentsList';
import FamilyMemberList from '../list/FamilyMemberList';
import DependentsDialog from '../dialogs/DependentsDialog';
import FamilyMembersDialog from '../dialogs/FamilyMembersDialog';

export default function CSWDForm({ navigation, route }) {

    const { agency_id } = route.params;
    const { token } = useAuth();
    const [isStart, setIsStart] = React.useState(true);
    const [isOtherCircumstance, setIsOtherCircumstance] = React.useState(false);
    const [isOtherOccupancy, setIsOtherOccupancy] = React.useState(false);
    const [showDependentsForm, setShowDependentsForm] = React.useState(false);
    const [showFamilyForm, setShowFamilyForm] = React.useState(false);
    const minYears = parseInt(moment().subtract(31, 'years').format('YYYY'));
    const maxYears = parseInt(moment().format('YYYY'));

    let yearAttended = [];
    for (let i = maxYears; i >= minYears; i--) {
        yearAttended.push(i.toString());
    }

    let lastGradeLevelAttended = [];
    let grade = "Kinder";
    for (let i = 0; i <= 12; i++) {
        if (i > 0) {
            grade = `Grade ${i}`;
        }

        lastGradeLevelAttended.push(grade);
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

    const circumstances = [
        "Unwed",
        "Widow",
        "Separated",
        "Widower",
        "Others"
    ];

    const typeOfOccupancy = [
        "Own house",
        "Living with parents",
        "Renter",
        "Living with relative",
        "Informal settler (Squatters area)",
        "Others"
    ];

    const purpose = [
        "Educational Assistance",
        "Financial Assistance",
        "SPL",
        "Employment Referral",
        "Livelihood Assistance",
        "Other",
    ];

    const membership = [
        "SSS",
        "GSIS",
        "PhilHealth",
        "Pag-ibig",
        "4Ps"
    ];


    const validationSchema = Yup.object().shape({
        id_no: Yup.string().nullable(),
        undergo_daycare: Yup.number().required('Please identify if you sent your child was sent to daycare'),
        highest_educational_attainment: Yup.string().required('Please select your highest educational attainment'),
        skill_training: Yup.string().nullable(),
        certifications: Yup.string().nullable(),
        isWithJob: Yup.number().required("Please select job status"),
        occupation: Yup.string().when('isWithJob', {
            is: (isWithJob) => isWithJob === 1,
            then: Yup.string().required('Please specify occupation')
        }),
        employer: Yup.string().when('isWithJob', {
            is: (isWithJob) => isWithJob === 1,
            then: Yup.string().required('Please specify employer')
        }),
        monthly_income: Yup.number().when('isWithJob', {
            is: (isWithJob) => isWithJob === 1,
            then: Yup.number().required('Please specify monthly income')
        }),
        total_monthly_family_income: Yup.number().required('Please specify family monthly income'),
        contact_no: Yup.number().required("Please include your contact number"),
        facebook_account: Yup.string().required("Please specify your facebook username"),
        circumstances_being_soloParent: Yup.string().required('Please select your circumstances as a solo parent'),
        type_of_occupancy: Yup.string().required("Please specify your type of occupancy"),
        contact_person: Yup.string().required("Please specify your contact person"),
        purposeOfApplication: Yup.array().min(1, "Please select atleast 1 purpose of your application"),
        personalMembership: Yup.array().min(1, "Please select atleast 1 membership"),
        dependents: Yup.array().min(1, "Please specify atleast 1 dependents"),
        family: Yup.array().min(1, "Please specify atleast 1 family member"),
    });

    const submitData = async (data) => {
        let result = await agencyRepository.submitCSWDData(token.token, JSON.stringify(data));

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
                undergo_daycare: "",
                highest_educational_attainment: "",
                skill_training: "",
                certifications: "",
                isWithJob: "",
                occupation: "",
                employer: "",
                monthly_income: "",
                total_monthly_family_income: "",
                contact_no: "",
                facebook_account: "",
                id_no: "",
                status: "",
                circumstances_being_soloParent: "",
                type_of_occupancy: "",
                contact_person: "",
                memberships: [],
                purposeOfApplication: [],
                personalMembership: [],
                dependents: [],
                family: [],
            }}
            validationSchema={validationSchema}
            onSubmit={(data) => submitData(data)}
        >
            {({ handleChange, handleSubmit, handleBlur, setFieldValue, values, errors, touched, isValid, isSubmitting }) => {

                return (
                    <View>
                        {isStart && <Text variant='titleMedium' style={{ marginLeft: 10, marginVertical: 10, alignSelf: 'center' }}>Please fill in the required (<Text style={{ color: 'tomato' }}>*</Text>) fields</Text>}
                        <ScrollView>
                            <View style={{ marginBottom: 120, padding: 10 }}>
                                {!isStart &&
                                    <>
                                        <Text variant='bodyLarge' style={{ textAlign: 'justify' }}>In order to access CSWD services for Solo Parent we would like to require some of your information. If you want to Apply for CDO-CSWD just tap start.</Text>
                                        <Text variant='bodyLarge' style={{ textAlign: 'justify', marginTop: 10, fontWeight: 'bold' }}>Note: For <Text style={{ color: 'tomato', fontWeight: 'bold' }}>re-application</Text> please enter the ID Number provided by CSWD.</Text>
                                        <TextInput
                                            label="ID Number"
                                            values={values.id_no}
                                            defaultValue={values.id_no}
                                            mode="outlined"
                                            left={<TextInput.Icon icon="numeric" />}
                                            style={{ marginTop: 10 }}
                                            onBlur={handleBlur('id_no')}
                                            onChangeText={handleChange('id_no')}
                                            error={errors.id_no && touched.id_no}
                                        />
                                        <Button
                                            mode='contained'
                                            compact
                                            icon="arrow-right"
                                            contentStyle={{ flexDirection: 'row-reverse' }}
                                            style={{
                                                padding: 5,
                                                borderRadius: 5,
                                                marginTop: 25,
                                            }}
                                            labelStyle={{ fontSize: 20, marginRight: 25 }}
                                            onPress={() => setIsStart(true)}
                                        >
                                            Start
                                        </Button>
                                    </>

                                }
                                {isStart &&
                                    <>
                                        <GenericSelect
                                            selectTitle="What is your circumstance of being a solo parent?"
                                            defaultBtnText="Circumstances as solo parent *"
                                            dataList={circumstances}
                                            keyIndex="circumstances_being_soloParent"
                                            height={330}
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                            handleChange={handleChange('circumstances_being_soloParent')}
                                            setFieldValue={(value) => {
                                                if (value !== "Others") {
                                                    setFieldValue('circumstances_being_soloParent', value);
                                                } else {
                                                    setFieldValue('circumstances_being_soloParent', '');
                                                    setIsOtherCircumstance(true);
                                                }
                                            }}
                                        />
                                        {isOtherCircumstance &&
                                            <>
                                                <TextInput
                                                    label="Please specify other circumstance"
                                                    values={values.circumstances_being_soloParent}
                                                    defaultValue={values.circumstances_being_soloParent}
                                                    mode="outlined"
                                                    left={<TextInput.Icon icon="format-list-checks" />}
                                                    style={{ marginTop: 10 }}
                                                    onBlur={handleBlur('circumstances_being_soloParent')}
                                                    onChangeText={handleChange('circumstances_being_soloParent')}
                                                    error={errors.circumstances_being_soloParent && touched.circumstances_being_soloParent}
                                                />
                                                {errors.circumstances_being_soloParent && touched.circumstances_being_soloParent &&
                                                    <HelperText type='error' visible={errors.circumstances_being_soloParent}>
                                                        {errors.circumstances_being_soloParent}
                                                    </HelperText>
                                                }
                                            </>
                                        }
                                        <GenericSelect
                                            selectTitle="Did your child undergo daycare?"
                                            defaultBtnText="Did your child undergo daycare? *"
                                            dataList={["Yes", "No"]}
                                            keyIndex="undergo_daycare"
                                            height={160}
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                            handleChange={handleChange('undergo_daycare')}
                                            setFieldValue={(value) => {
                                                if (value != "") {
                                                    setFieldValue('undergo_daycare', (value === "Yes" ? 1 : 0));
                                                }
                                            }}
                                        />
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
                                        <TextInput
                                            label="Skills training attended"
                                            values={values.skill_training}
                                            defaultValue={values.skill_training}
                                            mode="outlined"
                                            left={<TextInput.Icon icon="format-list-checks" />}
                                            style={{ marginTop: 10 }}
                                            onBlur={handleBlur('skill_training')}
                                            onChangeText={handleChange('skill_training')}
                                            error={errors.skill_training && touched.skill_training}
                                        />
                                        {errors.skill_training && touched.skill_training &&
                                            <HelperText type='error' visible={errors.skill_training}>
                                                {errors.skill_training}
                                            </HelperText>
                                        }
                                        <TextInput
                                            label="Certifications Acquired"
                                            values={values.certifications}
                                            defaultValue={values.certifications}
                                            mode="outlined"
                                            left={<TextInput.Icon icon="format-list-checks" />}
                                            style={{ marginTop: 10 }}
                                            onBlur={handleBlur('certifications')}
                                            onChangeText={handleChange('certifications')}
                                            error={errors.certifications && touched.v}
                                        />
                                        {errors.certifications && touched.certifications &&
                                            <HelperText type='error' visible={errors.certifications}>
                                                {errors.certifications}
                                            </HelperText>
                                        }
                                        <GenericSelect
                                            selectTitle="Do you have a job?"
                                            defaultBtnText="Do you have a job?"
                                            dataList={["Yes", "No"]}
                                            keyIndex="isWithJob"
                                            height={160}
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                            handleChange={handleChange('isWithJob')}
                                            setFieldValue={(value) => {
                                                if (value != "") {
                                                    setFieldValue('isWithJob', (value === "Yes" ? 1 : 0));
                                                }
                                            }}
                                        />
                                        {values.isWithJob === 1 &&
                                            <>
                                                <TextInput
                                                    label="Occupation *"
                                                    values={values.occupation}
                                                    defaultValue={values.occupation}
                                                    mode="outlined"
                                                    left={<TextInput.Icon icon="format-list-checks" />}
                                                    style={{ marginTop: 10 }}
                                                    onBlur={handleBlur('occupation')}
                                                    onChangeText={handleChange('occupation')}
                                                    error={errors.occupation && touched.occupation}
                                                />
                                                {errors.occupation && touched.occupation &&
                                                    <HelperText type='error' visible={errors.occupation}>
                                                        {errors.occupation}
                                                    </HelperText>
                                                }
                                                <TextInput
                                                    label="Employer *"
                                                    values={values.employer}
                                                    defaultValue={values.employer}
                                                    mode="outlined"
                                                    left={<TextInput.Icon icon="format-list-checks" />}
                                                    style={{ marginTop: 10 }}
                                                    onBlur={handleBlur('employer')}
                                                    onChangeText={handleChange('employer')}
                                                    error={errors.employer && touched.employer}
                                                />
                                                {errors.employer && touched.employer &&
                                                    <HelperText type='error' visible={errors.employer}>
                                                        {errors.employer}
                                                    </HelperText>
                                                }
                                                <TextInput
                                                    label="Monthly Income *"
                                                    keyboardType='decimal-pad'
                                                    values={values.monthly_income}
                                                    defaultValue={values.monthly_income}
                                                    mode="outlined"
                                                    left={<TextInput.Icon icon="format-list-checks" />}
                                                    style={{ marginTop: 10 }}
                                                    onBlur={handleBlur('monthly_income')}
                                                    onChangeText={handleChange('monthly_income')}
                                                    error={errors.monthly_income && touched.monthly_income}
                                                />
                                                {errors.monthly_income && touched.monthly_income &&
                                                    <HelperText type='error' visible={errors.monthly_income}>
                                                        {errors.monthly_income}
                                                    </HelperText>
                                                }
                                            </>
                                        }
                                        <TextInput
                                            label="Family Monthly Income *"
                                            keyboardType='decimal-pad'
                                            values={values.total_monthly_family_income}
                                            defaultValue={values.total_monthly_family_income}
                                            mode="outlined"
                                            left={<TextInput.Icon icon="format-list-checks" />}
                                            style={{ marginTop: 10 }}
                                            onBlur={handleBlur('total_monthly_family_income')}
                                            onChangeText={handleChange('total_monthly_family_income')}
                                            error={errors.total_monthly_family_income && touched.total_monthly_family_income}
                                        />
                                        {errors.total_monthly_family_income && touched.total_monthly_family_income &&
                                            <HelperText type='error' visible={errors.total_monthly_family_income}>
                                                {errors.total_monthly_family_income}
                                            </HelperText>
                                        }
                                        <TextInput
                                            label="Contact Number *"
                                            keyboardType='decimal-pad'
                                            values={values.contact_no}
                                            defaultValue={values.contact_no}
                                            mode="outlined"
                                            left={<TextInput.Icon icon="format-list-checks" />}
                                            style={{ marginTop: 10 }}
                                            onBlur={handleBlur('contact_no')}
                                            onChangeText={handleChange('contact_no')}
                                            error={errors.contact_no && touched.contact_no}
                                        />
                                        {errors.contact_no && touched.contact_no &&
                                            <HelperText type='error' visible={errors.contact_no}>
                                                {errors.contact_no}
                                            </HelperText>
                                        }
                                        <TextInput
                                            label="FaceBook Username *"
                                            keyboardType='email-address'
                                            values={values.facebook_account}
                                            defaultValue={values.facebook_account}
                                            mode="outlined"
                                            left={<TextInput.Icon icon="format-list-checks" />}
                                            style={{ marginTop: 10 }}
                                            onBlur={handleBlur('facebook_account')}
                                            onChangeText={handleChange('facebook_account')}
                                            error={errors.facebook_account && touched.facebook_account}
                                        />
                                        {!errors.facebook_account && !touched.facebook_account &&
                                            <HelperText type='info' visible={!errors.facebook_account}>
                                                www.facebook.com/your-username
                                            </HelperText>
                                        }
                                        {errors.facebook_account && touched.facebook_account &&
                                            <HelperText type='error' visible={errors.facebook_account}>
                                                {errors.facebook_account}
                                            </HelperText>
                                        }
                                        <GenericSelect
                                            selectTitle="What is the type of your occupanacy?"
                                            defaultBtnText="Type of occupancy *"
                                            dataList={typeOfOccupancy}
                                            keyIndex="type_of_occupancy"
                                            height={330}
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                            handleChange={handleChange('type_of_occupancy')}
                                            setFieldValue={(value) => {
                                                if (value !== "Others") {
                                                    setFieldValue('type_of_occupancy', value);
                                                } else {
                                                    setFieldValue('type_of_occupancy', '');
                                                    setIsOtherOccupancy(true);
                                                }
                                            }}
                                        />
                                        {isOtherOccupancy &&
                                            <>
                                                <TextInput
                                                    label="Please specify other occupancy"
                                                    values={values.type_of_occupancy}
                                                    defaultValue={values.type_of_occupancy}
                                                    mode="outlined"
                                                    left={<TextInput.Icon icon="format-list-checks" />}
                                                    style={{ marginTop: 10 }}
                                                    onBlur={handleBlur('type_of_occupancy')}
                                                    onChangeText={handleChange('type_of_occupancy')}
                                                    error={errors.type_of_occupancy && touched.type_of_occupancy}
                                                />
                                                {errors.type_of_occupancy && touched.type_of_occupancy &&
                                                    <HelperText type='error' visible={errors.type_of_occupancy}>
                                                        {errors.type_of_occupancy}
                                                    </HelperText>
                                                }
                                            </>
                                        }
                                        <TextInput
                                            label="Contact person*"
                                            values={values.contact_person}
                                            defaultValue={values.contact_person}
                                            mode="outlined"
                                            left={<TextInput.Icon icon="format-list-checks" />}
                                            style={{ marginTop: 10 }}
                                            onBlur={handleBlur('contact_person')}
                                            onChangeText={handleChange('contact_person')}
                                            error={errors.contact_person && touched.contact_person}
                                        />
                                        {errors.contact_person && touched.contact_person &&
                                            <HelperText type='error' visible={errors.contact_person}>
                                                {errors.contact_person}
                                            </HelperText>
                                        }
                                        <Text variant='titleMedium' style={{ textAlign: 'justify', alignSelf: "center", marginTop: 25 }}>Please select the purpose for application.(<Text style={{ color: 'tomato' }}>*</Text>)</Text>
                                        <Divider style={{ marginVertical: 10 }} />
                                        {errors.purposeOfApplication && touched.purposeOfApplication &&
                                            <HelperText type='error' visible={errors.purposeOfApplication} style={{ alignSelf: 'center' }}>
                                                {errors.purposeOfApplication}
                                            </HelperText>
                                        }
                                        {purpose.map((data, index) => {
                                            let prevValues = [...values.purposeOfApplication];
                                            let isExistPurpose = prevValues.includes(data);
                                            return (
                                                <TouchableRipple key={`checkbox-${index}`} onPress={() => {
                                                    if (!isExistPurpose) {
                                                        prevValues.push(data);
                                                    } else {
                                                        prevValues = prevValues.filter(item => item !== data);
                                                    }
                                                    setFieldValue('purposeOfApplication', prevValues);
                                                }}>
                                                    <>
                                                        <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                                            <Checkbox status={isExistPurpose ? "checked" : "unchecked"} />
                                                            <Text variant="bodyLarge">{data}</Text>
                                                        </View>
                                                        <Divider style={{ marginVertical: 10 }} />
                                                    </>
                                                </TouchableRipple>
                                            )
                                        })}
                                        <Text variant='titleMedium' style={{ textAlign: 'justify', alignSelf: "center", marginTop: 25 }}>Please select any membership below. (<Text style={{ color: 'tomato' }}>*</Text>)</Text>
                                        <Divider style={{ marginVertical: 10 }} />
                                        {errors.personalMembership && touched.personalMembership &&
                                            <HelperText type='error' visible={errors.personalMembership} style={{ alignSelf: 'center' }}>
                                                {errors.personalMembership}
                                            </HelperText>
                                        }
                                        {membership.map((data, index) => {
                                            let prevValues = [...values.personalMembership];
                                            let isExistMembership = prevValues.includes(data);
                                            return (
                                                <TouchableRipple key={`checkbox-${index}`} onPress={() => {
                                                    if (!isExistMembership) {
                                                        prevValues.push(data);
                                                    } else {
                                                        prevValues = prevValues.filter(item => item !== data);
                                                    }
                                                    setFieldValue('personalMembership', prevValues);
                                                }}>
                                                    <>
                                                        <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                                            <Checkbox status={isExistMembership ? "checked" : "unchecked"} />
                                                            <Text variant="bodyLarge">{data}</Text>
                                                        </View>
                                                        <Divider style={{ marginVertical: 10 }} />
                                                    </>
                                                </TouchableRipple>
                                            )
                                        })}
                                        <Text variant='titleMedium' style={{ textAlign: 'justify', alignSelf: "flex-start", marginTop: 25, fontWeight: 'bold' }}>
                                            Dependents(<Text style={{ color: 'tomato' }}>*</Text>)
                                        </Text>
                                        {errors.dependents && touched.dependents &&
                                            <HelperText type='error' visible={errors.dependents} style={{ alignSelf: 'center' }}>
                                                {errors.dependents}
                                            </HelperText>
                                        }
                                        <Divider style={{ marginVertical: 10 }} />
                                        <DependentsList dependents={values.dependents} setDependents={(dependents) => setFieldValue('dependents', dependents)} />
                                        <Button onPress={() => setShowDependentsForm(true)} mode='contained-tonal' icon="account-multiple-plus" style={{ borderRadius: 5, marginTop: 10 }} contentStyle={{ flexDirection: 'row-reverse' }}>Add Dependents</Button>
                                        <DependentsDialog show={showDependentsForm} add={(data) => {
                                            let prevValues = [...values.dependents];
                                            let isExist = prevValues.filter(filterData => {
                                                return filterData.name === data.name && filterData.birthdate === data.birthdate;
                                            })
                                            if (isExist.length > 0) {
                                                alerts.info({ message: "Data already added" });
                                                return null;
                                            }

                                            prevValues.push(data);
                                            setFieldValue('dependents', prevValues);

                                        }} cancel={() => setShowDependentsForm(!showDependentsForm)} />
                                        <Text variant='titleMedium' style={{ textAlign: 'justify', alignSelf: "flex-start", marginTop: 25, fontWeight: 'bold' }}>
                                            Family Composition(<Text style={{ color: 'tomato' }}>*</Text>)
                                        </Text>
                                        {errors.family && touched.family &&
                                            <HelperText type='error' visible={errors.family} style={{ alignSelf: 'center' }}>
                                                {errors.family}
                                            </HelperText>
                                        }
                                        <Divider style={{ marginVertical: 10 }} />
                                        <FamilyMemberList family={values.family} setFamily={(family) => setFieldValue('family', family)} />
                                        <Button onPress={() => setShowFamilyForm(true)} mode='contained-tonal' icon="account-multiple-plus" style={{ borderRadius: 5, marginTop: 10 }} contentStyle={{ flexDirection: 'row-reverse' }}>Add Family Member</Button>
                                        <FamilyMembersDialog show={showFamilyForm} add={(data) => {
                                            let prevValues = [...values.family];
                                            let isExist = prevValues.filter(filterData => {
                                                return filterData.name === data.name && filterData.birthdate === data.birthdate;
                                            })
                                            if (isExist.length > 0) {
                                                alerts.info({ message: "Data already added" });
                                                return null;
                                            }

                                            prevValues.push(data);
                                            setFieldValue('family', prevValues);

                                        }} cancel={() => setShowFamilyForm(!showFamilyForm)} />
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
                                    </>
                                }
                            </View>
                        </ScrollView>
                    </View>
                )
            }}
        </Formik>
    )
}
