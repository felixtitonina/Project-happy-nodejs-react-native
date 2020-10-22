import { Request, response, Response, request } from 'express';
import { getRepository } from 'typeorm'
import Orphanage from '../models/Orphanage'
import orphanageView from '../views/orphanages_view'

export default { 
    async index(req: Request, res: Response){
        const orphanagesRepository = getRepository(Orphanage);
        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        })

        return res.status(200).json(orphanageView.renderMany(orphanages))
    },
    async show(req: Request, res: Response){
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
    async create(req: Request, res: Response){        
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
            return { path: image.filename}
        })
        const orphanage = orphanagesRepository.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        })
        await orphanagesRepository.save(orphanage)
        return res.status(201).json(orphanage)
    }
}