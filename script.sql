CREATE TABLE usuarios (
	id int2 NULL,
	nome varchar(100) NOT NULL,
	email varchar(100) NOT NULL,
	senha varchar(100) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE grades ( 
	id int2 NULL,
	fk_usuario int2 NOT NULL,
	nome varchar(100) NOT NULL,
	descricao text,
	PRIMARY KEY (id),
	FOREIGN KEY (fk_usuario) REFERENCES usuarios(id)
);

CREATE TABLE dias_semana (
	id int2 NULL,
	nome varchar(100) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE salas (
	id int2,
	fk_grade int2 NOT NULL,
	nome varchar(100) NOT NULL,
	descricao text,
	PRIMARY KEY (id),
	FOREIGN KEY (fk_grade) REFERENCES grades(id)
);


CREATE TABLE professores (
	id int2,
	fk_grade int2 NOT NULL,
	nome varchar(100) NOT NULL,
	descricao text,
	data_nascimento date,
	email varchar(100),
	PRIMARY KEY (id),
	FOREIGN KEY (fk_grade) REFERENCES grades(id)
);


CREATE TABLE periodos (
	id int2,
	fk_grade int2 NOT NULL,
	nome varchar(100) NOT NULL,
	descricao text,
	PRIMARY KEY (id),
	FOREIGN KEY (fk_grade) REFERENCES grades(id)
);

CREATE TABLE horarios_por_dia (
	id int2,
	fk_grade int2 NOT NULL,
	fk_dia_semana int2 NOT NULL,
	horario_inicio timetz NOT NULL,
	horario_termino timetz NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (fk_dia_semana) REFERENCES dias_semana(id),
	FOREIGN KEY (fk_grade) REFERENCES grades(id)
);

CREATE TABLE materias (
	id int2,
	fk_grade int2 NOT NULL,
	fk_professor int2 NOT NULL,
	fk_periodo int2 NOT NULL,
	nome varchar(100) NOT NULL,
	descricao text,
	quantidade_aulas int2 NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (fk_periodo) REFERENCES periodos(id),
	FOREIGN KEY (fk_professor) REFERENCES professores(id),
	FOREIGN KEY (fk_grade) REFERENCES grades(id)
);


CREATE TABLE restricoes_horarios_por_dia_periodos (
	fk_horario int2 NOT NULL,
	fk_periodo int2 NOT NULL,
	FOREIGN KEY (fk_horario) REFERENCES horarios_por_dia(id),
	FOREIGN KEY (fk_periodo) REFERENCES periodos(id)
);

CREATE TABLE restricoes_materias_salas (
	fk_materia int2 NOT NULL,
	fk_sala int2 NOT NULL,
	FOREIGN KEY (fk_materia) REFERENCES materias(id),
	FOREIGN KEY (fk_sala) REFERENCES salas(id)
);

CREATE TABLE restricoes_salas_horarios_por_dia (
	fk_sala int2 NOT NULL,
	fk_horario_por_dia int2 NOT NULL,
	FOREIGN KEY (fk_sala) REFERENCES salas(id),
	FOREIGN KEY (fk_horario_por_dia) REFERENCES horarios_por_dia(id)
);

CREATE TABLE restricoes_professores_horarios_por_dia (
	fk_professor int2 NOT NULL,
	fk_horario_por_dia int2 NOT NULL,
	FOREIGN KEY (fk_professor) REFERENCES professores(id),
	FOREIGN KEY (fk_horario_por_dia) REFERENCES horarios_por_dia(id)
);


CREATE TABLE horarios_gerados (
	fk_grade int2 NOT NULL,
	fk_horario_por_dia int2 NOT NULL,
	fk_sala int2 NOT NULL,
	fk_materia int2 NOT NULL,
	FOREIGN KEY (fk_grade) REFERENCES grades(id),
	FOREIGN KEY (fk_horario_por_dia) REFERENCES horarios_por_dia(id),
	FOREIGN KEY (fk_sala) REFERENCES salas(id),
	FOREIGN KEY (fk_materia) REFERENCES materias(id)
);



