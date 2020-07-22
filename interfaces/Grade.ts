export interface Grade {
  id: number;
  nome: string;
  descricao?: string;
  fk_usuario: number;
}