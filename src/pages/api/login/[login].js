import db from '../../../../utils/database'
import bcrypt from 'bcryptjs'
import {encrypt,decrypt} from '../../../components/crypto/crypto'
import Cookies from 'cookies'

export default async function(req,res){
	const query = req.query.login
	const salt = bcrypt.genSaltSync(10);
	const cookies = new Cookies(req, res)

	if(req.method === "POST"){
		if(query === "register"){

			try{
				const {username,email,password,name,token} = req.body
				const hashPass = bcrypt.hashSync(password, salt);
				const hashToken = encrypt(token);
				const hashEmail = encrypt(email);

				const userData = {
					username:username,
					name:name,
					email:hashEmail,
					password:hashPass,
					token:hashToken
				}

				const data = await db('users').insert(userData)
				console.log(data)
				const userCookie = {
					user:username,
					token:hashToken
				}

				cookies.set('userOCCB', JSON.stringify(userCookie), { httpOnly: true })
				cookies.set(username)
				return res.status(200).json(data)

			}catch(err){
				return res.status(400).json({message:"Erro"})
			}

		}else if(query === "login"){

			const {username,password,email} = await req.body
			const data = await db('users').where('username', username)

				if(data.length > 0){
					const pass = await bcrypt.compareSync(password, data[0].password)
					return res.status(200).json({user:data[0].username,pass:pass,token:data[0].token})
				}else{
					return res.status(200).json({user:false,pass:false})
				}

		}else{
			res.status(400).json({message:"Erro"})
		}
	}else if(req.method === "GET"){
		if(query === "auth"){
			try{
				const getCookie = cookies.get('userOCCB')
				const userCookie = JSON.parse(unescape(getCookie))
				if(userCookie){
					const data = await db('users').where('username', userCookie.user)
					if(data.length > 0 && data[0].token === userCookie.token){
						return res.status(200).json({user:true,user:userCookie.user,token:userCookie.token})
					}else{
						return res.status(200).json({user:false})
					}
			}else{
				return res.status(401).send({message:"Houve um erro !"})
			}
		}catch(err){
			return res.send(err.message);
		}
	}else{
			res.status(401).json({message:"Metodo Invalido"})
		}

	}
}