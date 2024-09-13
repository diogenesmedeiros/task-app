import React, { ChangeEvent, FormEvent } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
  FormLabel
} from "@chakra-ui/react";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  inputs: { [key: string]: string };
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSubmit, inputs, onInputChange }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{inputs.id ? 'Atualizar Tarefa' : 'Adicionar Tarefa'}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={onSubmit}>
          <ModalBody>
            <FormLabel htmlFor="title">Título</FormLabel>
            <Input
              id="title"
              name="title"
              value={inputs.title || ''}
              onChange={onInputChange}
              placeholder="Título da tarefa"
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" type="submit">
              {inputs.id ? 'Atualizar' : 'Adicionar'}
            </Button>
            <Button variant="ghost" onClick={onClose} ml={3}>
              Cancelar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default TaskModal;