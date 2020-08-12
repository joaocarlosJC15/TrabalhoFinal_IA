export class Periodo {
  constructor(
    public id: number,
    public nome: string,
    public descricao?: string
  ) {

  }

  static deserialize(data: any): Periodo {
    const id = data.id;
    const nome = data.nome;
    const descricao = data.descricao;

    return new Periodo(id, nome, descricao);
  }
}