const investments = [
    {
        id: 1,
        nome: 'tesouro selic 2030',
        tipo: 'Titulo',
        valor: 5600.50,
        data: '2023-10-01',
    },
    {
        id: 2,
        nome: 'Ações Petrobras',
        tipo: 'Ação',
        valor: 4250.30,
        data: '2025-02-15',

    }

]

let nextId = 3;

const findAll = () =>{

    return investments;
}

const create = (newInvestmentData) =>{

    const investment = {
        id: nextId,
        ...newInvestmentData,
    };

    nextId++;
    investments.push(investment);
    return investment;

};

const findById = (id)=>{

    return investments.find((inv) => inv.id === parseInt(id))
}

const update = (id, investmentUpdate)=>{

    const investmentIndex = investments.findIndex((inv) => inv.id === parseInt(id));

    if(investmentIndex === -1){

        return null;

    }

    investments[investmentIndex] = {

        ...investments[investmentIndex],
        ...investmentUpdate,

    };

    return investments[investmentIndex]
};

const remove = (id) => {

    const investmentsIndex = investments.findIndex((inv) => inv.id === parseInt(id));
    if (investmentsIndex === - 1){

        return false;

    }

    investments.splice(investmentsIndex, 1);
    return true;

}

module.exports = {

    findAll,
    create,
    findById,
    update,
    remove,
}