const sql = require("./db.js");

// constructor
const Todos = function(todo) {
  this.id = todo.id ;
  this.activity_group_id = todo.activity_group_id;
  this.title = todo.title;
};

Todos.create = async (newTodos) => {
    try {
        const results = await new Promise((resolve, reject) => {
            sql.query(
                /* sql */ `INSERT INTO todo (activity_group_id, title) VALUES (?, ?)`, [newTodos.activity_group_id, newTodos.title]
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
                /* sql */ `SELECT * FROM todo`, []
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

Todos.getTodoByIdActivity = async (newTodos) => {
    try {
        const results = await new Promise((resolve, reject) => {
            sql.query(
                /* sql */ `SELECT * FROM todo WHERE activity_group_id = ?`, [newTodos.activity_group_id]
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
                /* sql */ `SELECT * FROM todo WHERE id =?`, [newTodos.id]
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
                /* sql */ `UPDATE todo SET title=? WHERE id=?`, dto
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
                /* sql */ `DELETE FROM todo WHERE id=? `, [newTodos.id]
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
