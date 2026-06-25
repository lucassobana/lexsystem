export type StatusExpediente =
  | "Iniciar"
  | "Entregar"
  | "Ciência"
  | "Responder"
  | "Respondido"
  | "Entregue";

export interface Expediente {
  id: string;
  data: string;
  status: StatusExpediente;
  numeroProcesso: string;
  partes: string;
  comarca: string;
  honorarios: number;
  situacaoHistorico: string;
  nome: string;
  honorariosRecebidos?: "Sim" | "Não";
}
