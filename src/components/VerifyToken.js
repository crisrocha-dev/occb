import Link from 'next/link'

const VerifyToken = (props) => {
	return(
			<div>
				<form onSubmit={props.tokenConfirm}>
					<input 
						type="text" 
						value={props.token}
						onChange={props.changeToken}
					/>
					<input type="submit" value="Confirmar"/>
				</form>
				<div>
					<p> {props.messageToken} </p>
				</div>
				<div>
					<button onClick={props.backToRegister}>Voltar a Página de Registro </button>
					<button onClick={props.resendToken}>Reenviar Token</button>
				</div>
			</div>
		)
}
export default VerifyToken