//@ts-check
import { Box, Center, Divider, Flex, Stack, Text } from '@chakra-ui/react';
import { Form, Input, Button, Checkbox, Col, Row } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../Services/user-service';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const Login = ({}) => {
    const navigate = useNavigate();

    const handleOnSummit = async (values) => {
        const response = await login(values.username, values.password);
        if (response.ok) {
            // setIsLoading(false);
            let responseUser = await response.json();
            localStorage.setItem('user', JSON.stringify(responseUser));
            // updateUserInfo();
            navigate('/');
        } else {
            // setIsLoading(false);
            // setLoginNoMatch(true);
        }
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
                        style={{width: 600}}
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true
                        }}
                        onFinish={handleOnSummit}>
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!'
                                }
                            ]}>
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Username"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!'
                                }
                            ]}>
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <a href="">register now!</a>
                        </Form.Item>
                    </Form>
                </Stack>
            </Center>
        </Flex>
    );
};

export default Login;
