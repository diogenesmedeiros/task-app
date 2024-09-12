import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { FaRegFrown } from 'react-icons/fa';

const NotFound: React.FC = () => {
  return (
    <VStack
      height="100vh"
      justify="center"
      align="center"
      spacing={4}
      bg="gray.50"
      p={4}
    >
      <Box textAlign="center">
        <center>
          <FaRegFrown size="5em" color="gray.500" />
        </center>
        <Heading as="h1" size="2xl" mt={4} mb={2}>
          404 - Página Não Encontrada
        </Heading>
        <Text fontSize="lg" mb={4}>
          A página que você está procurando não existe. Pode ter sido removida ou o URL pode estar incorreto.
        </Text>
        <Button
          colorScheme="teal"
          variant="solid"
          as={Link}
          to="/"
        >
          Voltar para o início
        </Button>
      </Box>
    </VStack>
  );
}

export default NotFound;