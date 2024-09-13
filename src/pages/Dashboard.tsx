import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import api from '../services/api';
import qs from 'qs';
import {
  Box,
  Heading,
  Button,
  VStack,
  HStack,
  Text,
  IconButton,
  useToast,
  Spinner,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import TaskModal from '../components/TaskModel';
import EnterRoomModal from '../components/EnterRoomModel';
import CreateRoomModel from '../components/CreateRoomModel';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTaskId, setSelectedTaskId] = useState<number | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState<boolean>(false);
  const [isModalEnterRoomOpen, setIsModalEnterRoomOpen] = useState<boolean>(false);
  const toast = useToast();
  const groupId = localStorage.getItem('groupId');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
  };

  const handleCreateRoomOpen = () => {
    setIsCreateRoomModalOpen(true);
  };

  const handleGetTasks = async () => {
    setLoading(true);

    try {
      const response = await api.get(`/56155/tasks`);
      setTasks(response.data.data.tasks);
    } catch (error) {
      toast({
        title: "Aconteceu algum erro, tente novamente",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (!groupId) {
      toast({
        title: "Grupo não encontrado.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await api.delete(`/${groupId}/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
      toast({
        title: "Tarefa excluída com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Aconteceu algum erro, tente novamente",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddTaskSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputs.title) {
      toast({
        title: "Preencha todos os campos do formulário.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!groupId) {
      toast({
        title: "Grupo não encontrado.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await api.post(`/${groupId}/tasks`, qs.stringify({
        'title': inputs.title,
      }), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      toast({
        title: "Tarefa adicionada com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setInputs({});
      handleGetTasks();
      setIsModalOpen(false);
    } catch (error) {
      toast({
        title: "Ocorreu algum problema, tente novamente!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCreateRoomSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await api.post("/", qs.stringify({
        'password': inputs.password
      }), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      if (response.status === 200) {
        toast({
          title: `Grupo criado com sucesso, seu código de acesso é ${response.data.data.groupTask.id}.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setInputs({});
        setIsCreateRoomModalOpen(false);
      } else {
        toast({
          title: "Falha ao criar o grupo.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Ocorreu um erro, tente novamente.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEnterRoomSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await api.post("/join-room", qs.stringify({
        'code': inputs.code,
        'password': inputs.password
      }), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      if (response.status === 200) {
        localStorage.setItem('groupId', response.data.data.groupTask.id);
        toast({
          title: `Entrou no grupo com sucesso.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setInputs({});
        setIsModalEnterRoomOpen(false);
        handleGetTasks();
      } else {
        toast({
          title: "Falha ao entrar no grupo.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Ocorreu um erro, tente novamente.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const cardBg = useColorModeValue('white', 'gray.800');
  const shadow = useColorModeValue('md', 'md-dark');
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const openModalForUpdate = (task: Task) => {
    setInputs({ title: task.title });
    setSelectedTaskId(task.id);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (groupId) {
      handleGetTasks();
    }
  }, [groupId]);

  return (
    <VStack p="4" spacing="4" align="stretch">
      <HStack spacing="4" justify="space-between">
        <Heading size="lg">Task Flicker</Heading>
        {groupId && (
          <Text bottom="4" right="4" backgroundColor="teal.500" color="white" borderRadius="md" p={2}>ID do grupo: {groupId}</Text>
        )}
      </HStack>
      <Flex direction="column" align="center" justify="center">
        <HStack spacing={4}>
          {!groupId ? (
            <>
              <Button colorScheme="teal" size="lg" borderRadius="full" shadow="md" onClick={() => setIsModalEnterRoomOpen(true)}>
                Entrar no Grupo
              </Button>
              <Button colorScheme="teal" size="lg" borderRadius="full" shadow="md" onClick={handleCreateRoomOpen}>
                Criar Grupo
              </Button>
            </>
          ) : (
            <>
              <Button colorScheme="teal" size="lg" borderRadius="full" shadow="md" onClick={() => setIsModalOpen(true)}>
                Adicionar Tarefa
              </Button>
              <Button colorScheme="red" size="lg" borderRadius="full" shadow="md" onClick={() => localStorage.removeItem('groupId')}>
                Sair
              </Button>
            </>
          )}
        </HStack>
      </Flex>
      {loading ? (
        <Flex height="100vh" align="center" justify="center">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Box>
          {tasks.length ? (
            <VStack spacing="4" align="stretch">
              {tasks.map(task => (
                <Box key={task.id} p="4" bg={cardBg} borderRadius="md" shadow={shadow} borderWidth="1px" borderColor={borderColor}>
                  <HStack justify="space-between" align="center">
                    <Text fontWeight="bold" fontSize="lg">
                      {task.title}
                    </Text>
                    <HStack spacing="2">
                      <IconButton icon={<EditIcon />} colorScheme="teal" aria-label="Editar Tarefa" onClick={() => openModalForUpdate(task)} variant="solid" size="sm" />
                      <IconButton icon={<DeleteIcon />} colorScheme="red" aria-label="Excluir Tarefa" onClick={() => handleDeleteTask(task.id)} variant="solid" size="sm" />
                    </HStack>
                  </HStack>
                </Box>
              ))}
            </VStack>
          ) : (
            <Flex height="100vh" align="center" justify="center">
              <Text>Nenhuma tarefa encontrada.</Text>
            </Flex>
          )}
        </Box>
      )}
      <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddTaskSubmit} inputs={inputs} onInputChange={handleChange} />
      <CreateRoomModel isOpen={isCreateRoomModalOpen} onClose={() => setIsCreateRoomModalOpen(false)} onSubmit={handleCreateRoomSubmit} inputs={inputs} onInputChange={handleChange} />
      <EnterRoomModal isOpen={isModalEnterRoomOpen} onClose={() => setIsModalEnterRoomOpen(false)} onSubmit={handleEnterRoomSubmit} onCreate={handleCreateRoomOpen} inputs={inputs} onInputChange={handleChange} />
    </VStack>
  );
};

export default Dashboard;