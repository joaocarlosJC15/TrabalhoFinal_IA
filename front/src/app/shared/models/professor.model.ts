export class Professor {
  constructor(
    public id: number,
    public nome: string,
    public descricao?: string,
    public data_nascimento?: Date,
    public email?: string
  ) {

  }

  static deserialize(data: any): Professor {
    const id = data.id;
    const nome = data.nome;
    const data_nascimento = data.data_nascimento;
    const email = data.email
    const descricao = data.descricao;

    return new Professor(id, nome, descricao, data_nascimento, email);
  }
}