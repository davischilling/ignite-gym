import SeriesSVG from "@/presentation/assets/series.svg";
import { Button } from "@/presentation/components/Button";
import { Box, HStack, Text } from "native-base";

export const BoxSeries = () => (
  <Box bg="gray.600" rounded="md" pb={4} px={4}>
    <HStack alignItems="center" justifyContent="space-around" mb={6} mt={5}>
      <HStack>
        <SeriesSVG />
        <Text color="gray.200" ml={2}>
          3 séries
        </Text>
      </HStack>
      <HStack>
        <SeriesSVG />
        <Text color="gray.200" ml={2}>
          3 séries
        </Text>
      </HStack>
    </HStack>
    <Button title="Marcar como realizado" />
  </Box>
);
