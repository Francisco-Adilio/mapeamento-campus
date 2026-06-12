"use client";

import { Box } from "@mantine/core";
import { FiltersCard } from "./components/filters-card";
import { PlaceCard } from "./components/place-card";
import { Map } from "./components/map";
import { useState } from "react";

type Place = {
  id: number;
  name: string;
  category: string;
  description: string;
  details: string;
  link?: string;
  image: string;
};

export default function Home() {
  const [placeCardOpened, setPlaceCardOpened] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  return (
    <Box pos="relative" h="100vh">
      <Map
      
        onPlaceCardOpen={(place) => {
          setSelectedPlace(place);
          setPlaceCardOpened(true);
        }}
        onPlaceCardClose={() => {
          setPlaceCardOpened(false);
        }}
      />

      <Box pos="absolute" mx="lg" my="md">
        <FiltersCard />
      </Box>

      <Box pos="absolute" right={0} top={0} mx="lg" my="md">
        <PlaceCard
          opened={placeCardOpened}
          place={selectedPlace}
        />
      </Box>
    </Box>
  );
}