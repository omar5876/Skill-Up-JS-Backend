const app = require('./app')
require('dotenv').config()

const port = process.env.PORT || 3000

app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`Servidor funcionando en el puerto ${port}`)
})
