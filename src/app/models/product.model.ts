export interface Product {
  id: number;
  codigoBarras?: string | null;
  nome: string;
  preco: number;
  quantidadeEstoque: number;
  categoria?: {
    id: number | null;
  } | null;
}
