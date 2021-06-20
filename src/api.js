import axios from 'axios';

export const saveCreate = (set) => {
    return axios.post(`/api/saveCreate`, set)
        .then(() => {return true;})
}

export const publishCreate = (set) => {
    return axios.post(`/api/publishCreate`, set)
        .then((response) => {return response.data})
}

export const getSet = (_id) => {
    return axios.post(`/api/getSet`, {_id})
        .then((response) => {
            return response.data
        }).catch(() => {
            return {};
        });
};


// TODO: Ajax calls from front end to back end