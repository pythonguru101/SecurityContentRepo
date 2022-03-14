//@ts-check
import axios from 'axios';

export const getQuestions = async (search = '') => {
    var route = search ? `/api/questions?search_keyword=${search}` : `/api/questions`;
    return await axios.get(route);
};

export const getAnswers = async (search='') => {
    var route = search ? `/api/answers?search_keyword=${search}` : `/api/answers`;
    return await axios.get(route);
};

export const createQuestion = async (payload) => {
    return await axios.post(`/api/create-question`, payload);
};

export const deleteQuestion = async (id) => {
    return await axios.delete(`/api/question/${id}`);
};

export const createAnswer = async (payload) => {
    return await axios.post(`/api/create-answer`, payload);
};

export const deleteAnswer = async (id) => {
    return await axios.delete(`/api/answer/${id}`);
};
