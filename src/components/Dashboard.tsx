import React, { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from 'react';
import api from '../services/api';
import qs from 'qs';
import {
  Box,
  Heading,
  Button,
  Alert,
  AlertIcon,
  VStack,
  HStack,
  Text,
  IconButton,
  useToast,
  Spinner,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import TaskModal from './TaskModel';
import EnterRoomModel from './EnterRoomModel';

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
  const [isModalEnterRoomOpen, setIsModalEnterRoomOpen] = useState<boolean>(false);
  const toast = useToast();
  const groupId = localStorage.getItem('groupId');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
  };

  const handleGetTasks = async () => {
    setLoading(true);

    try {
      const response = await api.get(`/${groupId}/tasks`);
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

  const handleCreateRoomSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const response = await api.get("/");

      if (response.status === 200) {
        toast({
          title: `Grupo criado com sucesso, seu código de acesso é ${response.data.data.groupTask.id}.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setInputs({});
        handleGetTasks();
        setIsModalEnterRoomOpen(false);
        localStorage.setItem("groupId", response.data.data.groupTask.id);
      }
    } catch (error) {
      toast({
        title: "Ocorreu algum problema, tente novamente!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEnterRoomSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputs.code) {
      toast({
        title: "Preencha todos os campos do formulário.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await api.post("/", qs.stringify({
        'code': inputs.code
      }));

      if (response.status === 200) {
        toast({
          title: `Você entrou no seu grupo.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setInputs({});
        handleGetTasks();
        setIsModalEnterRoomOpen(false);
        localStorage.setItem("groupId", response.data.data.groupTask.id);
      }
    } catch (error) {
      toast({
        title: "Ocorreu algum problema, tente novamente!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  const handleUpdateTaskSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

    if (selectedTaskId === undefined) return;

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
      await api.put(`/${groupId}/tasks/${selectedTaskId}`, qs.stringify({
        'title': inputs.title,
      }), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      toast({
        title: "Tarefa atualizada com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setInputs({});
      handleGetTasks();
      setIsModalOpen(false);
      setSelectedTaskId(undefined);
    } catch (error) {
      toast({
        title: "Ocorreu algum problema, tente novamente!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const openModalForUpdate = (task: Task) => {
    setInputs({ title: task.title });
    setSelectedTaskId(task.id);
    setIsModalOpen(true);
  };

  useEffect(() => {
    handleGetTasks();
  }, [groupId]);

  useEffect(() => {
    if (groupId) {
      setIsModalEnterRoomOpen(false);
    } else {
      setIsModalEnterRoomOpen(true);
    }
  }, [groupId]);

  const cardBg = useColorModeValue('white', 'gray.800');
  const shadow = useColorModeValue('md', 'md-dark');
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <VStack p="4" spacing="4" align="stretch">
      <HStack spacing="4" justify="space-between">
        <Heading size="lg">Task Flicker</Heading>
        <Button colorScheme="teal" onClick={() => setIsModalOpen(true)}>Adicionar Tarefa</Button>
      </HStack>

      {loading ? (
        <Flex height="100vh" align="center" justify="center">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Box>
          {tasks.length ? (
            <VStack spacing="4" align="stretch">
              {tasks.map(task => (
                <Box
                  key={task.id}
                  p="4"
                  bg={cardBg}
                  borderRadius="md"
                  shadow={shadow}
                  borderWidth="1px"
                  borderColor={borderColor}
                >
                  <HStack justify="space-between" align="center">
                    <Text fontWeight="bold" fontSize="lg">
                      {task.title}
                    </Text>
                    <HStack spacing="2">
                      <IconButton
                        icon={<EditIcon />}
                        colorScheme="teal"
                        aria-label="Editar Tarefa"
                        onClick={() => openModalForUpdate(task)}
                        variant="solid"
                        size="sm"
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        aria-label="Excluir Tarefa"
                        onClick={() => handleDeleteTask(task.id)}
                        variant="solid"
                        size="sm"
                      />
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

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        handleChange={handleChange}
        handleSubmit={selectedTaskId ? handleUpdateTaskSubmit : handleAddTaskSubmit}
        taskId={selectedTaskId}
        inputs={{ title: inputs.title }}
      />

      <EnterRoomModel
        isOpen={isModalEnterRoomOpen}
        onClose={() => setIsModalEnterRoomOpen(false)}
        handleChange={handleChange}
        handleSubmit={handleEnterRoomSubmit}
        handleCreateRoom={handleCreateRoomSubmit}
      />
    </VStack>
  );
};

export default Dashboard;