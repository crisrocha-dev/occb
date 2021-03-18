const nodemailer = require('nodemailer');

const emailConfirm = (emailData) => {

  const  transporter = nodemailer.createTransport({
    service: 'Hotmail',
      auth: {
        user: 'crisrocha.dev@outlook.com',
        pass: 'vini2106'
      }
  });
 
  const email = {
    from: 'crisrocha.dev@outlook.com',
    to: emailData.email,
    subject: emailData.subject,
    text: 'OCCB',
    html: emailData.content

  };
  
  transporter.sendMail(email, (err, result)=>{
    if(err) return console.log("Erro -> " ,err)
    console.log("Mensagem enviada!!!! " + result)
  });

}
 export default emailConfirm