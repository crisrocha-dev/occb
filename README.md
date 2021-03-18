# Sistema de gerênciamendo de Blogs

## Ferramentas usadas

1. NodeJs
1. NextJs
1. Knex
1. Axios
1. cryptr
1. cookie-cutter
1. cookie
1. nodemailer

## Autenticação de Usuário

<ul>
	<li>Recebe Dados do formulario</li>
	<li>Gera, cryptografa e armazena token no cookie</li>
	<li>Fax requisição na Api para enviar email</li>
	<li>Envia Token por email</li>
	<li>Confirma Token, salva no Cookie e regsitra do Banco de Dados</li>
	<li>Login também com registro no cookie</li>
	<li>Autenticação com uso de Cookie</li>
	<li>Recuperação de Senha, com envio de email de confirmação</li>
</ul>

### Cadastro de usuário

*Autenticação do email, com envio do token com Nodemailer*


### Login

*Busca do nome de usuário*
*Comparação das senhas criptografadas*
*Atualização ou inclusão do Cookie*
*Redirecionamento para o Painel*

### Recuperação de Senha

*Busca de email no banco de dados*
*Envio de link unico para recuperação de senha*

### Autenticação do Usuário

*Autenticação do usuário com useContext react*
*Busca dos dados nos Cookies*