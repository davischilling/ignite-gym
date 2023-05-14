import { Heading, VStack, SectionList, Text } from "native-base";
import { Header } from "@/presentation/components/index";
import { HistoryCard } from "./components";
import { EXERCISES } from "./data";

export const History = () => (
  <VStack flex={1}>
    <Header title="Histórico de Exercícios" />

    <SectionList
      sections={EXERCISES}
      keyExtractor={({ exercise }) => exercise}
      renderItem={({ item: { group, exercise } }) => (
        <HistoryCard group={group} exercise={exercise} />
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Heading color="gray.200" fontSize="md" mt={10} mb={3} fontFamily="heading">
          {title}
        </Heading>
      )}
      contentContainerStyle={
        EXERCISES.length === 0 && { flex: 1, justifyContent: "center" }
      }
      ListEmptyComponent={() => (
        <Text color="gray.100" textAlign="center">
          Nenhum há exercícios registrados ainda.{'\n'} Vamos fazer exercícios hoje?
        </Text>
      )}
      showsVerticalScrollIndicator={false}
      px={4}
    />
  </VStack>
);
