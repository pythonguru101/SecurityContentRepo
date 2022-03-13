//@ts-check
import axios from 'axios';

export const getQuestions = async () => {
    return await axios.get(`/api/questions`);
};

export const createQuestion = async (payload) => {
    return await axios.post(`/api/create_question`, payload);
};


export const createAnswer = async (payload) => {
    return await axios.post(`/api/create_answer`, payload);
};
