const investmentService = require('../services/investmentServices.js');
const investmentRepository = require('../repositories/investmentRepositories.js');

jest.mock('../repositories/investmentRepositories.js');

describe('Serviço de Investimentos - createNewInvestment', () => {
    beforeEach(() => {
    jest.clearAllMocks();
    });
 
  it('deve retornar um erro quando o valor do investimento for menor ou igual a zero', () => {
    
    const dadosInvalidos = { nome: 'Teste Valor Zero', tipo: 'Ação', valor: 0, data: '2024-01-01' };
    
    const resultado = investmentService.createNewInvestment(dadosInvalidos);

    expect(resultado.success).toBe(false);
    expect(resultado.message).toBe('O valor do investimento deve ser maior que 0.');
  });

  it('deve retornar um erro quando a data do investimento for no futuro', () => {
    
    const dataDeAmanha = new Date();
    dataDeAmanha.setDate(dataDeAmanha.getDate() + 1); 
    const dadosComDataFutura = { nome: 'Teste Data Futura', tipo: 'Fundo', valor: 1000, data: dataDeAmanha.toISOString().split('T')[0] };
        
    const resultado = investmentService.createNewInvestment(dadosComDataFutura);
    
    expect(resultado.success).toBe(false);
    expect(resultado.message).toBe('A data do investimento não pode estar no futuro.');
  });

  it('deve chamar o repositório e retornar sucesso quando os dados são válidos (caminho feliz)', () => {
    
    const dadosValidos = { nome: 'Investimento Válido', tipo: 'Título', valor: 500, data: '2024-01-01' };
    const investimentoCriadoNoRepo = { id: 99, ...dadosValidos }; 
    
    investmentRepository.create.mockReturnValue(investimentoCriadoNoRepo);

    
    const resultado = investmentService.createNewInvestment(dadosValidos);

    
    expect(resultado.success).toBe(true);
    expect(resultado.data).toEqual(investimentoCriadoNoRepo); 
    expect(investmentRepository.create).toHaveBeenCalledWith(dadosValidos); 
    expect(investmentRepository.create).toHaveBeenCalledTimes(1); 
  });

 
  describe('Função: updateInvestment', () => {

    it('deve atualizar o investimento e retornar sucesso quando o ID existe', () => {
      
      const idExistente = 1;
      const dadosParaAtualizar = { valor: 1500 };
      const investimentoAtualizado = { id: idExistente, nome: 'Ação XYZ', tipo: 'Ação', valor: 1500, data: '2024-01-01' };

      investmentRepository.findById.mockReturnValue({ id: idExistente, nome: 'Ação XYZ', tipo: 'Ação', valor: 1000, data: '2024-01-01' });
      investmentRepository.update.mockReturnValue(investimentoAtualizado);

      const resultado = investmentService.updateInvestment(idExistente, dadosParaAtualizar);

      expect(resultado.success).toBe(true);
      expect(resultado.data).toEqual(investimentoAtualizado);
      expect(investmentRepository.findById).toHaveBeenCalledWith(idExistente);
      expect(investmentRepository.update).toHaveBeenCalledWith(idExistente, dadosParaAtualizar);
    });

    it('deve retornar um erro quando o ID do investimento a ser atualizado não existe', () => {
     
      const idInexistente = 999;
      const dadosParaAtualizar = { valor: 1500 };
      
      investmentRepository.findById.mockReturnValue(null);

      const resultado = investmentService.updateInvestment(idInexistente, dadosParaAtualizar);

      expect(resultado.success).toBe(false);
      expect(resultado.message).toBe('Investimento não encontrado.');
      
      expect(investmentRepository.update).not.toHaveBeenCalled();
    });

  });

  describe('Função: deleteInvestment', () => {

    it('deve remover o investimento e retornar sucesso quando o ID existe', () => {
      
      const idExistente = 1;
     
      investmentRepository.remove.mockReturnValue(true);

      const resultado = investmentService.deleteInvestment(idExistente);

      expect(resultado.success).toBe(true);
      expect(investmentRepository.remove).toHaveBeenCalledWith(idExistente);
    });

    it('deve retornar um erro quando o ID do investimento a ser deletado não existe', () => {
     
      const idInexistente = 999;

      investmentRepository.remove.mockReturnValue(false);

      const resultado = investmentService.deleteInvestment(idInexistente);

      expect(resultado.success).toBe(false);
      expect(resultado.message).toBe('Investimento não encontrado.');
    });

  });

});