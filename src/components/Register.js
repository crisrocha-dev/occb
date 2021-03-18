

const Register = (props) => {

	return(
			<div>
				<form onSubmit={props.sendRegister}>
					<div>
						<input
							type="text"
							value={props.username}
							placeholder="Username"
							onChange={props.changeUsername}
						/>
					</div>
					<div>
						<input
							type="text"
							value={props.name}
							placeholder="Nome"
							onChange={props.changeName}
						/>
					</div>
					<div>
						<input
							type="email"
							value={props.email}
							placeholder="Email"
							onChange={props.changeEmail}
						/>
					</div>
					<div>
						<input
							type="password"
							value={props.password}
							placeholder="Senha"
							onChange={props.changePassword}
						/>
					</div>
					<div>
						<input
							type="submit"
							value="Cadastrar"
						/>
					</div>
				</form>
			</div>
		)
}

export default Register