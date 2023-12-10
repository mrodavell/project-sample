import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Alert, Image, BackHandler } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { authRepository } from "@repository";
import { alerts } from "utils";

function OnboardingScreen({ route, navigation }) {
  const { token, role, agency } = route.params; 
  const handleDone = async () => {
    let result = await authRepository.setNotFirstLogin(token);
    if (!result.error) {
      if (role === 3) {
        navigation.navigate("Home");
      } else if (role === 2 && agency === 1) {
        navigation.navigate("Facilitator");
      }
    } else {
      alerts.error({ message: result.message ?? "Server Error" });
    }
    return;
  };

  React.useEffect(() => {
    const promptUser = () => {
      Alert.alert(
        "Do you want to skip?",
        "You can skip this on-boarding process.",
        [
          { text: "Continue", style: "cancel", onPress: () => null },
          {
            text: "Skip",
            style: "destructive",
            onPress: () => {
              handleDone();
            },
          },
        ]
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      promptUser
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <StatusBar style="dark" />
      <Onboarding
        onDone={handleDone}
        showSkip={false}
        pages={[
          {
            backgroundColor: "#FFF",
            image: (
              <Image
                source={require("@assets/adaptive-icon.png")}
                style={{ width: 150, height: 150, borderRadius: 50 }}
              />
            ),
            titleStyles: { fontSize: 24 },
            title: "Welcome to eMonitor",
            subTitleStyles: { fontSize: 18 },
            subtitle: "An app built for the Filipino youth",
          },
          {
            backgroundColor: "#FFF",
            image: (
              <Image
                source={require("@assets/splash.png")}
                style={{ width: 350, height: 350 }}
              />
            ),
            titleStyles: { fontSize: 22 },
            title: "About eMonitor",
            subTitleStyles: { fontSize: 18 },
            subtitle:
              "This project was funded by USAID for the Filipino Youth in partnership with USTP, CDO LGU, and various government agencies",
          },
        ]}
      />
    </SafeAreaView>
  );
}

export default OnboardingScreen;
