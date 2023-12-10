import React from 'react';
import { View } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { useTheme, Button, Text, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from 'context/authContext';
import { authRepository } from 'repository';
import {
    NewEmailForm,
    VerificationCodeForm,
    SuccessPage
} from '@components';
import { alerts } from 'utils';



function ChangeEmailPage({ navigation }) {

    const theme = useTheme();
    const mainColor = theme.colors.primary;
    const { token, me, setMe } = useAuth();

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

    const [newEmailData, setNewEmailData] = React.useState({
        email: '',
        code: '',
    })


    const updateField = (data) => {
        setNewEmailData(prevState => ({ ...prevState, ...data }));
    }

    const nextStep = () => setCurrentStep((prevState) => prevState + 1);
    const prevStep = () => setCurrentStep((prevState) => prevState - 1);

    const submitData = async (data) => {
        updateField(data);

        if (currentStep === 1) {
            let result = await authRepository.updateEmail(token.token, JSON.stringify(newEmailData));
            if (!result.error) {
                let newMe = { ...me, email: newEmailData.email }
                setMe(newMe);
                setIsCompleted(true);
                nextStep();
            } else {
                alerts.error({ message: result.message })
            }
        } else {
            nextStep();
        }
    }

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <View style={{ flexDirection: 'column', padding: 10, paddingBottom: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button compact onPress={() => navigation.goBack()}>
                            <MaterialCommunityIcons name="arrow-left" size={20} />
                        </Button>
                        <Text variant='headlineSmall'>Change Email</Text>
                    </View>
                </View>
            </View>
            <Divider />
            <View style={{ flex: 1, padding: 10 }}>
                <ProgressSteps {...progressStepsStyle} activeStep={currentStep} isComplete={isCompleted}>
                    <ProgressStep {...progressStepStyle}>
                        <NewEmailForm newEmailData={newEmailData} submitData={submitData} />
                    </ProgressStep>
                    <ProgressStep {...progressStepStyle}>
                        <VerificationCodeForm regData={newEmailData} submitData={submitData} prevStep={prevStep} />
                    </ProgressStep>
                    <ProgressStep {...progressStepStyle}>
                        <SuccessPage message="Email was successfully changed!" />
                    </ProgressStep>
                </ProgressSteps>
            </View>
        </View>
    )
}

export default ChangeEmailPage