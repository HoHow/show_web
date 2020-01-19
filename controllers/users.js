var models = require ('../models')
var Sequelize = require('sequelize')
const crypto = require('crypto');

class users{
    async register (req, res, next){
        try {
            //email,nickname,password,gender
            const input_data = Object.assign({},req.body)

            const isExist = await models.User.findOne({where:{email:input_data.email},raw:true}).then((results)=>{
                if(results){
                    throw new Error('已有相同email')
                }
                return results
            })
            //加鹽
            const salt = genRandomString(20)
            const hash = crypto.createHmac('sha512', salt)
                   .update(input_data.password)
                   .digest('hex')
            
            input_data.salt = salt
            input_data.password = hash
            if(!isExist) {
                
                await models.User.create(input_data)
                res.json({success:true,code:200,message: "註冊成功" })
            } else {
                res.json({success:false,code:404,message: "註冊失敗或是已有相同帳號" })
            }
        } catch (error) {
            error.status = 400
            next(error)
        }
    }   
}
function genRandomString(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};
module.exports = users;