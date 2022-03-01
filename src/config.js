require('dotenv').config();
global.SALT_KEY = `${process.env.SALT_KEY}`
global.EMAIL_TMPL = 'Olá, <strong>{0}</strong>, seja bem vindo ao Node Store!';

module.exports = {
  connectionString: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@balta-io.52wjk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  sendgridkey: `${process.env.SEND_KEY}`,
  ContainerConnectionString: 'TBD'
}
