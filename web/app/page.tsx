"use client";

import { Box } from "@mantine/core";
import { PlaceCard } from "./components/place-card";
import { Map } from "./components/map";
import { Suspense, useState } from "react";
import { Place } from "./models/place.model";

export default function Home() {
  const [placeCardOpened, setPlaceCardOpened] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const [pathPoints, setPathPoints] = useState<number[]>([])

  return (
    <Box pos="relative" h="100vh">
      <Suspense>
        <Map
          onPlaceCardOpen={(place) => {
            setSelectedPlace(place);
            setPlaceCardOpened(true);
          }}
          onPlaceCardClose={() => {
            setPlaceCardOpened(false);
          }}
          pathPoints={pathPoints}
        />
      </Suspense>
        {/* <Box pos="absolute" mx="lg" my="md">
          <FiltersCard />
        </Box> */}

        <Box pos="absolute" right={0} top={0} mx="lg" my="md">
          <Suspense>
            <PlaceCard
              opened={placeCardOpened}
              place={selectedPlace}
              onSetPathPoints={(points) => setPathPoints(points)}
            />
          </Suspense>
        </Box>
    </Box>
  );
}