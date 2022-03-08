//@ts-check
import { Box, Center, Divider, Flex, Stack, Text } from '@chakra-ui/react';
import { Form, Input, Button, Checkbox, Col, Row } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({}) => {
    const navigate = useNavigate()
    const onFinish = (values) => {
        navigate("/")
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Flex style={{ height: '100%' }} w={'full'}>
            <Center w={'full'} flexDirection={'column'}>
                <Stack spacing={6}>
                    <Text textAlign={'center'} fontSize="3xl">
                        Login
                    </Text>
                    <Divider mb={6} />
                    <Form
                        name="basic"
                        style={{
                            minWidth: 350,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}
                        labelCol={{}}
                        wrapperCol={{  }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical">
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{ }}>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button  type="primary" htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </Stack>
            </Center>
        </Flex>
    );
};

export default Login;
