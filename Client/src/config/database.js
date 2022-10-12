import {Sequalize} from 'sequelize';
const db=new Sequalize('movie_app','root','',
{host:'localhost',
dialect:'mysql'});

export default db;