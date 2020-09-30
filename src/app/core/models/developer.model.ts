import{Game} from "./game.model"


export interface Developer{
    _id: String
    nome: String
    imagem: String
    nacionalidade: String
    plataforma: String
    games: Game[]
}