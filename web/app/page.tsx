"use client"

import { Box } from "@mantine/core";
import { FiltersCard } from "./components/filters-card";
import { PlaceCard } from "./components/place-card";
import { Map } from "./components/map";
import { useState } from "react";

export default function Home() {
  const [placeCardOpened, setPlaceCardOpened] = useState(false)

  return (
    <Box pos="relative" h="100vh">
      <Map onPlaceCardOpen={() => setPlaceCardOpened(true)} onPlaceCardClose={() => setPlaceCardOpened(false)} />
      <Box pos="absolute" mx="lg" my="md">
        <FiltersCard />
      </Box>
      <Box pos="absolute" right={0} top={0} mx="lg" my="md" >
        <PlaceCard opened={placeCardOpened} /> 
      </Box>
    </Box>
  );
}
