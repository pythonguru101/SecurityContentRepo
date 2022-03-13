//@ts-check
import { Box, Button, Flex, Stack, Text, useBoolean } from '@chakra-ui/react';
import { List } from 'antd';
import Search from 'antd/lib/input/Search';
import React, { useEffect, useState } from 'react';
import { getQuestions } from '../Services/question-service';
import CreateAnswer from './CreateAnswer';
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
        cat: 'Vulnerability'
    },
    {
        title: 'Which assets in my enterprise are susceptible to Sambacry?',
        cat: 'Threat Landscape'
    }
];

const Questions = () => {
    const [showCreateQuestion, toggleCreateQuestion] = useBoolean();
    const [showCreateAnswer, toggleCreateAnswer] = useBoolean();
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    useEffect(() => {
        onFetch();
    }, []);

    const onFetch = async () => {
        try {
            const { data: questions } = await getQuestions();
            setQuestions(questions);
        } catch (error) {}
    };
    return (
        <Flex w={'full'} p={4} flexDirection={'column'}>
            {showCreateQuestion && <CreateQuestion onClose={() => toggleCreateQuestion.off()} />}
            {showCreateAnswer && (
                <CreateAnswer
                    onClose={() => toggleCreateAnswer.off()}
                    question={selectedQuestion}
                />
            )}
            <Flex
                w={'full'}
                justifyContent={'space-between'}
                alignItems={'center'}
                bg={'gray.900'}
                px={6}
                py={4}
                mb={4}>
                <Text fontSize={'2xl'}>Questions</Text>
                <Stack direction={'row'} alignItems={'center'} spacing={6}>
                    <Search
                        size="large"
                        width={600}
                        placeholder="Search questions"
                        onSearch={() => {}}
                        enterButton
                    />
                    <Button minW={160} onClick={() => toggleCreateQuestion.on()}>
                        Create Question
                    </Button>
                </Stack>
            </Flex>
            <Flex w={'full'} flex={1} bg={'gray.900'} px={6} py={4}>
                <List
                    style={{ width: '100%' }}
                    itemLayout="horizontal"
                    dataSource={questions}
                    renderItem={(item) => (
                        <List.Item
                            extra={
                                <Button
                                    variant={'outline'}
                                    onClick={() => {
                                        setSelectedQuestion(item);
                                        toggleCreateAnswer.on();
                                    }}>
                                    Answer
                                </Button>
                            }>
                            <List.Item.Meta
                                title={<a href="#">{item.text}</a>}
                                description={item.category.category}
                            />
                        </List.Item>
                    )}
                />
            </Flex>
        </Flex>
    );
};

export default Questions;
