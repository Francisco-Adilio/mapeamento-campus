"use client";

import { Box, Divider, Flex, Input, List, Paper, Text } from "@mantine/core";

export function FiltersCard() {
  return (
      <Paper shadow="md" radius="lg" display="inline-block" p="lg">
        <Flex direction="column">
          <Text size="lg" fw={600} mb="md">Encontre um lugar</Text>
          <Input placeholder="Procure um lugar..." />
          <Divider my="md" size="sm"/>
          <Text size="md" fw={500} mb="md">Categorias</Text>
          <List
            size="md"
            icon={
              <Box component="div" bdrs="50%" w="10px" h="10px" bg="red"></Box>
            }
          >
            <List.Item>Convivência</List.Item>
            <List.Item>Administrativo</List.Item>
            <List.Item>Circuito Sustentável</List.Item>
          </List>
        </Flex>
      </Paper>
  )
}