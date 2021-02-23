const User = require('./model/user')


module.exports.mapper  = (rawData) => {
    let userObj;
    let user = new User();
    if (typeof rawData === 'object') {
        userObj = rawData
    } else {
        userObj = JSON.parse(rawData)
        for (const userObjKey in userObj) {
            if (!user.hasOwnProperty(userObjKey)){
                throw new Error(`invalid - ${userObjKey}`)
            }
        }
    }
    user.id = userObj['id']
    user.name = userObj['name']
    user.userName = userObj['userName']
    user.email = userObj['email']
    user.password = userObj['password']
    return user
}