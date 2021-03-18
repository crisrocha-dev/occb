
export default function FormRestore (props){
	return(
		<form onSubmit={props.sendNewPass}>
			<h1>Olá {props.name}, digite a nova senha</h1>
			<input type="password" placeholder="password" value={props.pass} onChange={props.changePass}/>
			<p>{props.messagePass}</p>
			<input type="password" placeholder="password" value={props.confirmPass} onChange={props.changeConfirmPass}/>
			<p></p>
			<input type="submit"/>
		</form>
	)
}