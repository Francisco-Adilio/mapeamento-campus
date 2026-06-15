"use client"

import { Flex, Paper, Image, Box, ThemeIcon, Text, Button, Space } from "@mantine/core";
import { IconMap } from "@tabler/icons-react";
import { PlaceDrawer } from "./place-drawer";
import { useState } from "react";

// Importação obrigatória dos estilos do carrossel do Mantine
import { Place } from "../models/place.model";
import { findShortestPath } from "../utils/findShortestPath";
import { useSearchParams } from "next/navigation";

type PlaceCardProps = {
  opened: boolean;
  place: Place | null;
  onSetPathPoints: (points: number[]) => void;
};

export function PlaceCard(props: PlaceCardProps) {
  const [drawerOpened, setDrawerOpened] = useState(false);

  const searchParams = useSearchParams()
  const currentSearchParam = searchParams.get('current')
  const current = currentSearchParam ? parseInt(currentSearchParam) : null

  if (!props.opened || !props.place) return null;

  function onRoutesClick() {
    if(!props.place) return
    const shortestPath = findShortestPath(current || 1, props.place.id)
    if(!shortestPath) {
      return
    }
    const { path } = shortestPath
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
        
        <Box maw="320px" w="100%">
          <Image
            radius="md"
            src={props.place.images[0]}
            alt={`${props.place?.name} - Foto da capa`}
            mah={200} // Altura fixa para as imagens ficarem alinhadas
            fit="cover"  // Garante que a imagem preencha o espaço sem distorcer
          />
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