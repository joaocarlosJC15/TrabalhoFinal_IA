export class Sala {
  constructor(
    public id: number,
    public nome: string,
    public descricao?: string
  ) {

  }

  static deserialize(data: any): Sala {
    const id = data.id;
    const nome = data.nome;
    const descricao = data.descricao;

    return new Sala(id, nome, descricao);
  }
}