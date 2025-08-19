import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('NodeBlogAPI', 'root', '', {
    host: '127.0.0.1',
    port: '3306',
    dialect:'mysql'
})


export async function checkDBconnection() {
    try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
}
export async function DBconnection() {
    try {
    const result = await sequelize.sync({alter:true,force:true});
        console.log('sync has been established successfully.');
        console.log(result)
} catch (error) {
    console.error('Unable to sync to the database:', error);
}
}