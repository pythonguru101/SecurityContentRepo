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
    Stack,
    Select
} from '@chakra-ui/react';
import TextareaAutosize from 'react-textarea-autosize';
import React, { useEffect, useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { getCategories } from '../Services/category-service';
import { createAnswer, createQuestion } from '../Services/question-service';
// import { Select } from 'antd';

// const { Option } = Select;

const CreateAnswer = ({ onClose, question = null }) => {
    const [answer, setAnswer] = useState('');

    useEffect(() => {}, []);

    const onCreateAnswer = async () => {
        try {
            var payload = {
                text: answer
            };
            // await createAnswer(payload);
            onClose();
        } catch (error) {}
    };

    return (
        <Modal isOpen={true} onClose={onClose} size={'4xl'} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create answer</ModalHeader>
                <ModalCloseButton />
                <ModalBody pt={4}>
                    <Stack direction={'column'} spacing={4}>
                        <FormControl>
                            <FormLabel htmlFor="text">Question</FormLabel>
                            <TextArea
                                // value={value}
                                // onChange={this.onChange}
                                readOnly
                                name={'text'}
                                // showCount
                                // maxLength={120}
                                placeholder="Enter your question here"
                                autoSize={{ minRows: 2, maxRows: 3 }}
                                value={question?.text || ""}
                            />
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
                                onChange={(event) => {
                                    setAnswer(event.target.value);
                                }}
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
                    <Button minW={120} onClick={onCreateAnswer}>
                        Answer
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default CreateAnswer;
