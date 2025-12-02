import { StorageService } from './storage.service';

describe('StorageService', () => {

  let service: StorageService;

  beforeEach(() => {
    service = new StorageService();
    localStorage.clear();
  });

  it('deve salvar um valor no localStorage', () => {
    service.set('chave', { a: 123 });

    const raw = localStorage.getItem('chave');
    expect(raw).toBe(JSON.stringify({ a: 123 }));
  });

  it('deve recuperar um valor salvo', () => {
    localStorage.setItem('user', JSON.stringify({ nome: 'Ana' }));

    const result = service.get<{ nome: string }>('user');

    expect(result).toEqual({ nome: 'Ana' });
  });

  it('deve retornar null quando a chave não existir', () => {
    const result = service.get('nao_existe');

    expect(result).toBeNull();
  });

});
