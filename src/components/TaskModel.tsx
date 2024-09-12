// TaskModal.tsx
import React, { ChangeEvent, FormEvent } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { Task } from '../types'; // Certifique-se de importar Task

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  taskId?: number; // Deve ser opcional ou incluir `undefined`
  inputs: {
    title: string;
  };
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, inputs, handleChange, handleSubmit, taskId }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{taskId ? "Atualizar Tarefa" : "Adicionar Tarefa"}</ModalHeader>
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormControl id="task-title" mb="4">
              <FormLabel fontSize="lg" fontWeight="bold" color="teal.600">
                Título da Tarefa
              </FormLabel>
              <Input
                name="title"
                type="text"
                onChange={handleChange}
                value={inputs.title || ''}
                placeholder="Título da tarefa"
                focusBorderColor="teal.400"
                size="lg"
                variant="filled"
                bg="white"
                _hover={{ bg: "gray.100" }}
                color="gray.700"
              />
              <FormHelperText>Digite o título da tarefa.</FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={2} type="submit">
              {taskId ? "Atualizar Tarefa" : "Adicionar Tarefa"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default TaskModal;