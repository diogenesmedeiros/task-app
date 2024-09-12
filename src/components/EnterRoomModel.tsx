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
import { ChangeEvent, FormEvent, MouseEvent, useEffect } from "react";

interface EnterRoomModelProps {
    isOpen: boolean;
    onClose: () => void;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    handleCreateRoom: (e: MouseEvent<HTMLButtonElement>) => void;
}

const EnterRoomModel: React.FC<EnterRoomModelProps> = ({ isOpen, onClose, handleChange, handleSubmit, handleCreateRoom }) => {

    useEffect(() => {
        if (isOpen) {
            const groupId = localStorage.getItem('groupId');
            if (groupId) {
                onClose(); // Fecha o modal se groupId estiver presente
            }
        }
    }, [isOpen, onClose]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Entrar na sua área de trabalho</ModalHeader>
                <form onSubmit={handleSubmit}>
                    <ModalBody>
                        <FormControl id="task-title" mb="4">
                            <FormLabel fontSize="lg" fontWeight="bold" color="teal.600">
                                Digite seu código
                            </FormLabel>
                            <Input
                                name="code"
                                type="text"
                                onChange={handleChange}
                                placeholder="Ex: 12345"
                                focusBorderColor="teal.400"
                                size="lg"
                                variant="filled"
                                bg="white"
                                _hover={{ bg: "gray.100" }}
                                color="gray.700"
                            />
                            <FormHelperText>Forneça seu código.</FormHelperText>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="teal" mr={2} type="submit">
                            Entrar na área de trabalho
                        </Button>
                        <Button colorScheme="teal" mr={2} onClick={handleCreateRoom}>
                            Criar nova área de trabalho
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default EnterRoomModel;