//@ts-check
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
    Select
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { getCategories } from '../Services/category-service';
import { createQuestion } from '../Services/question-service';
import { Form, Button } from 'antd';

const CreateQuestion = ({ onClose }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [question, setQuestion] = useState('');

    useEffect(() => {
        onFetchCategories();
    }, []);

    const onFetchCategories = async () => {
        try {
            const { data: cats } = await getCategories();
            setCategories(cats);
            setSelectedCategory(cats[0].id);
        } catch (error) {}
    };

    const onCreateQuestion = async (values) => {
        try {
            var payload = {
                text: values.question,
                category: values.category === 0 ? categories[0].id : values.category,
                tenant: 2
            };
            await createQuestion(payload);
            onClose();
        } catch (error) {}
    };

    return (
        <Modal isOpen={true} onClose={onClose} size={'4xl'} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create Question</ModalHeader>
                <ModalCloseButton />
                <ModalBody pt={4}>
                    <Stack direction={'column'} spacing={4}>
                        <Form
                            name="basic"
                            layout={'vertical'}
                            onFinish={onCreateQuestion}
                            onFinishFailed={() => {}}
                            initialValues={{
                                category: categories && categories.length > 0 ? categories[0].id : 0
                            }}
                            autoComplete="off">
                            <Form.Item
                                label="Question"
                                name="question"
                                help="Enter a concise but well explained Question"
                                rules={[
                                    {
                                        required: true,
                                        min: 6,
                                        max: 120,
                                        message: 'Question should be between 5 to 120 character'
                                    }
                                ]}
                                style={{ marginBottom: 12 }}>
                                <TextArea
                                    name={'question'}
                                    showCount
                                    maxLength={120}
                                    placeholder="Enter your question here"
                                    autoSize={{ minRows: 2, maxRows: 3 }}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Category"
                                name="category"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select a category'
                                    }
                                ]}>
                                <Select name="category">
                                    {categories.map((cat) => {
                                        return (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.category}
                                            </option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'right' }}>
                                <Button type="primary" htmlType="submit" size="large">
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

export default CreateQuestion;
