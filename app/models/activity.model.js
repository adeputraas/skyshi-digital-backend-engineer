const sql = require("./db.js");

// constructor
const Todos = function(todo) {
  this.id = todo.id ;
  this.email = todo.email;
  this.title = todo.title;
};

Todos.create = async (newTodos) => {
    try {
        const results = await new Promise((resolve, reject) => {
            sql.query(
                /* sql */ `INSERT INTO activity (email, title) VALUES (?, ?)`, [newTodos.email, newTodos.title]
                ,
                (err, res) => {
                    if (err) reject(err);
                    resolve(res);
                }
            );
        })
            .then((response) => response)
        return results;
    } catch (error) {
        throw error;
    }
};

Todos.getAll = async () => {
    try {
        const results = await new Promise((resolve, reject) => {
            sql.query(
                /* sql */ `SELECT * FROM activity`, []
                ,
                (err, res) => {
                    if (err) reject(err);
                    resolve(res);
                }
            );
        })
            .then((response) => response)
        return results;
    } catch (error) {
        throw error;
    }
};

Todos.findOne = async (newTodos) => {
    try {
        const results = await new Promise((resolve, reject) => {
            sql.query(
                /* sql */ `SELECT * FROM activity WHERE id =?`, [newTodos.id]
                ,
                (err, res) => {
                    if (err) reject(err);
                    resolve(res);
                }
            );
        })
            .then((response) => response)
        return results;
    } catch (error) {
        throw error;
    }
};

Todos.updateOne = async (newTodos) => {
    try {
        const dto = [newTodos.title, newTodos.id];
        const results = await new Promise((resolve, reject) => {
            sql.query(
                /* sql */ `UPDATE activity SET title=? WHERE id=?`, dto
                ,
                (err, res) => {
                    if (err) reject(err);
                    resolve(res);
                }
            );
        })
            .then((response) => response)
        return results;
    } catch (error) {
        throw error;
    }
};

Todos.deleteOne = async (newTodos) => {
    try {
        const results = await new Promise((resolve, reject) => {
            sql.query(
                /* sql */ `DELETE FROM activity WHERE id=? `, [newTodos.id]
                ,
                (err, res) => {
                    if (err) reject(err);
                    resolve(res);
                }
            );
        })
            .then((response) => response)
        return results;
    } catch (error) {
        throw error;
    }
};


module.exports = Todos;
