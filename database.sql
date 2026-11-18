-- O OMNITORRINCO - MODELO RELACIONAL PROPOSTO
-- Este script cria a estrutura para uma futura versão com persistência.
-- O site atual continua estático e não envia os dados do formulário para este banco.

CREATE DATABASE IF NOT EXISTS omnitorrinco
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE omnitorrinco;

CREATE TABLE categoria (
  id_categoria INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(60) NOT NULL UNIQUE,
  descricao VARCHAR(255) NULL
);

CREATE TABLE conteudo (
  id_conteudo INT AUTO_INCREMENT PRIMARY KEY,
  id_categoria INT NOT NULL,
  titulo VARCHAR(100) NOT NULL,
  descricao TEXT NOT NULL,
  versao VARCHAR(30) NULL,
  url_referencia VARCHAR(500) NULL,
  CONSTRAINT fk_conteudo_categoria
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT chk_titulo_conteudo CHECK (CHAR_LENGTH(titulo) >= 3)
);

CREATE TABLE mensagem_contato (
  id_mensagem INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(60) NOT NULL,
  email VARCHAR(120) NOT NULL,
  assunto VARCHAR(30) NOT NULL,
  mensagem TEXT NOT NULL,
  data_envio DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_nome_contato CHECK (CHAR_LENGTH(nome) >= 3),
  CONSTRAINT chk_assunto_contato CHECK (assunto IN ('Addons','Texturas','Mapas','Ferramentas','Outro'))
);

INSERT INTO categoria (nome, descricao) VALUES
('Addons', 'Modificações de elementos, itens e comportamentos.'),
('Texturas', 'Pacotes que alteram a aparência visual.'),
('Mapas', 'Mundos, cenários e aventuras.'),
('Ferramentas', 'Recursos auxiliares para jogadores.');
