import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { useTheme } from 'react-native-paper';
import {
    ProfileForm,
    UserCredentialsForm,
    VerificationCodeForm,
    AddressForm,
    EducationBackgroundForm,
    SuccessPage
} from '@components';

function RegisterScreen({ navigation }) {
    const theme = useTheme();
    const mainColor = theme.colors.primary;

    const [currentStep, setCurrentStep] = React.useState(0);
    const [isCompleted, setIsCompleted] = React.useState(false);

    const progressStepsStyle = {
        labelColor: mainColor,
        activeStepIconBorderColor: mainColor,
        activeLabelColor: mainColor
    }

    const progressStepStyle = {
        nextBtnTextStyle: {
            color: mainColor,
        },
        previousBtnTextStyle: {
            color: mainColor,
        },
        removeBtnRow: true
    }

    const [regData, setRegData] = React.useState({
        email: '',
        password: '',
        password_confirmation: '',
        code: '',
        firstName: '',
        lastName: '',
        middleName: '',
        nameSuffix: '',
        birthdate: '',
        birthplace: '',
        gender: '',
        civilStatus: '',
        contactNumber: '',
        religion: '',
        region: '',
        regionName: '',
        province: '',
        city: '',
        zipcode: '',
        street: '',
        barangay: '',
        brgy: '',
        education: '',
        lastYearAttended: '',
        reasonForNotAttendingSchool: '',
    })


    const updateField = (data) => {
        setRegData(prevState => ({ ...prevState, ...data }));
    }

    const nextStep = () => setCurrentStep((prevState) => prevState + 1);
    const prevStep = () => setCurrentStep((prevState) => prevState - 1);

    const submitData = async (data) => {
        updateField(data);
        nextStep();
        if (currentStep >= 4) {
            setIsCompleted(true);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight, backgroundColor: "#FFF" }}>
            <StatusBar style='light' />
            <ScrollView>
                <View style={{ flex: 1, padding: 20 }}>
                    <ProgressSteps {...progressStepsStyle} activeStep={currentStep} isComplete={isCompleted}>
                        <ProgressStep {...progressStepStyle}>
                            <UserCredentialsForm regData={regData} updateField={updateField} submitData={submitData} />
                        </ProgressStep>
                        <ProgressStep {...progressStepStyle}>
                            <VerificationCodeForm regData={regData} updateField={updateField} submitData={submitData} prevStep={prevStep} />
                        </ProgressStep>
                        <ProgressStep {...progressStepStyle}>
                            <ProfileForm regData={regData} updateField={updateField} submitData={submitData} prevStep={prevStep} />
                        </ProgressStep>
                        <ProgressStep {...progressStepStyle}>
                            <AddressForm regData={regData} updateField={updateField} submitData={submitData} prevStep={prevStep} />
                        </ProgressStep>
                        <ProgressStep {...progressStepStyle}>
                            <EducationBackgroundForm navigation={navigation} regData={regData} updateField={updateField} submitData={submitData} prevStep={prevStep} />
                        </ProgressStep>
                        <ProgressStep {...progressStepStyle}>
                            <SuccessPage message="Registration Completed!" icon="login" path="Login" btnTitle="Proceed to login" navigation={navigation} />
                        </ProgressStep>
                    </ProgressSteps>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RegisterScreen