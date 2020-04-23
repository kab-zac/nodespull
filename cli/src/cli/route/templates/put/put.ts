
export default function put(path:string):string{
    let name = path.split("/").pop()// remove slash, get last
    name  = name!.split("-").join("_");

    return `exports.ctr = ${name};
const {Router, Database} = require("nodespull")
const {Hash, Session} = require("nodespull/core/tools")
const {json} = require("nodespull/core/type/sys")


Router.PUT ( ${name},
isActive = false,
isProtected = false,
urlParams = [ undefined ],
path = "${path}")


/**
 * @param {Request} req request contains client data
 * @param {Response} res response contains http methods
 */
function ${name}(req, res){
    /** @type {json} */ let client = req.session;
    /** @type {json} */ let params = req.params;
    /** @type {json} */ let query = req.query;
    /** @type {json} */ let body = req.body;
    /* ------------------------------------------ */

    res.status(200).send("put:${path} works")

    
    

}

`
}