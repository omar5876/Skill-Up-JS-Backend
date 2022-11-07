const { Category, Role, User, Transaction } = require('../../database/models')

const cleanDB = async () => {
	await Transaction.destroy({ where: {}, force: true })
	await User.destroy({ where: {}, force: true })
	await Role.destroy({ where: {}, force: true })
	await Category.destroy({ where: {}, force: true })
}

module.exports = { cleanDB }
