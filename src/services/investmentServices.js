const investmentRepository = require('../repositories/investmentRepositories.js');

const getAllInvestments = () => {

    const investments = investmentRepository.findAll();
    return investments;
}

const createNewInvestment = (newInvestmentData) => {

    if(newInvestmentData.valor <= 0){

        return {
            success: false, message: 'O valor do investimento deve ser maior que 0.'
        };

    }

    const investmentDate = new Date(newInvestmentData.data);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if(investmentDate>today){

        return {
            success: false, message : 'A data do investimento não pode estar no futuro.'
        };

    }

    const investment = investmentRepository.create(newInvestmentData);
    return {
        success: true, data: investment
    };

};

const updateInvestment = (id, dataUpdate) =>{

    const existingInvestment = investmentRepository.findById(id);
    if(!existingInvestment){

        return {
            success: false, message: 'Investimento não encontrado.'
        };

    }

    if(dataUpdate.valor !== undefined && dataUpdate<= 0){

        return {
            success: false, message: 'O valor do investimento deve ser maior que 0.'
        };

    }


     if (dataUpdate.data !== undefined) {
        const investmentDate = new Date(dataUpdate.data);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (investmentDate > today) {
            return {
                success: false, message: 'A data do investimento não pode estar no futuro.'
            };
        }
    }

    const updateInvestment = investmentRepository.update(id, dataUpdate);
    return {
        success: true, data: updateInvestment
    };

}

const deleteInvestment = (id)=> {

    const success = investmentRepository.remove(id);
    if(!success){

        return{
            success: false, message: 'Investimento não encontrado.'
        };
    }

    return{success: true, message: 'Investimento removido com sucesso.'};

}

module.exports = {

    getAllInvestments,
    createNewInvestment,
    updateInvestment,
    deleteInvestment,
};