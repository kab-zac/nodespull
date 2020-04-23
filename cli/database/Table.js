"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __importDefault(require("./controller"));
const errors_1 = __importDefault(require("../etc/errors"));
class Table {
    constructor(model) {
        this._utils = {
            where: {},
        };
        this._model = model;
    }
    /**
     * Get name of SQL table
     */
    getName() { return this._model.name; }
    /**
     * Filter row from table before an action. Example:
     * ```
     *  Database.table("users").where({
     *      email: "user@email.com",
     *      firstName: Database.op.like("doe"),
     *      age: Database.op.gt(5)
     *  })
     * ```
     */
    where(rows) {
        let next = new Table(this._model);
        next._utils.where = rows;
        return next;
    }
    /**
     * Get first entry that matches specifications within the table. Example:
     * ```
     *  Database.table("users").where({
     *      email: "user@email.com"
     *  }).select( (user,err) => {
     *      console.log(user)
     *  })
     * ```
     */
    select(callback) {
        if (!this._utils.where)
            this._utils.where = {};
        this._model.findOne({ where: this._utils.where, include: [{ all: true }] }).then((res) => {
            callback(res.dataValues, null);
        }).catch(e => {
            callback(null, e);
        });
    }
    /**
     * Get all entries that match specifications within the table. Example:
     * ```
     *  Database.table("users").where({
     *      email: "user@email.com"
     *  }).selectAll( (users,err) => {
     *      console.log(users)
     *  })
     * ```
     */
    selectAll(callback) {
        if (!this._utils.where)
            this._utils.where = {};
        this._model.findAll({ where: this._utils.where, include: [{ all: true }] }).then((res) => {
            callback(res.map((v) => v.dataValues), null);
        }).catch(e => {
            callback(null, e);
        });
    }
    /**
     * Edit one entry that matches specifications within the table. Example:
     * ```
     *  Database.table("users").where({
     *      email: "user@email.com"
     *  }).editOne( (editedUser,err) => {
     *      console.log(editedUser.email)
     *  })
     * ```
     */
    edit(row, callback) {
        if (!this._utils.where)
            errors_1.default.db.missingWhere_for(this._model.name + ".edit");
        this._model.update(row, { where: this._utils.where }).then((res) => {
            callback(res.dataValues, null);
        }).catch(e => {
            callback(null, e);
        });
    }
    /**
     * Insert one entry to the table. Example:
     * ```
     *  Database.table("users").insert({
     *      email: "user@email.com"
     *  }, (newUser,err) => {
     *      console.log(newUser.email)
     *  })
     * ```
     */
    insert(row, callback) {
        this._model.create(row).then((res) => {
            callback(res.dataValues, null);
        }).catch(e => {
            callback(null, e);
        });
    }
    /**
     * Delete one entry from the table as specified. Example:
     * ```
     *  Database.table("users").where({
     *      email: "user@email.com"
     *  }).delete( (deletedUsed, err) => {
     *      console.log(deletedUser.email+" removed")
     *  })
     * ```
     */
    delete(callback) {
        if (!this._utils.where)
            errors_1.default.db.missingWhere_for(this._model.name + ".delete");
        this._model.destroy({ where: this._utils.where }).then((res) => {
            callback(res.dataValues, null);
        }).catch(e => {
            callback(null, e);
        });
    }
}
exports.Table = Table;
class TableDefinition {
    constructor(name) {
        this._tableName = name;
    }
    /**
     * Define fields of the new SQL table. Example:
     * ```
     * Database.defineTable('users').as({
     *      email: Database.type.string,
     *      phone: Database.type.int
     * })
     * ```
     */
    as(fields) {
        return controller_1.default.ORM.addTable(this._tableName, fields);
    }
}
exports.TableDefinition = TableDefinition;
class TableRelation {
    constructor(tableName, isModeInstall) {
        this._isModeInstall = isModeInstall;
        this._model = controller_1.default.ORM.interface.model(tableName);
    }
    /**
     * One entry in the left table may be linked with only one entry in the right table and vice versa. Example:
     * ```
     *  Database.linkTable("students").one_to_one("tuition-accounts")
     *
     * ```
     */
    one_to_one(arg) {
        if (this._isModeInstall)
            return;
        if (typeof arg == "string")
            this._model.hasOne(controller_1.default.ORM.interface.model(arg));
        else
            this._model.hasOne(controller_1.default.ORM.interface.model(arg.table), arg);
    }
    /**
     * One entry in the left table may be linked with many entries in the right table. Example:
     * ```
     *  Database.linkTable("students").one_to_many("id_cards")
     *
     * ```
     */
    one_to_many(arg) {
        if (this._isModeInstall)
            return;
        if (typeof arg == "string")
            this._model.hasMany(controller_1.default.ORM.interface.model(arg));
        else
            this._model.hasMany(controller_1.default.ORM.interface.model(arg.table), arg);
    }
    /**
     * One entry in the left table may be linked with many entries in the right table and vice versa. Example:
     * ```
     *  Database.linkTable("students").many_to_many("courses")
     *
     * ```
     */
    many_to_many(arg) {
        if (this._isModeInstall)
            return;
        if (typeof arg == "string")
            this._model.belongsToMany(controller_1.default.ORM.interface.model(arg), { through: this._model.name + "_" + arg });
        else
            this._model.belongsToMany(controller_1.default.ORM.interface.model(arg.table), Object.assign({ through: this._model.name + "_" + arg.table }, arg));
    }
}
exports.TableRelation = TableRelation;
