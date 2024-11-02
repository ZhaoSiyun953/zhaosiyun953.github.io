const {insertMsg} = require("../utils/db");
const addMsg = async function(req, res, next) {
    let {name, email, message} = req.body
    let checkList = [{
        key: "name", value: name
    }, {
        key: "email", value: email
    }, {
        key: "message", value: message
    }]

    for(idx in checkList) {
        let item = checkList[idx]
        if(!item.value) {
            res.status(500)
                .send(item.key + " is empty")
            return
        }
    }

    await insertMsg( {name, email, message})

    console.log("addMessage: ", {name, email, message})
}

module.exports = {
    addMsg
}
