"use client"

import {
  ActionIcon,
  Image,
  Button,
  Center,
  Drawer,
  Flex,
  Tabs,
  Text,
  Title,
  Box // Adicionado Box para o container do carrossel
} from "@mantine/core";
import { IconShare, IconChevronLeft } from "@tabler/icons-react";

type Place = {
  id: number;
  name: string;
  category: string;
  description: string;
  details: string;
  link?: string;
  images: string[]; // Alterado para array de strings para bater com o PlaceCard
};

type DrawerProps = {
  opened: boolean;
  onClose: () => void;
  place: Place | null;
};

export function PlaceDrawer(props: DrawerProps) {
  if (!props.place) return null;

  return (
    <Drawer.Root
      opened={props.opened}
      onClose={props.onClose}
      position="right"
      size="md"
    >
      <Drawer.Overlay />

      <Drawer.Content>
        <Drawer.Header>
          <Flex justify="space-between" align="center" w="100%">
            <Center>
              <Drawer.CloseButton icon={<IconChevronLeft />} />
              <Drawer.Title>Voltar ao mapa</Drawer.Title>
            </Center>

            <ActionIcon variant="subtle">
              <IconShare />
            </ActionIcon>
          </Flex>
        </Drawer.Header>

        <Drawer.Body
          style={{
            maxHeight: 'calc(100vh - 80px)',
            overflowY: 'auto'
          }}
        >
          <Title order={4}>
            {props.place.name}
          </Title>

          <Text size="sm" c="green">
            {props.place.category}
          </Text>

          <Box my="md">
            <Image
              radius="md"
              mah="250px"
              src={props.place.images[0]}
              alt={`${props.place?.name} - Foto da capa`}
              fit="cover"
            />
          </Box>

          <Tabs defaultValue="informacoes">
            <Tabs.List>
              <Tabs.Tab value="informacoes">
                Informações
              </Tabs.Tab>

              <Tabs.Tab value="galeria">
                Galeria
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="informacoes" pt="md">
  {/* O whiteSpace: 'pre-line' garante que os parágrafos apareçam certinhos na tela */}
  <Text style={{ whiteSpace: 'pre-line' }}>
    {props.place.details}
  </Text>
  
  {/* ... resto do código do botão se houver ... */}
</Tabs.Panel>

              {props.place.link && (
                <Button
                  component="a"
                  href={props.place.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="green"
                  mt="md"
                >
                  Saiba mais sobre o projeto
                </Button>
              )}
            

            <Tabs.Panel value="localizacao" pt="md">
              <Text>
                Local selecionado: {props.place.name}
              </Text>
            </Tabs.Panel>

            {/* ABA GALERIA EXIBINDO TODAS AS FOTOS EM LISTA */}
            <Tabs.Panel value="galeria" pt="md">
              <Flex direction="column" gap="md">
                {props.place.images?.map((url, index) => (
                  <Image
                    key={index}
                    radius="md"
                    src={url}
                    alt={`${props.place?.name} Galeria ${index + 1}`}
                    fit="cover"
                  />
                ))}
              </Flex>
            </Tabs.Panel>
          </Tabs>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}