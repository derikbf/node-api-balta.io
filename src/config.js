 global.SALT_KEY = ''
 global.EMAIL_TMPL = '<strong>{0}</strong>';

 module.exports = {
   connectionString: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@balta-io.52wjk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
   sendgridkey: 'TBD',
   ContainerConnectionString: 'TBD'
 }
