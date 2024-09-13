import React from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

const PrivacyPolicy: React.FC = () => {
    return (
        <Box p={8} maxW="1000px" mx="auto" my={12}>
            <VStack spacing={6} align="start">
                <Heading as="h1" size="xl" mb={4}>
                    Política de Privacidade
                </Heading>

                <Text fontSize="lg">
                    Bem-vindo à nossa Política de Privacidade. Esta política descreve como
                    lidamos com suas informações pessoais ao usar nosso site.
                </Text>

                <Heading as="h2" size="lg" mt={6} mb={2}>
                    Coleta de Informações
                </Heading>
                <Text>
                    Coletamos diferentes tipos de informações para vários fins, incluindo
                    para fornecer e melhorar nosso serviço para você.
                </Text>

                <Heading as="h3" size="md" mt={4} mb={2}>
                    Tipos de Dados Coletados
                </Heading>
                <Text>
                    Podemos coletar informações como:
                    <ul>
                        <li>Informações Pessoais: Nome, e-mail, etc.</li>
                    </ul>
                </Text>

                <Heading as="h2" size="lg" mt={6} mb={2}>
                    Uso de Informações
                </Heading>
                <Text>
                    As informações coletadas são usadas para várias finalidades, incluindo:
                    <ul>
                        <li>Para fornecer e manter o serviço</li>
                        <li>Para notificá-lo sobre mudanças no nosso serviço</li>
                        <li>Para fornecer suporte ao cliente</li>
                        <li>Para monitorar o uso do serviço</li>
                    </ul>
                </Text>

                <Heading as="h2" size="lg" mt={6} mb={2}>
                    Segurança de Dados
                </Heading>
                <Text>
                    A segurança de suas informações é importante para nós, mas lembre-se de que nenhum método de transmissão
                    pela Internet ou de armazenamento eletrônico é 100% seguro. Nós nos esforçamos para usar meios comercialmente
                    aceitáveis para proteger suas informações pessoais.
                </Text>

                <Heading as="h2" size="lg" mt={6} mb={2}>
                    Mudanças nesta Política de Privacidade
                </Heading>
                <Text>
                    Podemos atualizar nossa Política de Privacidade de tempos em tempos. Recomendamos que você reveja esta página
                    periodicamente para quaisquer alterações.
                </Text>

                <Heading as="h2" size="lg" mt={6} mb={2}>
                    Contato
                </Heading>
                <Text>
                    Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco.
                </Text>
            </VStack>
        </Box>
    );
};

export default PrivacyPolicy;