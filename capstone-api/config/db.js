const mysql = require('mysql2');



const pool = mysql.createPool({
    connectionLimit: process.env.CONNECTION_LIMIT,    // the number of connections node.js will hold open to our database
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    database: process.env.MYSQL_DB,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT

});
let db = {}; //cb object
// ***Requests to the User table ***

db.allUser = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM User ', (error, users) => {
            if (error) {
                return reject(error);
            }
            return resolve(users);
        });
    });
};


db.getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM User WHERE email = ?', [email], (error, users) => {
            if (error) {
                return reject(error);
            }
            return resolve(users[0]);
        });
    });
};



db.insertUser = (userName, email, password) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO User (user_name, email, password) VALUES (?,  ?, ?)', [userName, email, password], (error, result) => {
            if (error) {
                return reject(error);
            }

            return resolve(result.insertId);
        });
    });
};


db.updateUser = (userName, role, email, password, id) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE User SET user_name = ?, role= ?, email= ?, password=? WHERE id = ?', [userName, role, email, password, id], (error) => {
            if (error) {
                return reject(error);
            }

            return resolve();
        });
    });
};



db.deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM User WHERE id = ?', [id], (error) => {
            if (error) {
                return reject(error);
            }
            return resolve(console.log("User deleted"));
        });
    });
};

module.exports = db;