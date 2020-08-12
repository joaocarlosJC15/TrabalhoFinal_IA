export class DiaSemana {
  constructor(
    public id: number,
    public nome: string
  ) {
  }

  static deserialize(data: any): DiaSemana {
    const id = data.id;
    const nome = data.nome;
    return new DiaSemana(id, nome);
  }
}