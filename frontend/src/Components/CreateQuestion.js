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
    // Button,
    Stack,
    Select
} from '@chakra-ui/react';
import TextareaAutosize from 'react-textarea-autosize';
import React, { useEffect, useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { getCategories } from '../Services/category-service';
import { createQuestion } from '../Services/question-service';
import { Form, Button } from 'antd';
// import { Select } from 'antd';

// const { Option } = Select;

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
                            // labelCol={{ span: 8 }}
                            // wrapperCol={{ span: 16 }}
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
                                {/* <FormLabel htmlFor="question">Question</FormLabel> */}
                                <TextArea
                                    // value={value}
                                    // onChange={this.onChange}

                                    name={'question'}
                                    showCount
                                    maxLength={120}
                                    placeholder="Enter your question here"
                                    autoSize={{ minRows: 2, maxRows: 3 }}
                                    // onChange={(event) => {
                                    //     setQuestion(event.target.value);
                                    // }}
                                />
                                {/* {!false ? (
                                    <FormHelperText>
                                        Enter a concise but well explained Question
                                    </FormHelperText>
                                ) : (
                                    <FormErrorMessage>This field is required</FormErrorMessage>
                                )} */}
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
                                <Select
                                    name="category"
                                    // defaultValue={selectedCategory}
                                    // style={{ width: 120 }}
                                    // allowClear
                                    // value={selectedCategory}
                                    // onChange={(value) => setSelectedCategory(value)}
                                >
                                    {categories.map((cat) => {
                                        return (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.category}
                                            </option>
                                        );
                                    })}
                                </Select>
                                {/* {!false ? (
                                    <FormHelperText>Select the question category</FormHelperText>
                                ) : (
                                    <FormErrorMessage>This field is required</FormErrorMessage>
                                )} */}
                            </Form.Item>
                            {/* <FormControl>
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
                        </FormControl> */}
                            <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'right' }}>
                                <Button type="primary" htmlType="submit">
                                    Create
                                </Button>
                            </Form.Item>
                        </Form>
                    </Stack>
                </ModalBody>
                {/* <ModalFooter pt={8}></ModalFooter> */}
            </ModalContent>
        </Modal>
    );
};

export default CreateQuestion;
