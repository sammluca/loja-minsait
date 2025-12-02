import { NotificationService } from './notification.service';

describe('NotificationService', () => {

  let service: NotificationService;
  let alertSpy: jasmine.Spy;

  beforeEach(() => {
    service = new NotificationService();
    alertSpy = spyOn(window, 'alert');
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve chamar alert ao usar show()', () => {
    service.show('Mensagem teste');
    expect(alertSpy).toHaveBeenCalledWith('Mensagem teste');
  });

  it('success deve chamar show()', () => {
    service.success('Sucesso!');
    expect(alertSpy).toHaveBeenCalledWith('Sucesso!');
  });

  it('error deve chamar show()', () => {
    service.error('Erro!');
    expect(alertSpy).toHaveBeenCalledWith('Erro!');
  });
});
