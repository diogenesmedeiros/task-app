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
    FormLabel
} from "@chakra-ui/react";

interface CreateRoomModelProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    inputs: { [key: string]: string };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CreateRoomModel: React.FC<CreateRoomModelProps> = ({ isOpen, onClose, onSubmit, inputs, onInputChange }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Criar Grupo</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={onSubmit}>
                    <ModalBody>
                        <FormLabel htmlFor="code">Criar grupo</FormLabel>
                        <Input id="password" name="password" value={inputs.password || ''} onChange={onInputChange} placeholder="Senha do grupo" />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" type="submit">
                            Criar
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

export default CreateRoomModel;