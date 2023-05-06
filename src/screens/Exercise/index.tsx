import { AppNavigatorRoutesProps } from "@/navigation/app.routes";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, VStack } from "native-base";
import { BoxSeries } from "./components/BoxSeries";
import { Header } from "./components/Header";
import { ExerciseImage } from "./components/Image";

export const Exercise = () => {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const handleNavigateToHome = () => {
    navigation.goBack();
  };
  return (
    <VStack flex={1}>
      <Header onPress={handleNavigateToHome} />
      <ScrollView>
        <VStack p={8}>
          <ExerciseImage />
          <BoxSeries />
        </VStack>
      </ScrollView>
    </VStack>
  );
};
