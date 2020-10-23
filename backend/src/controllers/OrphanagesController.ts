import { Request, response, Response, request } from 'express';
import { getRepository } from 'typeorm'
import Orphanage from '../models/Orphanage'
import orphanageView from '../views/orphanages_view'
import * as Yup from 'yup'

export default {
    async index(req: Request, res: Response) {
        const orphanagesRepository = getRepository(Orphanage);
        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        })

        return res.status(200).json(orphanageView.renderMany(orphanages))
    },
    async show(req: Request, res: Response) {
        try {
            const { id } = req.params
            const orphanagesRepository = getRepository(Orphanage);
            const orphanages = await orphanagesRepository.findOneOrFail(id, {
                relations: ['images']
            })

            return res.status(200).json(orphanageView.render(orphanages))

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: error.message,
                msg: 'Não foi possível localizar o id informado'
            })
        }

    },
    async create(req: Request, res: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = req.body
        const orphanagesRepository = getRepository(Orphanage);

        const requestImages = req.files as Express.Multer.File[]
        const images = requestImages.map(image => {
            return { path: image.filename }
        })
        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        }
        const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatorio'),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                }))

        })

        await schema.validate(data, { 
            abortEarly: false,
        })

        const orphanage = orphanagesRepository.create(data)
        await orphanagesRepository.save(orphanage)
        return res.status(201).json(orphanage)
    }
}