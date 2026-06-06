"use client"

import { ActionIcon, Image, Button, Center, Drawer, Flex, Tabs, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconShare, IconChevronLeft } from "@tabler/icons-react"
import { useState } from "react";

type DrawerProps = {
  opened: boolean;
  onClose: () => void;
}

export function PlaceDrawer(props: DrawerProps) {
  return (
    <>
      <Drawer.Root opened={props.opened} onClose={props.onClose} position="right">
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
            
            <Image radius="md" my="md" mah="200px" src="https://diregional.com.br/files/42738/053ddec104a3e7da2401deee5365b510" alt="" />

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
    </>
  )
}