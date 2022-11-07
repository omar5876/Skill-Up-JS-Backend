const { Category } = require('../../database/models')
const { faker } = require('@faker-js/faker')

const factoryCategories = (cant) => {
	const categories = []
	for (let i = 0; i < cant; i++) {
		categories.push(
			Category.build({
				name: faker.company.suffixes(),
				name: faker.company.bs(),
			})
		)
	}
	return Promise.all(categories.map((category) => category.save())).then((response) => response)
	// return categories
}

module.exports = {
	factoryCategories,
}
