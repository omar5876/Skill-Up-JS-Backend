const { Category } = require('../../database/models')
const { faker } = require('@faker-js/faker')

// populate table categories
const categoriesFactory = async (cant) => {
	const categories = []
	for (let i = 0; i < cant; i++) {
		categories.push(Category.build(generateRandomCategorie()))
	}
	await populateCategories(categories)
	const categorieList = await Category.findAll()
	return categorieList
}

const generateRandomCategorie = () => {
	return {
		name: faker.company.suffixes(),
		name: faker.company.bs(),
	}
}

const populateCategories = (categories) => {
	return Promise.all(categories.map((category) => category.save())).then((response) => response)
}

//

// exports
module.exports = {
	categoriesFactory,
	generateRandomCategorie,
}
