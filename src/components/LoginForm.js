const LoginForm = (props) => {
	return (
			<div>
				<form onSubmit={props.enterLogin}>
					<input 
						type="text" 
						value={props.username} 
						onChange={props.changeUsername} 
						placeholder="username"
					/>
					<p>{props.messageUsername}</p>
					<input 
						type="text" 
						value={props.password} 
						onChange={props.changePassword} 
						placeholder="username"
					/>
					<p>{props.messagePassword}</p>
					<input type="submit" value="Login"/>
				</form>
				<p> Não tem Cadastro ? <button onClick={props.enterRegister}> Cadastre-se </button></p>
				<button onClick={props.resendPass}> Esqueceu a senha ? </button>
			</div>
		)
}
export default LoginForm