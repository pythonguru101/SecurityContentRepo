//@ts-check
import { Box, Button, Flex, Stack, Text, useBoolean } from '@chakra-ui/react';
import { List, Tag } from 'antd';
import Search from 'antd/lib/input/Search';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '..';
import { deleteAnswer, getAnswers, getQuestions } from '../Services/question-service';
import CreateAnswer from './CreateAnswer';
import CreateQuestion from './CreateQuestion';
import debounce from 'lodash.debounce';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import SearchCustom from './Common/SearchCustom';
import { useNavigate } from 'react-router-dom';

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

const Dashboard = () => {
    const { userInfo } = useContext(GlobalContext);
    const navigate = useNavigate();
    const [showCreateQuestion, toggleCreateQuestion] = useBoolean();
    const [showCreateAnswer, toggleCreateAnswer] = useBoolean();
    const [answers, setAnswers] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        onFetch();
    }, []);

    const onFetch = async (search = '') => {
        try {
            setIsLoading(true);
            setSearchText(search)
            const { data: answers } = await getAnswers(search);
            setAnswers(answers);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const debouncedSearch = debounce(async (value) => {
        await onFetch(value);
    }, 300);

    const onDelete = async (id) => {
        try {
            await deleteAnswer(id);
            await onFetch();
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
                        onFetch();
                    }}
                />
            )}
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
                bg={bg}
                px={6}
                py={4}
                mb={4}>
                <Text fontSize={'2xl'}>Answers</Text>
                <Stack direction={'row'} alignItems={'center'} spacing={6}>
                    <SearchCustom
                        onSearch={(value) => {
                            onFetch(value);
                        }}
                        onChange={debouncedSearch}
                    />
                    {/* <Button minW={160} onClick={() => navigate('/questions')}>
                        Answer
                    </Button> */}
                </Stack>
            </Flex>
            <Flex w={'full'} flex={1} bg={bg} px={6} py={4}>
                <List
                    style={{ width: '100%' }}
                    itemLayout="vertical"
                    dataSource={answers}
                    loading={isLoading}
                    header={
                        searchText ? (
                            <Text fontSize={'xl'}>{`Showing results for "${searchText}"`}</Text>
                        ) : null
                    }
                    renderItem={(item) => {
                        const {
                            question,
                            question: { category },
                            answer,
                            replied_by
                        } = item;
                        const anwserText = `Ans. ${answer}`;
                        const questionText = `Q. ${question.text}`;
                        var isByMe = replied_by.id === userInfo.id;
                        return (
                            <List.Item
                                className="question-row"
                                extra={
                                    <Stack
                                        direction={'row'}
                                        display={'none'}
                                        sx={{
                                            '.question-row:hover &': {
                                                display: 'flex'
                                            }
                                        }}>
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
                                            <a onClick={() => {}}>{anwserText}</a>
                                            {isByMe && <Tag color="success">Answered by me</Tag>}
                                        </Stack>
                                    }
                                    description={`by: ${replied_by.first_name} ${replied_by.last_name} | ${category.category}`}></List.Item.Meta>
                                {questionText}
                            </List.Item>
                        );
                    }}
                />
            </Flex>
        </Flex>
    );
};

export default Dashboard;
