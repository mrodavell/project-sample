import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Keyboard, View } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import { authRepository } from "@repository";
import { alerts, secureStorage, storage } from "@utils";
import { useAuth } from "context/authContext";
import { netinfo } from "utils/NetInfo";
import bcrypt from "react-native-bcrypt";
import isaac from "isaac";

export default function LoginForm(props) {
  const { navigation } = props;
  const { setMe, setToken, token } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);

  const serverError = () => {
    alerts.error({ message: "Server is on maintenance" });
  };

  const doOnlineLogin = async (params) => { 
    const result = await authRepository.login(params); 
    if (result === undefined || !result) {
      serverError();
      return false;
    }

    if (result?.error) {
      alerts.error({ message: result.message });
      return null;
    }

    const token = result?.data?.token;
    const role = result?.data?.role;
    const agency = result?.data?.agency;
    const me = await authRepository.me(token);

    if (me?.error) {
      alerts.error({ message: "Failed to login" });
      return false;
    }

    await secureStorage.setItem("_token", result?.data);
    await storage.setItem("_me", me);

    setMe(me);
    setToken(result?.data);

    if (result?.data?.is_first_login === 1) {
      navigation.navigate("Onboarding", { token, role, agency });
    } else {
      if (role === 2 && agency === 1) {
        bcrypt.setRandomFallback((len = 16) => {
          const buf = new Uint8Array(len);
          return buf.map(() => Math.floor(isaac.random() * 256));
        });
        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(params.password, salt);
        await secureStorage.setItem("_email", params.email);
        await secureStorage.setItem("_password", password);
        await secureStorage.setItem("_isFaci", true);
        navigation.navigate("Facilitator");
      } else if (role === 3) {
        await secureStorage.removeItem("_isFaci");
        navigation.navigate("Home");
      }
    }
  };

  const doOfflineLogin = async (params) => { 
    const savedEmail = await secureStorage.getItem("_email");
    const passwordHash = await secureStorage.getItem("_password");
    const isCorrectPass = bcrypt.compareSync(params.password, passwordHash);

    if (savedEmail === params.email && isCorrectPass) {
      navigation.navigate("Facilitator");
    } else {
      alerts.info({ message: "Please perform first login with internet" });
    }
  };

  const handleLogin = async (params) => {
    try {
      const netState = await netinfo.check();
      if (netState.isInternetReachable) {
        await doOnlineLogin(params);
      } else {
        await doOfflineLogin(params);
      }
    } catch (e) {
      console.info(e);
      serverError();
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Please enter your email"),
    password: Yup.string().required("Please enter your password"),
  });

  return (
    <View>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          await handleLogin(values);
        }}
        validationSchema={validationSchema}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
          setTouched,
          isSubmitting,
        }) => (
          <View>
            <TextInput
              label="Email"
              defaultValue={values.email}
              values={values.email}
              mode="outlined"
              left={<TextInput.Icon icon="email" />}
              error={errors.email && touched.email}
              keyboardType="email-address"
              onFocus={() => setTouched({ email: true }, false)}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
            />
            {errors.email && touched.email && (
              <HelperText type="error" visible={errors.email}>
                {errors.email}
              </HelperText>
            )}
            <TextInput
              secureTextEntry={!showPassword}
              label="Password"
              defaultValue={values.password}
              values={values.password}
              mode="outlined"
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={showPassword ? "eye" : "eye-off"}
                  onPress={() => {
                    Keyboard.dismiss;
                    setShowPassword(!showPassword);
                  }}
                />
              }
              style={{ marginTop: 5 }}
              error={errors.password && touched.password}
              onFocus={() => setTouched({ password: true }, false)}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
            />
            {errors.password && touched.password && (
              <HelperText type="error" visible={errors.password}>
                {errors.password}
              </HelperText>
            )}
            <Button
              style={{ marginTop: 15, padding: 7 }}
              onPress={handleSubmit}
              icon="login"
              mode="contained"
              uppercase
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              Login
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
}
