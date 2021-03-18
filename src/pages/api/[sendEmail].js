 import emailConfirm from '../../email/emailConfirm'
 import {decrypt} from '../../components/crypto/crypto'
 import Cookies from 'cookies'
 import {drawEmailToken, drawEmailPass} from '../../email/drawEmail'

 const sendEmail = (req, res) => {
 	const query = req.query.sendEmail

	 if(req.method === "POST"){
	 	if(query === "sendEmail"){
		 	//[x] Buscar credenciais no cookie
		 	const cookies = new Cookies(req, res)
		 	const {username,token,email,name} = req.body
		 	const cookieUser = cookies.get(username)
		 	const userData = JSON.parse(unescape(cookieUser))

		 	//[x] Descriptar dados do token
		 	const decrypedToken = decrypt(userData.token)
		 	const decrypedTokenData = decrypt(token)
		 	const decrypedEmailData = decrypt(email)

		 	//[x] Criar objeto para envio do email
		 	const dataUser = {
		 		name:name,
		 		email:decrypedEmailData,
		 		token:decrypedTokenData,
		 		username:username
		 	}
		 	const emailData = drawEmailToken(dataUser) 

		 	//[x] Comparar Tokens
		 	if(decrypedToken === decrypedTokenData){
		 		try{

		 			//[x] Chamar função para enviar email
			 		emailConfirm(emailData)

			 		//Retorno da chamada
			 		res.status(200).json({message:'Requisição OK'})
			 	}catch(err){
			 		res.status(401).json({message:"Algo saiu errado !"})
			 	}
		 	}else{
		 		res.status(401).json({message:"Algo Saiu Errado !"})
		 	}
		 }else if(query === "resendEmail"){
		 	const emailData = req.body
		 	const decEmail = decrypt(emailData.email)
		 	//[x] Chamar função para enviar email
			 const dataUser = {
		 		name:emailData.name,
		 		email:decEmail,
		 		url:emailData.url
		 	}

		 	const emailPassData = drawEmailPass(dataUser) 
		 	emailConfirm(emailPassData)

		 	return res.status(200).json({sucess:true})
		 }else{
		 	return res.status(401).json({message:"Metodo Invalido !"})
		 }	
	  }else{
	 	res.status(401).json({message:"Metodo Invalido !"})
	 }
 	
}


export default sendEmail