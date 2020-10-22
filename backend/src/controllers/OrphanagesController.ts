import { Request, response, Response } from 'express';
import { getRepository } from 'typeorm'
import Orphanage from '../models/Orphanage'

export default { 
    async index(req: Request, res: Response){
        const orphanagesRepository = getRepository(Orphanage);
        const orphanages = await orphanagesRepository.find()

        return res.status(200).json(orphanages)
    },
    async show(req: Request, res: Response){
        try {
            const { id } = req.params
            const orphanagesRepository = getRepository(Orphanage);
            const orphanages = await orphanagesRepository.findOneOrFail(id)
            console.log(orphanages);
            
            return res.status(200).json(orphanages)

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
    
        const orphanage = orphanagesRepository.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        })
        await orphanagesRepository.save(orphanage)
        return res.status(201).json(orphanage)
    }
}