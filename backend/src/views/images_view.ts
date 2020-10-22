import Image from '../models/Image'
import Orphanage from '../models/Image'

export default {
    // Este render vai pegar o orfanato e vai devolver da maneira que deve retornar pro front 
    render(image: Image){
       return {
        id: image.id,                               
        url: `http://localhost:3333/uploads/${image.path}` 
       } 
    },
    
    renderMany(image: Image[]){
        return image.map(image => this.render(image))
    }
}