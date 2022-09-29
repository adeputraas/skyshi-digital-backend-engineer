const sql = require("./db.js");

// constructor
const Todos = function(todo) {
  this.id = todo.id ;
  this.activity_group_id = todo.activity_group_id;
  this.title = todo.title;
  this.priority = todo.priority;
};

Todos.create = async (newTodos) => {
    try {
        const results = await new Promise((resolve, reject) => {
            sql.query(
                /* sql */ `INSERT INTO todos (activity_group_id, title) VALUES (?, ?)`, [newTodos.activity_group_id, newTodos.title]
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
                /* sql */ `SELECT * FROM todos`, []
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
                /* sql */ `SELECT * FROM todos WHERE activity_group_id = ?`, [newss.activity_group_id]
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
                /* sql */ `SELECT * FROM todos WHERE id =?`, [newTodos.id]
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

        let query = ``;
        let dto = []
        if(newTodos.title) {
            query = `UPDATE todos SET title=?, priority=? WHERE id=?`;
            dto = [newTodos.title, newTodos.priority || 'very-high', newTodos.id];
        }else {
            query = `UPDATE todos SET priority=? WHERE id=?`;
            dto = [ newTodos.priority || 'very-high', newTodos.id];
        }
        const results = await new Promise((resolve, reject) => {
            sql.query(
                /* sql */ query, dto
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
                /* sql */ `DELETE FROM todos WHERE id=? `, [newTodos.id]
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
