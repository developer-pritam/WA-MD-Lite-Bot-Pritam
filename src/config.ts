import fs from 'fs';
if (fs.existsSync('config.env')) {
    require('dotenv').config({ path: './config.env' });
} else {
    require('dotenv');
}

const CONFIG = {
    TOKEN: process.env.TOKEN,
    PREFIX: process.env.PREFIX,
    OWNER: process.env.OWNER,
};
export default CONFIG;


