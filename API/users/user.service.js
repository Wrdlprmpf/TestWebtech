const pool = require("../../db/config/db.config");

module.exports = {
    create: (data, callBack) =>{
        pool.query(
            "INSERT INTO registration (username, password) values ($1, $2)",
            [
                data.username,
                data.password
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results)
            }
        );
    },

    getUsers: callBack => {
        pool.query(
            "SELECT * FROM account ",
            [],
            (error, results, fields) => {
                if(error){
                    return allBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getUserByUserId: (id, callBack) => {
        pool.query(
          "select id, username from registration where id = $1",
          [id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },

    getUserByUserUsername: (username, callBack) => {
        pool.query(
          "select * from registration where username = $1",
          [username],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },

    deleteUser: (data, callBack) => {
        pool.query(
          "delete * from registration where id = $1",
          [data.id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },

    updateUser: (data, callBack) => {
        pool.query(
          "update registration set username=$1, password=$2, where id = $3",
          [
            data.username,
            data.password,
            data.id
          ],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },
};



