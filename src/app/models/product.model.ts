export interface Product {
  id: number | null;     
  codigoBarras: string | null;
  nome: string;
  preco: number;
  quantidadeEstoque: number;
  categoria: {
    id: number | null;
  } | null;
}
