import express from 'express'
import passport from 'passport'
import { ObjectId } from 'mongoose'
import MyplaylistService from '../services/myplaylist.service'
import { Myplaylist } from '../types/myplaylist.type'

const router = express.Router()
const service = new MyplaylistService()

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const product: Myplaylist = req.body
    const newProduct = await service.create(product, req.body.category as ObjectId)
    res.status(201).json(newProduct)
  }
)

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      if (req.query.name) {
        const Myplaylist = await service.findByName(req.query.name as string)
        res.status(200).json(Myplaylist)
      } else if (req.query.category) {
        const Myplaylist = await service.findByCategory(
          req.query.category as string
        )
        res.status(200).json(Myplaylist)
      } else if (req.query.id) {
        const Myplaylist = await service.findById(req.query.id as string)
        res.status(200).json(Myplaylist)
      }
      const Myplaylist = await service.findAll()
      res.status(200).json(Myplaylist)
    } catch (error) {
      next(error)
    }
  }
)

export default router