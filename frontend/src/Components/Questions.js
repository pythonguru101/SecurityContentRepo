//@ts-check
import { Box, Button, Flex, Stack, Text, useBoolean } from '@chakra-ui/react';
import { List } from 'antd';
import Search from 'antd/lib/input/Search';
import React from 'react';
import CreateQuestion from './CreateQuestion';

const bg = '#262626';

const data = [
    {
        title: 'How many smartphone/tablet assets do we have?',
        cat: 'Inventory'
    },
    {
        title: 'How many of our desktops are running Firefox?',
        cat: 'Threat Landscape'
    },
    {
        title: 'Which critical assets have users logging in with weak passwords?',
        cat: 'Vulnerability '
    },
    {
        title: 'Which assets in my enterprise are susceptible to Sambacry?',
        cat: 'Threat Landscape'
    }
];

const Questions = () => {
    const [showCreateQuestion, toggleCreateQuestion] = useBoolean();
    return (
        <Flex w={'full'} p={4} flexDirection={'column'}>
            {showCreateQuestion && <CreateQuestion onClose={() => toggleCreateQuestion.off()} />}
            <Flex w={'full'} justifyContent={'space-between'} alignItems={"center"} bg={'gray.900'} px={6} py={4} mb={4}>
                <Text fontSize={'2xl'}>Questions</Text>
                <Stack direction={"row"} alignItems={"center"} spacing={6}>
                    <Search size='large' width={600} placeholder="Search questions" onSearch={() => {}} enterButton />
                    <Button minW={160} onClick={() => toggleCreateQuestion.on()}>Create Question</Button>
                </Stack>
            </Flex>
            <Flex w={'full'} flex={1} bg={'gray.900'} px={6} py={4}>
                <List
                    style={{ width: '100%' }}
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                title={<a href="#">{item.title}</a>}
                                description={item.cat}
                            />
                        </List.Item>
                    )}
                />
            </Flex>
        </Flex>
    );
};

export default Questions;
