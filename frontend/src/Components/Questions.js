//@ts-check
import { Box, Button, Flex, Stack, Text, useBoolean } from '@chakra-ui/react';
import { List, Tag } from 'antd';
import Search from 'antd/lib/input/Search';
import React, { useEffect, useState } from 'react';
import { deleteQuestion, getAnswers, getQuestions } from '../Services/question-service';
import SearchCustom from './Common/SearchCustom';
import CreateAnswer from './CreateAnswer';
import CreateQuestion from './CreateQuestion';
import debounce from 'lodash.debounce';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const bg = '#1f1f1f';

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
    const [answers, setAnswers] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        onFetch();
    }, []);

    const onFetch = async (search = '') => {
        onFetchAnswers();
        onFetchQs(search);
    };

    const onFetchAnswers = async () => {
        try {
            const { data: answers } = await getAnswers();
            setAnswers(answers || []);
        } catch (error) {}
    };

    const onFetchQs = async (search = '') => {
        try {
            setIsLoading(true);
            setSearchText(search);
            const { data: questions } = await getQuestions(search);
            setQuestions(questions || []);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const debouncedSearch = debounce(async (value) => {
        await onFetchQs(value);
    }, 300);

    const onDelete = async (id) => {
        try {
            await deleteQuestion(id);
            await onFetchQs(searchText);
        } catch (error) {}
    };

    const showDeleteConfirm = (id) => {
        confirm({
            title: 'Are you sure delete this?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                await onDelete(id);
            },
            onCancel() {}
        });
    };

    return (
        <Flex w={'full'} p={4} flexDirection={'column'}>
            {showCreateQuestion && (
                <CreateQuestion
                    onClose={() => {
                        toggleCreateQuestion.off();
                        onFetch(searchText);
                    }}
                />
            )}
            {showCreateAnswer && (
                <CreateAnswer
                    onClose={() => {
                        toggleCreateAnswer.off();
                        onFetch(searchText);
                    }}
                    question={selectedQuestion}
                />
            )}
            <Flex
                w={'full'}
                justifyContent={'space-between'}
                alignItems={'center'}
                bg={bg}
                px={6}
                py={4}
                mb={4}>
                <Text fontSize={'2xl'}>Questions</Text>
                <Stack direction={'row'} alignItems={'center'} spacing={6}>
                    <SearchCustom
                        onSearch={(value) => {
                            onFetchQs(value);
                        }}
                        onChange={debouncedSearch}
                    />
                    <Button minW={160} onClick={() => toggleCreateQuestion.on()}>
                        Create Question
                    </Button>
                </Stack>
            </Flex>
            <Flex w={'full'} flex={1} bg={bg} px={6} py={4}>
                <List
                    style={{ width: '100%' }}
                    header={
                        searchText ? (
                            <Text fontSize={'xl'}>{`Showing results for "${searchText}"`}</Text>
                        ) : null
                    }
                    itemLayout="vertical"
                    dataSource={questions}
                    loading={isLoading}
                    renderItem={(item) => {
                        const isAnswered = answers.some((x) => x.question.id === item.id);
                        return (
                            <List.Item
                                className="question-row"
                                extra={
                                    <Stack
                                        direction={'row'}
                                        visibility={'hidden'}
                                        sx={{
                                            '.question-row:hover &': {
                                                visibility: 'visible'
                                            }
                                        }}>
                                        {!isAnswered && (
                                            <Button
                                                variant={'solid'}
                                                onClick={() => {
                                                    setSelectedQuestion(item);
                                                    toggleCreateAnswer.on();
                                                }}>
                                                Answer
                                            </Button>
                                        )}
                                        <Button
                                            variant={'outline'}
                                            colorScheme={'red'}
                                            onClick={() => showDeleteConfirm(item.id)}>
                                            Delete
                                        </Button>
                                    </Stack>
                                }>
                                <List.Item.Meta
                                    title={
                                        <Stack direction={'row'}>
                                            <a
                                                onClick={() => {
                                                    if (isAnswered) return;
                                                    setSelectedQuestion(item);
                                                    toggleCreateAnswer.on();
                                                }}>
                                                {item.text}
                                            </a>
                                            {isAnswered && <Tag color="success">Answered</Tag>}
                                        </Stack>
                                    }
                                    description={item.category.category}
                                />
                            </List.Item>
                        );
                    }}
                />
            </Flex>
        </Flex>
    );
};

export default Questions;
