process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const http = require('http');
const Axios = require('axios').default;
const { get } = require('lodash');
const httpAgent = new http.Agent({ rejectUnauthorized: false });

module.exports = async (request, h) => {
    try{
        let instance = Axios.create({ httpAgent: httpAgent });
        let users = {}, response = {};
        const id = request.params.id ? request.params.id : "";
        const method = request.method;
        if( method == 'post'){
            const newUser = request.payload;
            //check for new user data passed in
            if(newUser == null) return "Needs payload" 
            response = await instance.post(`https://gorest.co.in/public/v2/users?access-token=7f5a340c903c0f767d1745838ff049f5df37c95d97933f2ea0d812bf55072e1f`, newUser);
            users = get(response, ['data']);

        } else if( method == 'get'){
            response = await instance.get(`https://gorest.co.in/public/v2/users/${id}?access-token=7f5a340c903c0f767d1745838ff049f5df37c95d97933f2ea0d812bf55072e1f`);
            users = get(response, ['data']);
        } else if(method == 'delete'){
            //cant delete without id
            if(id == "") return "Missing id";
            response = await instance.delete(`https://gorest.co.in/public/v2/users/${id}?access-token=7f5a340c903c0f767d1745838ff049f5df37c95d97933f2ea0d812bf55072e1f`);
            users = get(response, ['data']);
        }
        return users;
    } catch(err){
        //console.log(err);
        return {
            status: err.response.status,
            message: 'resource not found'
        }
    }
}