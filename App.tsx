import { Loading } from "@components/Loading";
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts
} from "@expo-google-fonts/roboto";
import { Routes } from "@navigation/index";
import { THEME } from "@theme/index";
import { NativeBaseProvider, VStack } from "native-base";
import { StatusBar } from "react-native";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? (
        <Routes />
      ) : (
        <VStack flex={1} bg="gray.700">
          <Loading />
        </VStack>
      )}
    </NativeBaseProvider>
  );
}
