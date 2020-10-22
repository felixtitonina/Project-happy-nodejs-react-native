import {Router} from 'express'
import multer from 'multer'

import uploadConfig from './config/upload'
import OrphanageController from './controllers/OrphanagesController'

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/orphanages', OrphanageController.index) 
routes.get('/orphanages/:id', OrphanageController.show) 
routes.post('/orphanages', upload.array('images') ,OrphanageController.create) 

export default routes;

    // "name": "Felix tito nina",
    // "latitude": -23.4543142,
    // "longitude": -46.3912693,
    // "about": "Sobre orfa",
    // "instructions": "venha visitar",
    // "opening_hours": "das 8 as 18 ",
    // "open_on_weekends": true

    // parada 01:22