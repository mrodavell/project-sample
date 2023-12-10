import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { useTheme } from 'react-native-paper';
import {
    EmailVerificationForm,
    ForgotVerificationCodeForm,
    PasswordResetForm,
    AccountRecoveredPage
} from '@components';


function ForgotPasswordScreen({ navigation }) {
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

    const [forgotData, setForgotData] = React.useState({
        email: '',
        password: '',
        password_confirmation: '',
        code: '',
    })


    const updateField = (data) => {
        setForgotData(prevState => ({ ...prevState, ...data }));
    }

    const nextStep = () => setCurrentStep((prevState) => prevState + 1);
    const prevStep = () => setCurrentStep((prevState) => prevState - 1);

    const submitData = async (data) => {
        updateField(data);
        nextStep();
        if (currentStep >= 2) {
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
                            <EmailVerificationForm forgotData={forgotData} submitData={submitData} />
                        </ProgressStep>
                        <ProgressStep {...progressStepStyle}>
                            <ForgotVerificationCodeForm forgotData={forgotData} submitData={submitData} prevStep={prevStep} />
                        </ProgressStep>
                        <ProgressStep {...progressStepStyle}>
                            <PasswordResetForm forgotData={forgotData} submitData={submitData} prevStep={prevStep} />
                        </ProgressStep>
                        <ProgressStep {...progressStepStyle}>
                            <AccountRecoveredPage navigation={navigation} />
                        </ProgressStep>
                    </ProgressSteps>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ForgotPasswordScreen