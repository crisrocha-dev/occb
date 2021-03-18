export const drawEmailToken = (data) => {
	const content = `<center><h1>Olá ${data.name} </h1><h2> Seu Código de Cadastro é : </h2></h1><code>${data.token} </code></h1></center>`
	const draw = {
		email:data.email,
		subject:"Código de Cadastro OCCB",
		content:content
	}
	return draw
}
export const drawEmailPass = (data) => {
	const content = `<center><h1>Olá ${data.name} </h1><h2> Clique no botão abaixo para criar uma nova senha : </h2></h1> ${data.url}</h1></center>`
	const draw = {
		email:data.email,
		subject:"Recuperação de Senha OCCB",
		content:content
	}
	return draw
}