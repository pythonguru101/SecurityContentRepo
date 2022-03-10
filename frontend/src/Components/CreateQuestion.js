//@ts-check
import {
    Box,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Button,
    Stack
} from '@chakra-ui/react';
import TextareaAutosize from 'react-textarea-autosize';
import React from 'react';
import TextArea from 'antd/lib/input/TextArea';

const CreateQuestion = ({ onClose }) => {
    return (
        <Modal isOpen={true} onClose={onClose} size={'4xl'} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create Question</ModalHeader>
                <ModalCloseButton />
                <ModalBody pt={4}>
                    <Stack direction={"column"} spacing={4}>
                        <FormControl>
                            <FormLabel htmlFor="email">Question</FormLabel>
                            <TextArea
                                // value={value}
                                // onChange={this.onChange}
                                showCount
                                maxLength={120}
                                placeholder="Enter your question here"
                                autoSize={{ minRows: 2, maxRows: 3 }}
                            />
                            {!false ? (
                                <FormHelperText>
                                    Enter a concise but well explained Question
                                </FormHelperText>
                            ) : (
                                <FormErrorMessage>This field is required</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="email">Answer</FormLabel>
                            <TextArea
                                // value={value}
                                // onChange={this.onChange}
                                showCount
                                maxLength={500}
                                placeholder="Enter your answer here"
                                autoSize={{ minRows: 5, maxRows: 10 }}
                            />
                            {!false ? (
                                <FormHelperText>
                                    Enter a ellaborate answer to your questoin
                                </FormHelperText>
                            ) : (
                                <FormErrorMessage>This field is required</FormErrorMessage>
                            )}
                        </FormControl>
                    </Stack>
                </ModalBody>
                <ModalFooter pt={8}>
                    <Button minW={120} >Create</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default CreateQuestion;
