CREATE TABLE grades ( 
	id serial,
	nome varchar(100) NOT NULL,
	descricao text,
	PRIMARY KEY (id)
);

CREATE TABLE dias_semana (
	id serial,
	nome varchar(100) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE salas (
	id serial,
	fk_grade int2 NOT NULL,
	nome varchar(100) NOT NULL,
	descricao text,
	PRIMARY KEY (id),
	FOREIGN KEY (fk_grade) REFERENCES grades(id)
);


CREATE TABLE professores (
	id serial,
	fk_grade int2 NOT NULL,
	nome varchar(100) NOT NULL,
	descricao text,
	data_nascimento date,
	email varchar(100),
	PRIMARY KEY (id),
	FOREIGN KEY (fk_grade) REFERENCES grades(id)
);


CREATE TABLE periodos (
	id serial,
	fk_grade int2 NOT NULL,
	nome varchar(100) NOT NULL,
	descricao text,
	PRIMARY KEY (id),
	FOREIGN KEY (fk_grade) REFERENCES grades(id)
);

CREATE TABLE horarios_por_dia (
	id serial,
	fk_grade int2 NOT NULL,
	fk_dia_semana int2 NOT NULL,
	horario_inicio timetz NOT NULL,
	horario_termino timetz NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (fk_dia_semana) REFERENCES dias_semana(id),
	FOREIGN KEY (fk_grade) REFERENCES grades(id)
);

CREATE TABLE materias (
	id serial,
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

CREATE TABLE resultados_algoritmo_genetico (
	id serial,
	fk_grade int2 NOT NULL,
	tamanho_populacao int2 NOT NULL,
	numero_geracoes_necessario int2 NOT NULL,
	tamanho_torneio int2 NOT NULL,
	taxa_cruzamento numeric(7,4) NOT NULL,
	taxa_mutacao numeric(7,4) NOT NULL,
	elitismo boolean NOT NULL,
	tamanho_elitismo int2 NULL,
	aptidao numeric(7,4) NOT NULL,
	data_inicio timestamptz NOT NULL,
	data_termino timestamptz NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (fk_grade) REFERENCES grades(id)
);

CREATE TABLE horarios_gerados (
	fk_resultado_algoritmo_genetico int2 NOT NULL,
	fk_horario_por_dia int2 NOT NULL,
	fk_sala int2 NOT NULL,
	fk_materia int2 NOT NULL,
	FOREIGN KEY (fk_resultado_algoritmo_genetico) REFERENCES resultados_algoritmo_genetico(id),
	FOREIGN KEY (fk_horario_por_dia) REFERENCES horarios_por_dia(id),
	FOREIGN KEY (fk_sala) REFERENCES salas(id),
	FOREIGN KEY (fk_materia) REFERENCES materias(id)
);



