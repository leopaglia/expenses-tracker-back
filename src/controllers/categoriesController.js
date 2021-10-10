import { controller } from '../utils/controllers.js'
import * as categoriesRepository from '../repositories/categoriesRepository.js'

export const getCategories = controller({}, async (_, res) => {
  const categories = await categoriesRepository.fetchCategories()

  return res.status(200).json(categories)
})

export const createCategory = controller(
  { required: ['name'] },
  async (req, res) => {
    const { name } = req.body

    const exists = await categoriesRepository.existsByName(name)

    if (exists) {
      return res
        .status(409)
        .json({ error: `A category with name '${name}' already exists.` })
    }

    const category = await categoriesRepository.insertCategory(name)

    return res.status(201).json(category)
  }
)
