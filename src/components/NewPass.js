const NewPass = (props) => {
	return(
			<div> 
				<form onSubmit={props.sendEmailPass}>
				<input type="email" required={true} value={props.email} onChange={props.changeEmail} placeholder="email"/>
				<p>{props.messageEmailPass}</p>
				<input type="submit" value="enviar"/>
				</form>
			</div>
		)
}
export default NewPass