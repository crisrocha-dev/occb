import bcrypt from 'bcryptjs'
import db from '../../../../../utils/database'
import {encrypt,decrypt} from '../../../../components/crypto/crypto'

export default async function (req,res){
	const query = req.query.id
	const salt = bcrypt.genSaltSync(10);
	const {pass,name,email,token} = req.body

	if(req.method === "POST"){
		if(query === "update"){
				const hashPass = bcrypt.hashSync(pass, salt);
				const data = await db('users')
				.where({ name: name })
				.update({ password: hashPass,token: token})

				return res.status(200).json({response:data})
		}else if(query === "search"){
			const data = await db('*').into('users')
			const userData = data.filter(user => {
				let decEmail = decrypt(user.email)
				if(decEmail === email){
					return user
				}
			})
			if(userData.length > 0){
				return res.status(200).json({data:userData,user:true})
			}else{
				return res.status(200).json({user:false})
			}
			
		}else{
			return res.status(403).json({message:"Houve um erro."})
		}
	}else{
		return res.status(401).json({message:"Metodo Invalido."})
	}
}