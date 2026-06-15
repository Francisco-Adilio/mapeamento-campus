"use client"

import { Flex, Paper, Image, Box, ThemeIcon, Text, Button, Space } from "@mantine/core";
import { Carousel } from "@mantine/carousel"; // Importamos o Carrossel do Mantine
import { IconMap } from "@tabler/icons-react";
import { PlaceDrawer } from "./place-drawer";
import { useState } from "react";

// Importação obrigatória dos estilos do carrossel do Mantine
import '@mantine/carousel/styles.css';
import { ReadonlyURLSearchParams, usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { Place } from "../models/place.model";
import { findShortestPath } from "../utils/findShortestPath";

type PlaceCardProps = {
  opened: boolean;
  place: Place | null;
  current: number | null
  onSetPathPoints: (points: number[]) => void;
};

export function PlaceCard(props: PlaceCardProps) {
  const [drawerOpened, setDrawerOpened] = useState(false);


  if (!props.opened || !props.place) return null;

  function onRoutesClick() {
    if(!props.place) return
    const shortestPath = findShortestPath(props.current || 1, props.place.id)
    if(!shortestPath) {
      return
    }
    const { path, totalDistance } = shortestPath
    props.onSetPathPoints(path)
  }

  return (
    <Paper
      shadow="md"
      radius="lg"
      display="inline-block"
      p="md"
      maw={350}
      mah="80vh"
      style={{
        overflowY: 'auto'
      }}
    >
      <Flex direction="column">
        
        {/* CARROSSEL SUBSTITUINDO A IMAGEM ESTÁTICA */}
        <Box maw="320px" w="100%">
          <Carousel 
            withIndicators // Adiciona as bolinhas de paginação embaixo
            loop           // Faz o carrossel voltar ao início ao chegar no fim
            align="start"
            slideGap="md"
          >
            {props.place.images?.map((url, index) => (
              <Carousel.Slide key={index}>
                <Image
                  radius="md"
                  src={url}
                  alt={`${props.place?.name} - Foto ${index + 1}`}
                  height={200} // Altura fixa para as imagens ficarem alinhadas
                  fit="cover"  // Garante que a imagem preencha o espaço sem distorcer
                />
              </Carousel.Slide>
            ))}
          </Carousel>
        </Box>

        <Space h="md" />

        <Flex align="center">
          <ThemeIcon color="green" radius="xs" size="lg">
            <IconMap style={{ width: "70%", height: "70%" }} />
          </ThemeIcon>

          <Space w="md" />

          <Box>
            <Text fw={700}>{props.place.name}</Text>
            <Text size="sm">{props.place.category}</Text>
          </Box>
        </Flex>

        <Space h="sm" />

        <Text>{props.place.description}</Text>

        <Space h="sm" />

        <Button
          onClick={() => setDrawerOpened(true)}
          variant="filled"
          color="green"
          radius="sm"
          fullWidth
        >
          Ver detalhes
        </Button>

        <PlaceDrawer
          opened={drawerOpened}
          onClose={() => setDrawerOpened(false)}
          place={props.place}
        />

        <Space h="sm" />

        <Button variant="default" radius="sm" fullWidth onClick={onRoutesClick}>
          Ver rota
        </Button>
      </Flex>
    </Paper>
  );
}