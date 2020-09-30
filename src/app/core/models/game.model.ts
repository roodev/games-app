import {Developer} from "./developer.model"

export interface Game{
    _id: String,
    nome: String,
    plataforma: String,
    classificacao?: Number,
    sinopse: String,
    imagem: String,
    developer: Developer    
}