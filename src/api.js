import axios from 'axios';

export const saveCreate = (set) => {
    return axios.post(`/api/saveCreate`, set)
        .then(() => {return true;})
}

export const publishCreate = (set) => {
    return axios.post(`/api/publishCreate`, set)
        .then((response) => {return response.data})
}


// TODO: Ajax calls from front end to back end
