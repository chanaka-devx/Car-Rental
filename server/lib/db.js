import mysql from  'mysql'

let connection;

export const connectToDatabase = async () => {
    if(!connection){
        connection = await mysql.createConnection({
           host: process.env.DB_HOST,
           name: process.env.DB_USER,
           password: process.env.DB_PASSWORD,
           database: process.env.DB_NAME, 
        })
    }
    return connection
}