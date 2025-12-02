import { StockService } from './stock.service';
import { Product } from '../models/product.model';

describe('StockService', () => {

  let service: StockService;

  beforeEach(() => {
    service = new StockService();
    localStorage.clear();
  });

  it('deve aplicar estoque local ao produto', () => {
    localStorage.setItem('product_stock_overrides', JSON.stringify({ 1: 5 }));

    const product: Product = {
      id: 1,
      codigoBarras: null,
      nome: 'Teste',
      preco: 10,
      quantidadeEstoque: 99,
      categoria: null
    };

    const result = service.applyToProduct(product);

    expect(result.quantidadeEstoque).toBe(5);
  });

  it('deve ignorar produto sem id', () => {
    const product: Product = {
      id: 0,
      codigoBarras: null,
      nome: 'Sem ID',
      preco: 10,
      quantidadeEstoque: 10,
      categoria: null
    };

    const result = service.applyToProduct(product);

    expect(result.quantidadeEstoque).toBe(10);
  });

  it('deve salvar novo estoque no localStorage', () => {
    service.setStock(3, 20);

    const saved = JSON.parse(localStorage.getItem('product_stock_overrides')!);

    expect(saved['3']).toBe(20);
  });

  it('deve retornar null quando não houver estoque salvo', () => {
    expect(service.getStock(99)).toBeNull();
  });

  it('deve retornar null para id null', () => {
    expect(service.getStock(null)).toBeNull();
  });
});
