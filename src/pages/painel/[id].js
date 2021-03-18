import {useRouter} from 'next/router'
import FormRestore from '../../components/FormRestore'
import {useEffect,useState} from 'react'
import useInput from '../../components/states/useInput'
import db from '../../../utils/database'
import bcrypt from 'bcryptjs'
import cookieCutter from 'cookie-cutter'
import {encrypt,decrypt} from '../../components/crypto/crypto'
import axios from 'axios'

const getUsers = async (id) => {
	const response = await db('*').into('users')
	return response
}

export async function getStaticPaths(){
	const data = await getUsers()

	const users = data.map(user => {
			return {
						params: {
							id:user.token
						}
					}
		})
console.log(users)
	return { 
		paths:users,
		fallback:false
	}
}

export async function getStaticProps (context) {
	const id = context.params.id
	const data = await getUsers()
	const user = data.filter(user => {
		if(user.token == id){
			return user
		}
	})
	
	return {
		props:{
			id:id,
			name:user[0].name,
			username:user[0].username,
			email:user[0].email,
		}
	}
	
}

const Restore = (props) => {
	const router = useRouter()
	const [pass,setPass,changePass] = useInput('')
	const [confirmPass,setConfirmPass] = useState('')
	const [messagePass,setMessagePass] = useState('')
	
	const changeConfirmPass = (event) => {
		let newPass = event.target.value
		if(newPass != pass){
			setMessagePass("As Senhas digitadas são diferentes")
		}else{
			setMessagePass('')
		}
		setConfirmPass(newPass)
	}

	const sendNewPass = async (event) => {
		event.preventDefault()

		if(confirmPass === pass){
			const emailToken =  Math.floor(Math.random() * (100000000 - 10000000 + 1)) + 10000000
				const cryptoToken = encrypt(emailToken)
				console.log(props.name)
			const userData = {
				pass:confirmPass,
				name:props.name,
				token:cryptoToken
			}
			const response = await axios.post(`../api/login/restore/update`,userData)
			if(response.data.response > 0){
				router.push('/login')
			}
		}else{
			setMessagePass("As Senhas digitadas são diferentes")
		}
	}
	return(
			<div>
				<div>
					<FormRestore
						name={props.name}
						pass={pass}
						changePass={changePass}
						confirmPass={confirmPass}
						changeConfirmPass={changeConfirmPass}
						sendNewPass={sendNewPass}
						messagePass={messagePass}
					/>
				</div>
			</div>
		)
}

export default Restore