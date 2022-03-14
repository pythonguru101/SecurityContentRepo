//@ts-check
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    // Button,
    Stack} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { createAnswer } from '../Services/question-service';
import { Form, Button } from 'antd';

const CreateAnswer = ({ onClose, question = null }) => {
    useEffect(() => {}, []);

    const onCreate = async (values) => {
        try {
            var payload = {
                answer: values.answer,
                question: question.id,
                tenant: 2,
                replied_by: 1
            };
            await createAnswer(payload);
            onClose();
        } catch (error) {}
    };

    return (
        <Modal isOpen={true} onClose={onClose} size={'4xl'} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create Answer</ModalHeader>
                <ModalCloseButton />
                <ModalBody pt={4}>
                    <Stack direction={'column'} spacing={4}>
                        <Form
                            name="basic"
                            layout={'vertical'}
                            onFinish={onCreate}
                            onFinishFailed={() => {}}
                            initialValues={{ question: question?.text || '' }}
                            autoComplete="off">
                            <Form.Item
                                label="Question"
                                name="question"
                                style={{ marginBottom: 12 }}>
                                <TextArea
                                    readOnly
                                    name={'question'}
                                    autoSize={{ minRows: 2, maxRows: 3 }}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Answer"
                                name="answer"
                                help="Enter a concise answer to the question"
                                rules={[
                                    {
                                        required: true,
                                        min: 1,
                                        max: 500,
                                        message: 'Question should be between 1 to 500 character'
                                    }
                                ]}
                                style={{ marginBottom: 12 }}>
                                <TextArea
                                    name={'answer'}
                                    showCount
                                    maxLength={500}
                                    placeholder="Enter your question here"
                                    autoSize={{ minRows: 5, maxRows: 10 }}
                                />
                            </Form.Item>

                            <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'right' }}>
                                <Button type="primary" htmlType="submit" size='large'>
                                    Create
                                </Button>
                            </Form.Item>
                        </Form>
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CreateAnswer;
