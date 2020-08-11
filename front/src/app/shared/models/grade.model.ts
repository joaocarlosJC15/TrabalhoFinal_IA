export class Grade {
  constructor(
    public id: number,
    public nome: string,
    public descricao?: string
  ) {

  }

  static deserialize(data: any): Grade {
    const id = data.id;
    const nome = data.nome;
    const descricao = data.descricao;

    return new Grade(id, nome, descricao);
  }
}