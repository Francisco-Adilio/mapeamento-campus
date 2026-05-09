import { Box } from "@mantine/core";
import { FiltersCard } from "./components/filters-card";
import { PlaceCard } from "./components/place-card";

export default function Home() {
  return (
    <Box pos="relative">
      <Box mx="lg" my="md">
        <FiltersCard />
      </Box>
      <Box pos="absolute" right={0} top={0} mx="lg" my="md" >
        <PlaceCard /> 
      </Box>
    </Box>
  );
}
