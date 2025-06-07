const investmentService = require('../services/investmentServices.js');
const investmentRepository = require('../repositories/investmentRepositories.js');

jest.mock('../repositories/investmentRepositories.js');

describe('Serviço de Investimentos - createNewInvestment', () => {

 
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

});