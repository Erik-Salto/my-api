const { initServer } = require('./utils/server');
const { initConfig } = require('./config/config');

const startApp = async () => {
    try{
        await initConfig();
        await initServer();
    }catch(err){
        console.log(err);
    }
}

startApp();