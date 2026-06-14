"use client";

import { Box } from "@mantine/core";
import { FiltersCard } from "./components/filters-card";
import { PlaceCard } from "./components/place-card";
import { Map } from "./components/map";
import { useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { Place } from "./models/place.model";

export default function Home() {
  const [placeCardOpened, setPlaceCardOpened] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const searchParams = useSearchParams()
  const currentSearchParam = searchParams.get('current')
  const current = currentSearchParam ? parseInt(currentSearchParam) : null

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
        current={current}
      />

      <Box pos="absolute" mx="lg" my="md">
        <FiltersCard />
      </Box>

      <Box pos="absolute" right={0} top={0} mx="lg" my="md">
        <PlaceCard
          opened={placeCardOpened}
          place={selectedPlace}
          current={current}
        />
      </Box>
    </Box>
  );
}