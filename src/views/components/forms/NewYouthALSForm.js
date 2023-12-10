import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { ScrollView, View } from "react-native";
import { TextInput, HelperText, Button, Text } from "react-native-paper";
import { alerts } from "utils";
import * as SQLite from "expo-sqlite";
import { useAuth } from "context/authContext";
import GenericSelect from "../inputs/GenericSelect";
import Birthdate from "../inputs/Birthdate";
import GenderSelect from "@components/inputs/GenderSelect";
import CivilStatusSelect from "../inputs/CivilStatusSelect";
import RegionSelect from "@components/inputs/RegionSelect";
import { netinfo } from "utils/NetInfo";
import { youthRepository } from "repository";

export default function NewYouthALSForm({ navigation }) {
  let db = SQLite.openDatabase("youths.db");
  const [isSaving, setIsSaving] = React.useState(false);
  const token = useAuth().token;
  const [otherReason, setOtherReason] = React.useState(false);
  const minYears = parseInt(moment().subtract(31, "years").format("YYYY"));
  const maxYears = parseInt(moment().format("YYYY"));

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

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Please enter email"),
    first_name: Yup.string().required("Please enter first name"),
    last_name: Yup.string().required("Please enter last name"),
    middle_name: Yup.string().nullable(),
    suffix: Yup.string().nullable(),
    birthplace: Yup.string().required("Please enter birthplace"),
    birthdate: Yup.date()
      .typeError("Invalid Birthdate")
      .required("Please input birthdate"),
    gender: Yup.string().required("Please select a gender"),
    civil_status: Yup.string().required("Please select a civil status"),
    contact_number: Yup.number().required("Please enter contact number"),
    religion: Yup.string().required("Please enter religion"),
    region: Yup.string().required("Please select a region"),
    province: Yup.string().required("Please select a province"),
    zipcode: Yup.string().required("Please select a zipcode"),
    city: Yup.string().required("Please enter city"),
    brgy: Yup.string().required("Please enter barangay name"),
    street: Yup.string().required("Please enter street or purok name"),
    LRN: Yup.string().nullable(),
    distance_from_center: Yup.string().required(
      "Please select distance from center"
    ),
    time_of_travel: Yup.string().required("Please select time of travel"),
    mode_of_transport: Yup.string().required("Please select mode of transport"),
    learning_session_availability: Yup.string().required(
      "Please select learning session availability"
    ),
    isOSY: Yup.number().required("Please identify if you are an OSY"),
    drop_out_reason: Yup.string().when("isOSY", {
      is: (isOSY) => isOSY === 1,
      then: Yup.string().required("Please select drop out reason"),
    }),
    isAttendedALS: Yup.number().required(
      "Please specify if you have attended ALS program"
    ),
    program_name: Yup.string().when("isAttendedALS", {
      is: (isAttendedALS) => isAttendedALS === 1,
      then: Yup.string().required("Please specify the program name"),
    }),
    year_attended: Yup.string().when("isAttendedALS", {
      is: (isAttendedALS) => isAttendedALS === 1,
      then: Yup.string().required(
        "Please specify the year you attended the program"
      ),
    }),
    isCompleted: Yup.string().when("isAttendedALS", {
      is: (isAttendedALS) => isAttendedALS === 1,
      then: Yup.string().required(
        "Please specify if you completed the program"
      ),
    }),
    reason_of_non_completion: Yup.string().when("isCompleted", {
      is: (isCompleted) => isCompleted === 1,
      then: Yup.string().required(
        "Please specify the reason of non-completion"
      ),
    }),
    last_grade_level: Yup.string().required(
      "Please select last grade level attended"
    ),
    ethnic_group: Yup.string().nullable(),
    mother_tounge: Yup.string().nullable(),
    interviewer: Yup.string().nullable(),
    isPWD: Yup.string().required("Please specify if you are a PWD"),
    is4Ps: Yup.string().required("Please specify if you are a 4Ps beneficiary"),
  });

  const doOnlineInsert = async (data) => {
    try {
      const result = await youthRepository.upload(token.token, data);
      if (!result.error) {
        doOfflineInsert(data, 1);
      } else {
        alerts.error({ message: result.message });
      }
    } catch (error) {
      alerts.error({ message: error.toString() });
    }
  };

  const doOfflineInsert = async (data, isSync = "0") => {
    try {
      let name = `${data.first_name} ${data.last_name} ${data.suffix}`;
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO youths (name, details, sync) values (?,?,?)",
          [name, JSON.stringify(data), isSync],
          (txObj, _) => {
            setIsSaving(false);
            alerts.success({ message: "Data saved" });
            navigation.pop();
          },
          (txObj, _) => alerts.error({ message: "SQLite Error" })
        );
      });
    } catch (error) {
      alerts.error({ message: error.toString() });
    }
  };

  const submitData = async (data) => {
    try {
      setIsSaving(true);
      const netState = await netinfo.check();
      if (netState.isInternetReachable) {
        await doOnlineInsert(data);
      } else {
        await doOfflineInsert(data);
      }
    } catch (error) {
      alerts.error({ message: error.toString() });
    } finally {
      setIsSaving(false);
    }
  };

  const initialData = {
    email: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    suffix: "",
    birthdate: "",
    birthplace: "",
    gender: "",
    civil_status: "",
    contact_number: "",
    religion: "",
    region: "",
    province: "",
    city: "",
    zipcode: "9000",
    street: "",
    brgy: "",
    agency_id: 1,
    LRN: "",
    distance_from_center: "",
    time_of_travel: "",
    mode_of_transport: "",
    learning_session_availability: "",
    isOSY: "",
    drop_out_reason: "",
    isAttendedALS: "",
    program_name: "",
    year_attended: "",
    isCompleted: "",
    reason_of_non_completion: "",
    last_grade_level: "",
    ethnic_group: "",
    mother_tounge: "",
    interviewer: "",
    isPWD: "",
    is4Ps: "",
  };

  return (
    <Formik
      initialValues={initialData}
      validationSchema={validationSchema}
      onSubmit={(data) => submitData(data)}
    >
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        setFieldValue,
        values,
        errors,
        touched,
      }) => {
        return (
          <View>
            <Text
              variant="titleMedium"
              style={{
                marginLeft: 10,
                marginTop: 10,
                paddingBottom: 10,
                alignSelf: "center",
              }}
            >
              Please fill in the required (
              <Text style={{ color: "tomato" }}>*</Text>) fields
            </Text>
            <ScrollView>
              <View style={{ marginBottom: 120, padding: 10 }}>
                <>
                  <TextInput
                    label="Email *"
                    defaultValue={values.email}
                    values={values.email}
                    mode="outlined"
                    left={<TextInput.Icon icon="email" />}
                    error={errors.email && touched.email}
                    keyboardType="email-address"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    autoComplete="off"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  {errors.email && touched.email && (
                    <HelperText type="error" visible={errors.email}>
                      {errors.email}
                    </HelperText>
                  )}
                  <TextInput
                    label="First Name *"
                    values={values.first_name}
                    defaultValue={values.first_name}
                    mode="outlined"
                    left={<TextInput.Icon icon="account" />}
                    style={{ marginTop: 10 }}
                    onBlur={handleBlur("first_name")}
                    onChangeText={handleChange("first_name")}
                    error={errors.first_name && touched.first_name}
                    autoCapitalize="words"
                  />
                  {errors.first_name && touched.first_name && (
                    <HelperText type="error" visible={errors.first_name}>
                      {errors.first_name}
                    </HelperText>
                  )}
                  <TextInput
                    label="Last Name *"
                    values={values.last_name}
                    defaultValue={values.last_name}
                    mode="outlined"
                    left={<TextInput.Icon icon="account" />}
                    style={{ marginTop: 10 }}
                    onBlur={handleBlur("last_name")}
                    onChangeText={handleChange("last_name")}
                    error={errors.last_name && touched.last_name}
                    autoCapitalize="words"
                  />
                  {errors.last_name && touched.last_name && (
                    <HelperText type="error" visible={errors.last_name}>
                      {errors.last_name}
                    </HelperText>
                  )}
                  <TextInput
                    label="Middle Name"
                    values={values.middle_name}
                    defaultValue={values.middle_name}
                    mode="outlined"
                    left={<TextInput.Icon icon="account" />}
                    style={{ marginTop: 10 }}
                    onBlur={handleBlur("middle_name")}
                    onChangeText={handleChange("middle_name")}
                    error={errors.middle_name && touched.middle_name}
                    autoCapitalize="words"
                  />
                  {errors.middle_name && touched.middle_name && (
                    <HelperText type="error" visible={errors.middle_name}>
                      {errors.middle_name}
                    </HelperText>
                  )}
                  <TextInput
                    label="Suffix (e.g Jr., Sr., III)"
                    values={values.suffix}
                    defaultValue={values.suffix}
                    mode="outlined"
                    left={<TextInput.Icon icon="account" />}
                    style={{ marginTop: 10 }}
                    onBlur={handleBlur("suffix")}
                    onChangeText={handleChange("suffix")}
                    error={errors.suffix && touched.suffix}
                    autoCapitalize="words"
                  />
                  {errors.suffix && touched.suffix && (
                    <HelperText type="error" visible={errors.suffix}>
                      {errors.suffix}
                    </HelperText>
                  )}
                  <GenderSelect
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange("gender")}
                    setFieldValue={(gender) => {
                      setFieldValue("gender", gender);
                    }}
                  />
                  <TextInput
                    label="Birthplace *"
                    values={values.birthplace}
                    defaultValue={values.birthplace}
                    mode="outlined"
                    left={<TextInput.Icon icon="account" />}
                    style={{ marginTop: 10 }}
                    onBlur={handleBlur("birthplace")}
                    onChangeText={handleChange("birthplace")}
                    error={errors.birthplace && touched.birthplace}
                    autoCapitalize="words"
                  />
                  {errors.birthplace && touched.birthplace && (
                    <HelperText type="error" visible={errors.birthplace}>
                      {errors.birthplace}
                    </HelperText>
                  )}
                  <Birthdate
                    values={values}
                    touched={touched}
                    handleChange={handleChange("birthdate")}
                    setFieldValue={(bdate) => {
                      setFieldValue("birthdate", bdate);
                    }}
                    errors={errors.birthdate && touched.birthdate}
                    handleDate={(value) =>
                      updateField({ key: "birthdate", value })
                    }
                  />
                  {errors.birthdate && touched.birthdate && (
                    <HelperText type="error" visible={errors.birthdate}>
                      {errors.birthdate}
                    </HelperText>
                  )}
                  <CivilStatusSelect
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange("civil_status")}
                    setFieldValue={(status) => {
                      setFieldValue("civil_status", status);
                    }}
                  />
                  <TextInput
                    label="Contact Number *"
                    values={values.contact_number}
                    defaultValue={values.contact_number}
                    keyboardType="phone-pad"
                    mode="outlined"
                    left={<TextInput.Icon icon="account" />}
                    style={{ marginTop: 10 }}
                    onBlur={handleBlur("contact_number")}
                    onChangeText={handleChange("contact_number")}
                    error={errors.contact_number && touched.contact_number}
                  />
                  {errors.contact_number && touched.contact_number && (
                    <HelperText type="error" visible={errors.contact_number}>
                      {errors.contact_number}
                    </HelperText>
                  )}
                  <TextInput
                    label="Religion *"
                    values={values.religion}
                    defaultValue={values.religion}
                    mode="outlined"
                    left={<TextInput.Icon icon="church" />}
                    style={{ marginTop: 10 }}
                    onBlur={handleBlur("religion")}
                    onChangeText={handleChange("religion")}
                    error={errors.religion && touched.religion}
                  />
                  {errors.religion && touched.religion && (
                    <HelperText type="error" visible={errors.religion}>
                      {errors.religion}
                    </HelperText>
                  )}
                  <RegionSelect
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange("region")}
                    setFieldValue={(region) => {
                      setFieldValue("region", region);
                    }}
                  />
                  <TextInput
                    label="Province *"
                    values={values.province}
                    defaultValue={values.province}
                    mode="outlined"
                    left={<TextInput.Icon icon="home-city-outline" />}
                    style={{ marginTop: 10 }}
                    onBlur={handleBlur("province")}
                    onChangeText={handleChange("province")}
                    error={errors.province && touched.province}
                  />
                  {errors.province && touched.province && (
                    <HelperText type="error" visible={errors.province}>
                      {errors.province}
                    </HelperText>
                  )}
                  <TextInput
                    label="City *"
                    values={values.city}
                    defaultValue={values.city}
                    mode="outlined"
                    left={<TextInput.Icon icon="home-city-outline" />}
                    style={{ marginTop: 10 }}
                    onBlur={handleBlur("city")}
                    onChangeText={handleChange("city")}
                    error={errors.city && touched.city}
                  />
                  {errors.city && touched.city && (
                    <HelperText type="error" visible={errors.city}>
                      {errors.city}
                    </HelperText>
                  )}
                  <TextInput
                    label="Barangay *"
                    values={values.brgy}
                    defaultValue={values.brgy}
                    mode="outlined"
                    left={<TextInput.Icon icon="home-city-outline" />}
                    style={{ marginTop: 10 }}
                    onBlur={handleBlur("brgy")}
                    onChangeText={handleChange("brgy")}
                    error={errors.brgy && touched.brgy}
                  />
                  {errors.brgy && touched.brgy && (
                    <HelperText type="error" visible={errors.brgy}>
                      {errors.brgy}
                    </HelperText>
                  )}
                  <TextInput
                    label="Street / Purok / Block / Zone *"
                    values={values.street}
                    defaultValue={values.street}
                    mode="outlined"
                    left={<TextInput.Icon icon="home-map-marker" />}
                    style={{ marginTop: 10 }}
                    onBlur={handleBlur("street")}
                    onChangeText={handleChange("street")}
                    error={errors.street && touched.street}
                  />
                  {errors.street && touched.street && (
                    <HelperText type="error" visible={errors.street}>
                      {errors.street}
                    </HelperText>
                  )}
                  <TextInput
                    label="Learners Reference Number (LRN)"
                    values={values.LRN}
                    defaultValue={values.LRN}
                    mode="outlined"
                    left={<TextInput.Icon icon="numeric" />}
                    style={{ marginTop: 10 }}
                    onBlur={handleBlur("LRN")}
                    onChangeText={handleChange("LRN")}
                  />
                  <GenericSelect
                    selectTitle="How far is the nearest learning center from your house in kilometer?"
                    defaultBtnText="Distance from learning center *"
                    dataList={["1-2", "2-3", "3-4", "5 or Above"]}
                    keyIndex="distance_from_center"
                    height={280}
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange("distance_from_center")}
                    setFieldValue={(value) => {
                      setFieldValue("distance_from_center", value);
                    }}
                  />
                  <GenericSelect
                    selectTitle="How many hours does it take for you to get to your nearest learning center?"
                    defaultBtnText="Time of travel to learning centers *"
                    dataList={["1-2", "2-3", "3-4", "5 or Above"]}
                    keyIndex="time_of_travel"
                    height={310}
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange("time_of_travel")}
                    setFieldValue={(value) => {
                      setFieldValue("time_of_travel", value);
                    }}
                  />
                  <GenericSelect
                    selectTitle="Which available day can you join ALS learning session?"
                    defaultBtnText="Learning Availability *"
                    dataList={[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                    ]}
                    keyIndex="learning_session_availability"
                    height={330}
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange("learning_session_availability")}
                    setFieldValue={(value) => {
                      setFieldValue("learning_session_availability", value);
                    }}
                  />
                  <GenericSelect
                    selectTitle="Which mode of transportation you can use going to a learning center?"
                    defaultBtnText="Mode of Transportation *"
                    dataList={[
                      "Walking",
                      "Bicycle",
                      "Motorcycle",
                      "Public Vehicle",
                    ]}
                    keyIndex="mode_of_transport"
                    height={280}
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange("mode_of_transport")}
                    setFieldValue={(value) => {
                      setFieldValue("mode_of_transport", value);
                    }}
                  />
                  <GenericSelect
                    selectTitle="Are you an OSY? (Out-of-School-Youth)"
                    defaultBtnText="Are you an OSY? *"
                    dataList={["Yes", "No"]}
                    keyIndex="isOSY"
                    height={190}
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange("isOSY")}
                    setFieldValue={(value) => {
                      if (value != "") {
                        setFieldValue("isOSY", value === "Yes" ? 1 : 0);
                      }
                    }}
                  />
                  {values.isOSY === 1 && (
                    <>
                      <GenericSelect
                        selectTitle="Which of the following is the reason you drop out of school?"
                        defaultBtnText="Reason for dropping *"
                        dataList={[
                          "No school in barangay",
                          "School too far from home",
                          "Financial Problem",
                          "Need to help family",
                          "Other reason",
                        ]}
                        keyIndex="drop_out_reason"
                        height={340}
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange("drop_out_reason")}
                        setFieldValue={(value) => {
                          if (value.toLowerCase() === "other reason") {
                            setOtherReason(true);
                          } else {
                            setOtherReason(false);
                            setFieldValue("drop_out_reason", value);
                          }
                        }}
                      />
                      {otherReason && (
                        <TextInput
                          label="Other reason please specify *"
                          values={values.drop_out_reason}
                          defaultValue={values.drop_out_reason}
                          mode="outlined"
                          left={<TextInput.Icon icon="format-list-checks" />}
                          style={{ marginTop: 10 }}
                          onBlur={handleBlur("drop_out_reason")}
                          onChangeText={handleChange("drop_out_reason")}
                          error={
                            errors.drop_out_reason && touched.drop_out_reason
                          }
                          autoCapitalize="words"
                        />
                      )}
                    </>
                  )}
                  <GenericSelect
                    selectTitle="Did you take any ALS program before?"
                    defaultBtnText="Enrolled in ALS before? *"
                    dataList={["Yes", "No"]}
                    keyIndex="isAttendedALS"
                    height={190}
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange("isAttendedALS")}
                    setFieldValue={(value) => {
                      if (value != "") {
                        setFieldValue("isAttendedALS", value === "Yes" ? 1 : 0);
                      }
                    }}
                  />
                  {values.isAttendedALS === 1 && (
                    <>
                      <Text
                        variant="bodyLarge"
                        style={{ alignSelf: "center", marginTop: 20 }}
                      >
                        Please specify the ALS program you've attended
                      </Text>
                      <TextInput
                        label="ALS Program Name"
                        values={values.program_name}
                        defaultValue={values.program_name}
                        mode="outlined"
                        left={<TextInput.Icon icon="format-list-checks" />}
                        style={{ marginTop: 10 }}
                        onBlur={handleBlur("program_name")}
                        onChangeText={handleChange("program_name")}
                        error={errors.program_name && touched.program_name}
                      />
                      {errors.program_name && touched.program_name && (
                        <HelperText type="error" visible={errors.program_name}>
                          {errors.program_name}
                        </HelperText>
                      )}
                      <GenericSelect
                        selectTitle="The year you attended the ALS program"
                        defaultBtnText="Year Attended *"
                        dataList={yearAttended}
                        keyIndex="year_attended"
                        height={400}
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange("year_attended")}
                        setFieldValue={(value) => {
                          setFieldValue("year_attended", value);
                        }}
                      />
                      <GenericSelect
                        selectTitle="Did you complete the ALS program?"
                        defaultBtnText="Did you complete it? *"
                        dataList={["Yes", "No"]}
                        keyIndex="isCompleted"
                        height={160}
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange("isCompleted")}
                        setFieldValue={(value) => {
                          if (value != "") {
                            setFieldValue(
                              "isCompleted",
                              value === "Yes" ? 1 : 0
                            );
                          }
                        }}
                      />
                      {values.isCompleted === 0 && (
                        <>
                          <TextInput
                            label="What was the reason of non-completion?"
                            values={values.reason_of_non_completion}
                            defaultValue={values.reason_of_non_completion}
                            mode="outlined"
                            left={<TextInput.Icon icon="format-list-checks" />}
                            style={{ marginTop: 10 }}
                            onBlur={handleBlur("reason_of_non_completion")}
                            onChangeText={handleChange(
                              "reason_of_non_completion"
                            )}
                            error={
                              errors.reason_of_non_completion &&
                              touched.reason_of_non_completion
                            }
                          />
                          {errors.reason_of_non_completion &&
                            touched.reason_of_non_completion && (
                              <HelperText
                                type="error"
                                visible={errors.reason_of_non_completion}
                              >
                                {errors.reason_of_non_completion}
                              </HelperText>
                            )}
                        </>
                      )}
                    </>
                  )}
                  <GenericSelect
                    selectTitle="Last grade level attended"
                    defaultBtnText="Last Grade Level Attended *"
                    dataList={lastGradeLevelAttended}
                    keyIndex="last_grade_level"
                    height={400}
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange("last_grade_level")}
                    setFieldValue={(value) => {
                      setFieldValue("last_grade_level", value);
                    }}
                  />
                  <TextInput
                    label="Ethnic Group"
                    values={values.ethnic_group}
                    defaultValue={values.ethnic_group}
                    mode="outlined"
                    left={<TextInput.Icon icon="format-list-checks" />}
                    style={{ marginTop: 5 }}
                    onBlur={handleBlur("ethnic_group")}
                    onChangeText={handleChange("ethnic_group")}
                    error={errors.ethnic_group && touched.ethnic_group}
                  />
                  {errors.ethnic_group && touched.ethnic_group && (
                    <HelperText type="error" visible={errors.ethnic_group}>
                      {errors.ethnic_group}
                    </HelperText>
                  )}
                  <TextInput
                    label="Mother Tongue"
                    values={values.mother_tounge}
                    defaultValue={values.mother_tounge}
                    mode="outlined"
                    left={<TextInput.Icon icon="format-list-checks" />}
                    style={{ marginTop: 5 }}
                    onBlur={handleBlur("mother_tounge")}
                    onChangeText={handleChange("mother_tounge")}
                    error={errors.mother_tounge && touched.mother_tounge}
                  />
                  {errors.mother_tounge && touched.mother_tounge && (
                    <HelperText type="error" visible={errors.mother_tounge}>
                      {errors.mother_tounge}
                    </HelperText>
                  )}
                  <GenericSelect
                    selectTitle="Are you a PWD?"
                    defaultBtnText="Are you a PWD? *"
                    dataList={["Yes", "No"]}
                    keyIndex="isPWD"
                    height={160}
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange("isPWD")}
                    setFieldValue={(value) => {
                      if (value != "") {
                        setFieldValue("isPWD", value === "Yes" ? 1 : 0);
                      }
                    }}
                  />
                  <GenericSelect
                    selectTitle="Are you a 4Ps beneficiary?"
                    defaultBtnText="Are you a 4Ps beneficiary? *"
                    dataList={["Yes", "No"]}
                    keyIndex="is4Ps"
                    height={160}
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange("is4Ps")}
                    setFieldValue={(value) => {
                      if (value != "") {
                        setFieldValue("is4Ps", value === "Yes" ? 1 : 0);
                      }
                    }}
                  />
                  <Button
                    mode="contained"
                    compact
                    icon="content-save"
                    contentStyle={{ flexDirection: "row-reverse" }}
                    disabled={isSaving}
                    loading={isSaving}
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
              </View>
            </ScrollView>
          </View>
        );
      }}
    </Formik>
  );
}
