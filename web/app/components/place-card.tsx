import { Flex, Paper, Image, Box, ThemeIcon, Text, Button, Space } from "@mantine/core";
import { IconMap } from "@tabler/icons-react"
import { PlaceDrawer } from "./place-drawer";

export function PlaceCard() {
  return (
    <Paper shadow="md" radius="lg" display="inline-block" p="md">
      <Flex direction="column">
        <Image radius="md" maw="250px" src="https://diregional.com.br/files/42738/053ddec104a3e7da2401deee5365b510" alt="" />
        <Space h="md"/>
        <Flex align="center">
          <ThemeIcon color="green" radius="xs" size="lg">
            <IconMap style={{ width: '70%', height: '70%' }} />
          </ThemeIcon>
          <Space w="md"/>
          <Box>
            <Text fw={700}>Biblioteca</Text>
            <Text size="sm">Estudo</Text>
          </Box>
        </Flex>
        <Space h="sm"/>
        <Text>Local de estudo e silêncio</Text>
        <Space h="sm"/>
        <PlaceDrawer />
        <Space h="sm"/>
        <Button variant="default" radius="sm" fullWidth>
          Ver rota  
        </Button>
      </Flex>
    </Paper>

  )
}