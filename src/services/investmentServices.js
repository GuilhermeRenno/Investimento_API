const investmentRepository = require('../repositories/investmentRepositories.js');

const getAllInvestments = () => {

    const investments = investmentRepository.findAll();
    return investments;
}

const createNewInvestment = (newInvestmentData) => {

    if(newInvestmentData.valor <= 0){

        return {
            sucess: false, message: 'O valor do investimento deve ser maior que zero.'
        };

    }

    const investmentDate = new Date(newInvestmentData.data);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if(investmentDate>today){

        return {
            sucess: false, message : 'A data do investimento não pode ser no futuro.'
        };

    }

    const investment = investmentRepository.create(newInvestmentData);
    return {
        sucess: true, data: investment
    };

};

const updateInvestment = (id, dataUpdate) =>{

    const existingInvestment = investmentRepository.findById(id);
    if(!existingInvestment){

        return {
            sucess: false, message: 'Investimento não encontrado.'
        };

    }

    if(dataUpdate.valor !== undefined && dataUpdate<= 0){

        return {
            sucesss: false, message: 'O valor do investimento deve ser maior que zero.'
        };

    }


     if (dataUpdate.data !== undefined) {
        const investmentDate = new Date(dataUpdate.data);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (investmentDate > today) {
            return {
                success: false, message: 'A data do investimento não pode ser no futuro.'
            };
        }
    }

    const updateInvestment = investmentRepository.update(id, dataUpdate);
    return {
        sucess: true, data: updateInvestment
    };

}

const deleteInvestment = (id)=> {

    const sucess = investmentRepository.remove(id);
    if(!sucess){

        return{
            sucess: false, message: 'Investimento não encontrado.'
        };
    }

    return{sucess: true, message: 'Investimento removido com sucesso.'};

}

module.exports = {

    getAllInvestments,
    createNewInvestment,
    updateInvestment,
    deleteInvestment,
};