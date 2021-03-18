import Register from '../components/Register'
import LoginForm from '../components/LoginForm'
import NewPass from '../components/NewPass'
import VerifyToken from '../components/VerifyToken'
import useInput from '../components/states/useInput'
import {useState,useContext,useEffect} from 'react'
import {encrypt,decrypt} from '../components/crypto/crypto'
import cookieCutter from 'cookie-cutter'
import { useRouter } from 'next/router'
import axios from 'axios'
import bcrypt from 'bcryptjs'
import {useAuthContext} from '../components/auth'



const Login = () => {
	const user = useAuthContext()
	const salt = bcrypt.genSaltSync(10);
	const router = useRouter()
	const [name,setName,changeName] = useInput('')
	const [email,setEmail,changeEmail] = useInput('')
	const [token,setToken,changeToken] = useInput('')
	const [username,setUsername,changeUsername] = useInput('')
	const [password,setPassword,changePassword] = useInput('')
	const [tokenVerify,setTokenVerify] = useState(false)
	const [messageToken,setMessageToken] = useState('')
	const [userData,setUserData] = useState({})
	const [logIn,setLogIn] = useState(true)
	const [isPass,setIspass] = useState(true)
	const [messageUsername,setMessageUsername] = useState('')
	const [messagePassword,setMessagePassword] = useState('')
	const [messageEmailPass,setMessageEmailPass] = useState('')


	// --------- VERIFICA SE JA HOUVE LOGIN ----------------
	useEffect(() => {
		user.then(res => {
			if(res.user){
				router.push('/painel')
			}
		}).catch(err => console.log(err))
	},[])
	// -------- FAZER LOGIN ------

	// -- Fazer Login
	const enterLogin = async (event) => {
		event.preventDefault()

		// [x] Fazer requisição com os dados digitados
		const userData = {
			username:username,
			password:password
		}
		const response = await axios.post('api/login/login',userData)
		
		//[x] Verificar se usuário existe
		if(response.data.user){
			setMessageUsername('')
			if(response.data.pass){
				setMessagePassword('')
				console.log(userData.username)
				//[x] Salva usuário no cookie
				const userCookie = {
					user:userData.username,
					token:response.data.token
				}
				cookieCutter.set('userOCCB',JSON.stringify(userCookie))

				//[x] Redirecionar para Painel
				router.push('/painel')
			}else{
				setMessagePassword("Senha Inválida.")
			}
		}else{
			setMessageUsername("Usuário não cadastrado.")
		}
	}

	//-- Chamar página de Cadastro
	const enterRegister = () => {
		setLogIn(false)
	}

	// -- Abre Formulário para reenvio de Senha
	const resendPass = () => {
		//[x] Abrir formulario de Recadastro de senha
		setIspass(false)
	}

	// -- Reenvia Email de alteração de senha
	const sendEmailPass = async (event) => {

		event.preventDefault()
		// [x] Verificar se Email existe no BD
		const dataUser = {
			email:email
		}
		const response = await axios.post('api/login/restore/search',dataUser)
		console.log(response)
		
		const userData = await response.data.data[0]
		// [] Enviar email com link para refazer a senha
		const dataEmailPass = {
			name:userData.name,
			email:userData.email,
			url:`http://localhost:3000/painel/${userData.token}`
		}
		axios.post('api/resendEmail',dataEmailPass)
		.then(res => console.log(res))
		.catch(err => console.log(err))
	}

	// ------- REGISTRAR -------
	//-- Envia email de confirmação de Email
	const sendRegister = (event) => {
		event.preventDefault()

		//[x] Gerar Token
		const emailToken =  Math.floor(Math.random() * (100000000 - 10000000 + 1)) + 10000000
		//[x] Criptografar Token e armazenar no cookie
		const cryptoToken = encrypt(emailToken)
		const cryptoEmail = encrypt(email)
		
		

		const userCookie = {
			name:name,
			username:username,
			email:cryptoEmail,
			token:cryptoToken,
		}
		setUserData(userCookie)
		cookieCutter.set(username, JSON.stringify(userCookie))
		//[x] Enviar Token Por email
		axios.post('api/sendEmail',userCookie).then(res => {
			//[x] Chamar página de verificação do Token
			setTokenVerify(true)
		}).catch(err => console.log(err))
		
	}

	//-- Confirma token enviado por email e cadastra no banco de dados
	const tokenConfirm = (event) => {
		event.preventDefault()

		//[x] Pega token do cookie
		const userDataCookie = JSON.parse(unescape(cookieCutter.get(username)))
		const tokenDecrypted = decrypt(userDataCookie.token)

		//[x] Comparar Token digitado com token do cookie
		if(tokenDecrypted === token){
			//[x] Fazer Requisição para salvar usuário no banco de dados
			
			const user = {
				name:name,
				email:email,
				username:username,
				password:password,
				token:userData.token
			}
			axios.post('api/login/register',user).then(res => {
				//[x] Redirecionar para o Painel Administrativo
				setMessageToken("Usuário Cadastrado !")
				router.push('/dashboard')

			}).catch(err => console.log(err))
		}else{
			//[x] Setar mensagem de erro
			setMessageToken("Código Digitado Invalido !")
		}
	}

	//-- Reenvia email para email cadastrado
	const resendToken = () => {

		//[x] Buscar Token Atual
		const userDataCookie = JSON.parse(unescape(cookieCutter.get(username)))
		

		//[x] Alterar Token
		const emailToken =  Math.floor(Math.random() * (100000000 - 10000000 + 1)) + 10000000

		//[x] Setar novamento o cookie
		const cryptoToken = encrypt(emailToken)
		const userCookie = {
			...userDataCookie,
			token:cryptoToken
		}
		cookieCutter.set(username, JSON.stringify(userCookie))

		//[x] Reenviar por email
		axios.post('api/sendEmail',userCookie).then(res => {
			//[x] Setar Mensagem 
			const emailDecrypted = decrypt(userDataCookie.email)
			function emailMask(email) {
				let maskedEmail = email.replace(/([^@\.])/g, "*").split('');
				let previous	= "";
				for(let i=0;i<maskedEmail.length;i++){
					if (i<=1 || previous == "." || previous == "@"){
						maskedEmail[i] = email[i];
					}
					previous = email[i];
				}
				return maskedEmail.join('');
			}
			setMessageToken(`Código de acesso reenviado para o email ${emailMask(emailDecrypted)} !`)
		}).catch(err => console.log(err))
	}

	//-- Volta para o registro
	const backToRegister = () => {

		//[x] apaga o cookie
		cookieCutter.set(username, '', { expires: new Date(0) })
		//[x] Abre o formulário de Registro vazio
		setTokenVerify(false)
		setName('')
		setEmail('')
		setUsername('')
		setPassword('')
		setTokenVerify(false)
	}
	
	return(
			<div>
			{logIn ? 
				isPass ?
				<LoginForm 
					enterLogin={enterLogin}
					username={username}
					changeUsername={changeUsername}
					messageUsername={messageUsername}
					password={password}
					changePassword={changePassword}
					messagePassword={messagePassword}
					enterRegister={enterRegister}
					resendPass={resendPass} 
				/> :
					<NewPass
						sendEmailPass={sendEmailPass}
						messageEmailPass={messageEmailPass}
						email={email}
						changeEmail={changeEmail}
					/>:
				<div>
					{!tokenVerify ? 
						<Register
							name={name}
							email={email}
							username={username}
							password={password}
							changeName={changeName}
							changeEmail={changeEmail}
							changeUsername={changeUsername}
							changePassword={changePassword}
							sendRegister={sendRegister}
						/> :
						<VerifyToken
							tokenConfirm={tokenConfirm}
							token={token}
							changeToken={changeToken}
							messageToken={messageToken}
							resendToken={resendToken}
							backToRegister={backToRegister}
						/>
					}
				</div>}

			</div>
		)
}

export default Login