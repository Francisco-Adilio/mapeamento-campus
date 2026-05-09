"use client";

import { Box, Divider, Flex, Input, List, Paper, Title } from "@mantine/core";

export function FiltersCard() {
  return (
      <Paper shadow="md" radius="lg" display="inline-block" p="lg">
        <Flex direction="column">
          <Title order={5} mb="md">Encontre um lugar</Title>
          <Input placeholder="Procure um lugar..." />
          <Divider my="md" size="sm"/>
          <Title order={6} mb="md">Categorias</Title>
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