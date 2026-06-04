import { Box } from "@mantine/core";
import { FiltersCard } from "./components/filters-card";
import { PlaceCard } from "./components/place-card";
import { Map } from "./components/map";

export default function Home() {
  return (
    <Box pos="relative" h="100vh">
      <Map />
      <Box pos="absolute" mx="lg" my="md">
        <FiltersCard />
      </Box>
      <Box pos="absolute" right={0} top={0} mx="lg" my="md" >
        <PlaceCard /> 
      </Box>
    </Box>
  );
}
