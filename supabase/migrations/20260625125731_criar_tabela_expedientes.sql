CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE public.expedientes (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "data" DATE NOT NULL,
  "status" TEXT NOT NULL,
  "numeroProcesso" TEXT NOT NULL,
  "partes" TEXT NOT NULL,
  "comarca" TEXT NOT NULL,
  "honorarios" NUMERIC(10, 2) NOT NULL DEFAULT 0,
  "situacaoHistorico" TEXT NOT NULL,
  "nome" TEXT NOT NULL,
  "honorariosRecebidos" TEXT DEFAULT 'Não',
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);