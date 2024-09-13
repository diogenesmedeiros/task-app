import React, { ChangeEvent, FormEvent, MouseEvent } from 'react';
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

interface EnterRoomModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onCreate: (e: MouseEvent<HTMLButtonElement>) => void;
    inputs: { [key: string]: string };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const EnterRoomModal: React.FC<EnterRoomModalProps> = ({ isOpen, onClose, onSubmit, onCreate, inputs, onInputChange }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Entrar no Grupo</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={onSubmit}>
                    <ModalBody>
                        <FormLabel htmlFor="code">Código do Grupo</FormLabel>
                        <Input id="code" name="code" value={inputs.code || ''} onChange={onInputChange} placeholder="Código do grupo" />
                        <FormLabel htmlFor="code">Senha do grupo</FormLabel>
                        <Input id="password" name="password" value={inputs.password || ''} onChange={onInputChange} placeholder="Senha do grupo" />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" type="submit">
                            Entrar
                        </Button>
                        <Button variant="ghost" onClick={onCreate} ml={3}>
                            Criar Grupo
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

export default EnterRoomModal;