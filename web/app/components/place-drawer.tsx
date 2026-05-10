"use client"

import { ActionIcon, Box, Button, Center, Drawer, Flex, Tabs, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconShare, IconChevronLeft } from "@tabler/icons-react"

export function PlaceDrawer() {
  const [opened, {open, close}] = useDisclosure(false)

  return (
    <>
      <Drawer.Root opened={opened} onClose={close} position="right">
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header>
            <Flex>
              <Center>
                <Drawer.CloseButton icon={<IconChevronLeft />} />
                <Drawer.Title>Voltar ao mapa</Drawer.Title>
              </Center>
            </Flex>
            <ActionIcon>
              <IconShare /> 
            </ActionIcon>
          </Drawer.Header>

          <Drawer.Body>
            <Title order={4}>Biblioteca</Title>
            <Text size="sm" color="green">Estudos</Text>

            <Tabs>
              <Tabs.List>
                <Tabs.Tab value="gallery">
                  Gallery
                </Tabs.Tab>
                <Tabs.Tab value="messages">
                  Messages
                </Tabs.Tab>
                <Tabs.Tab value="settings">
                  Settings
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="gallery">
                Gallery tab content
              </Tabs.Panel>

              <Tabs.Panel value="messages">
                Messages tab content
              </Tabs.Panel>

              <Tabs.Panel value="settings">
                Settings tab content
              </Tabs.Panel>
            </Tabs>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>

      <Button onClick={open} variant="filled" color="green" radius="sm" fullWidth>
        Ver detalhes
      </Button>
    </>
  )
}