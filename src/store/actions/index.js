import Axios from 'axios';
import { store } from '../../index';

const env = {
    url: 'https://us-central1-chatcorp-34e5b.cloudfunctions.net/app' // 'http://localhost:3001'//  'https://us-central1-get-servicos.cloudfunctions.net/app'
}


export const setUser = (userId, username, user) => {  
    const {dispatch} = store;
    dispatch({ type: 'UPDATE_USER', user: {userId, username, ...user} });
}

export const setLoading = (load) => {  
    const {dispatch} = store;
    let type = load ? 'LOADING_START' : 'LOADING_STOP'
    dispatch({ type });
}

export const refreshHome = (value) => {  
    const {dispatch} = store;
    //console.log("dispatch({ type: 'UPDATE_LIST', home: true })");
    dispatch({ type: 'UPDATE_LIST', home: value })
}

export const refreshMessage = (value) => {  
    const {dispatch} = store;
    //console.log("dispatch({ type: 'UPDATE_LIST', home: true })");
    dispatch({ type: 'UPDATE_LIST', answer: value })
}

export const redirect = (value) => {  
    const {dispatch} = store;
    //console.log("dispatch({ type: 'REDIRECT' })");
    dispatch({ type: 'REDIRECT', page: value })
}


export const redirectSearch = (search, page) => {
    const {dispatch} = store;
    //console.log("dispatch({ type: 'REDIRECT' })");
    dispatch({ type: 'REDIRECT', page: `/?data=${search}&page=${page}` });
}

export function clearSearch() {    
    const {dispatch} = store;
    dispatch({ type: 'CLEAR_SEARCH', data: {} });
}



export const voteQuestion = async (data) => {

    const url = `${env.url}/voteQuestion`;

    return await Axios.post(url, {data})
    .then((res) => {    
        return res.data;
    }).catch((e) => { return null; });
}

export const likeAnswer = async (data) => {

    const url = `${env.url}/likeAnswer`;

    return await Axios.post(url, {data})
    .then((res) => {    
        return res.data;
    }).catch((e) => { return null; });
}


export const verifyToken = async (data) => {

    const url = `${env.url}/verifyToken`;

    return await Axios.post(url, {data})
    .then((res) => {    
        return res.data;
    }).catch((e) => { return null; });
}

export const registerUser = async (data) => {

    const url = `${env.url}/register`;

    return await Axios.post(url, {data})
    .then((res) => {    
        return res.data;
    }).catch((e) => { return null; });
}

export const authenticateUser = async (data) => {

    const url = `${env.url}/authenticate`;

    return await Axios.post(url, {data})
    .then((res) => {    
        return res.data;
    }).catch((e) => { return null; });
}



export const getKeywordsQuestion = async (data) => {

    const url = `${env.url}/getKeywordsQuestion`;

    return await Axios.post(url, {data})
    .then((res) => {    
        return res.data;
    }).catch((e) => { return null; });
}

export const getQuestions = async (data) => {

    let url = `${env.url}/getQuestions`;

    if(data) url = `${env.url}/getKeywordsQuestion`;

    return await Axios.post(url, {data})
    .then((res) => {    
        return res.data;
    }).catch((e) => { return null; });
}

export const getAnswers = async (data) => {

    const url = `${env.url}/getAnswers`;

    return await Axios.post(url, {data})
    .then((res) => {    
        return res.data;
    }).catch((e) => { return null; });
}

export const setQuestion = async (value) => {

    const url = `${env.url}/saveQuestion`;

    return await Axios.post(url, {value})
    .then((res) => {    
        //console.log('export const setQuestion', res.data);
        return res.data;
    }).catch((e) => { return null; });
}

export const setAnswer = async (value) => {

    const url = `${env.url}/saveAnswer`;

    return await Axios.post(url, {value})
    .then((res) => {    
        //console.log('export const setQuestion', res.data);
        return res.data;
    }).catch((e) => { return null; });
}











export const getTabs = async (value) => {

    const url = `${env.url}/getTabs`;

    return await Axios.get(url)
    .then((res) => {    
        return res.data;
    }).catch((e) => { return null; });
}

export const getProdutos = async (value) => {

    const url = `${env.url}/getProdutos`;
    const produto = { search: value };

    return await Axios.post(url, produto)
    .then((res) => {      
        return res.data;
    }).catch((e) => { return null; });
}

export const getTagProdutos = async (value) => {

    const url = `${env.url}/getTagProdutos`;
    const produto = { search: null, tagId: value };

    return await Axios.post(url, produto)
    .then((res) => {    
        return res.data;
    }).catch((e) => { return null; });
}


export const getParam = (data) => {

    let search = window.location.search;
    let params = new URLSearchParams(search);
    return params.get(data);
}

export const updateUrlPage= (page) => {

    let search = getParam('data');
    return `/search?data=${search}&page=${page}`;
}

export const updateUrlSearch = (search, page) => {

    return `/?data=${search}&page=${page}`;
}
