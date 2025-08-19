import { where } from "sequelize";
import { UserModel } from "../../DB/model/USER.model.js"
import { errorHandling, SuccessResponse } from "../../utils/response.js"





export const signup = async (req, res, next) => {
    try {
        const { userName, email, password, role } = req.body;
        let UserEmailExist =await UserModel.findOne({ where: { email } })
        if (!UserEmailExist) {
            const user = UserModel.build({ userName, email, password, role });
            await user.save() 
            return res.status(201).json({ massage: 'sign up successfully' ,user})
        } else {
            return  res.status(409).json({message:'email already exist'})
        }
        
    } catch (error) {
        errorHandling({res,error})
    }    
    }
    

export const updateUserPk = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body
        const { id } = req.params
    console.log({ id });
        let existUserId = await UserModel.findByPk(id)
        if (!existUserId) {
            return  res.status(409).json({message:'user id not found'})
        } else {
            let updateUserPk =await UserModel.update({ userName, email, password },{where:{id}})
            return  res.status(201).json({message:'user successfully updated',updateUserPk})
        }
   } catch (error) {
        errorHandling({res,error})
   }
}
export const findUserEmail = async (req, res, next) => {
    try {
        const { email } = req.query
        const { userName} = req.body
        console.log({ email });
        const getUser = await UserModel.findOne({userName},{ where: { email } })
        if (!getUser) {
            res.status(404).json({message:'user not found'})
        } else {
            return  res.status(200).json({message:'Done',getUser})
        }

    } catch (error) {
        errorHandling({res,error})
    }
}
export const getUserPk =async (req, res, next) => {
    try {
        const { id } = req.params
        console.log({ id });
        const getUserId = await UserModel.findByPk(id)
        const { role ,...safeData } = getUserId.get({ plain: true });
        if (!getUserId) {
            res.status(404).json({message:'user not found'})
        } else {
            return  res.status(200).json({message:'Done',data: safeData})
        }
        
    } catch (error) {
        errorHandling({res, error})
    }
}