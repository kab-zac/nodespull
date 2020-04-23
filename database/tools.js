"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Table_1 = require("./Table");
const controller_1 = __importDefault(require("./controller"));
const errors_1 = __importDefault(require("../etc/errors"));
const sequelize_2 = __importDefault(require("sequelize"));
class DatabaseTools {
    constructor(isModeInstall) {
        /**
         * Database configuration object as specified by (npm) Sequelize.
         * ```
         * Database.config = {
         *      username: "myExistingDB_username",
         *      passsord: "myExistingDB_password",
         *      host: "myExistingDB_host",
         *      database: "myExistingDB_databaseName",
         *      port: 3306 // or any port from which database should be accessed
         * }
         * ```
         */
        this.config = {};
        /**
         * Type of database data. Example:
         * ```
         *  Database.type.int
         * ```
         */
        this.type = new Type();
        /**
         * SQL statement Operations. Example:
         * ```
         *  Database.table("users").where({
         *      lastName: "wonderful",
         *      age: Database.op.gt(21)
         *  })
         * ```
         */
        this.op = sequelize_2.default.Op;
        this._isModeInstall = isModeInstall;
    }
    /**
     * Add a SQL table relation. Example:
     * ```
     *  Database.linkTable("students").many_to_many("professors")
     *
     * ```
     */
    linkTable(tableName) {
        this.op;
        return new Table_1.TableRelation(tableName, this._isModeInstall);
    }
    /**
     * Define a SQL table. Example:
     * ```
     * Database.defineTable('users').as({
     *      email: Database.type.string,
     *      phone: Database.type.int
     * })
     * ```
     */
    defineTable(name) {
        return new Table_1.TableDefinition(name); // store somewhere
    }
    /**
     * Return a nodepull table. Example:
     * ```
     * table('users')
     * ```
     */
    table(name) {
        if (!controller_1.default.ORM)
            errors_1.default.db.modelNotSaved();
        return new Table_1.Table(controller_1.default.ORM.interface.model(name));
    }
}
exports.DatabaseTools = DatabaseTools;
class Type {
    constructor() {
        this.string = sequelize_1.DataTypes.STRING;
        this.int = sequelize_1.DataTypes.INTEGER;
        this.text = sequelize_1.DataTypes.TEXT;
        this.float = sequelize_1.DataTypes.FLOAT;
        this.time = sequelize_1.DataTypes.TIME;
        this.date = sequelize_1.DataTypes.DATE;
        this.dateOnly = sequelize_1.DataTypes.DATEONLY;
        this.char = sequelize_1.DataTypes.CHAR;
        this.bigInt = sequelize_1.DataTypes.BIGINT;
        this.blob = sequelize_1.DataTypes.BLOB;
        this.boolean = sequelize_1.DataTypes.BOOLEAN;
        this.enum = sequelize_1.DataTypes.ENUM;
    }
}
function DatabaseToolsFactory(isModeInstall) {
    return new DatabaseTools(isModeInstall);
}
exports.DatabaseToolsFactory = DatabaseToolsFactory;
/**
 * Runs relations for auto-generated tables
 */
class Relations {
    static connect(rootCopy1, one_to_one, rootCopy2, one_to_many, rootCopy3, many_to_one, rootCopy4, many_to_many) {
        for (let oTo of one_to_one)
            new Table_1.TableRelation(rootCopy1, false).one_to_one(oTo);
        for (let oTm of one_to_many)
            new Table_1.TableRelation(rootCopy1, false).one_to_many(oTm);
        for (let oTm of many_to_one)
            new Table_1.TableRelation(oTm, false).one_to_many(rootCopy1);
        for (let mTm of many_to_many)
            new Table_1.TableRelation(rootCopy1, false).many_to_many(mTm);
    }
    static set(rootTable, args) {
        for (let target of args.one_to_one.has)
            new Table_1.TableRelation(rootTable, false).has_one(target);
        for (let target of args.one_to_one.belongsTo)
            new Table_1.TableRelation(rootTable, false).belongsTo_one(target);
        for (let target of args.one_to_many)
            new Table_1.TableRelation(rootTable, false).one_to_many(target);
        for (let target of args.many_to_one)
            new Table_1.TableRelation(target, false).many_to_many(rootTable);
        for (let target of args.many_to_many)
            new Table_1.TableRelation(rootTable, false).many_to_many(target);
    }
}
exports.Relations = Relations;
