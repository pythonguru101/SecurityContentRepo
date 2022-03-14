//@ts-check
import { Box, Center, Divider, Flex, Stack, Text } from '@chakra-ui/react';
import { Form, Input, Button, Checkbox, Col, Row } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyProfile, login } from '../Services/user-service';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { GlobalContext } from '..';

const Login = ({}) => {
    const navigate = useNavigate();
    const [loginNoMatchText, setLoginNoMatchText] = useState('');
    const { setUserInfo } = useContext(GlobalContext);

    useEffect(() => {
        setUserInfo({});
        localStorage.removeItem('user');
    }, []);

    const handleOnSummit = async (values) => {
        const response = await login(values.username, values.password);
        if (response.ok) {
            // setIsLoading(false);
            let responseUser = await response.json();
            localStorage.setItem('user', JSON.stringify(responseUser));
            const { data: myProfile } = await getMyProfile();
            var user = {
                ...myProfile,
                ...responseUser
            };
            localStorage.setItem('user', JSON.stringify(user));
            setUserInfo(user);
            // updateUserInfo();
            navigate('/');
        } else {
            // setIsLoading(false);
            if (response.status == 401) {
                setLoginNoMatchText("Username or password didn't match");
            } else {
                setLoginNoMatchText('Something went wrong communicating with the server');
            }
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
                    {loginNoMatchText && (
                        <Text textAlign={'center'} color={'red'}>
                            {loginNoMatchText}
                        </Text>
                    )}
                    <Form
                        style={{ width: 600 }}
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true
                        }}
                        onChange={() => setLoginNoMatchText('')}
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
                        </Form.Item>
                    </Form>
                </Stack>
            </Center>
        </Flex>
    );
};

export default Login;
