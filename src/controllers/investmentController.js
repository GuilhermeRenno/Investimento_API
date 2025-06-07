const investmentService = require('../services/investmentServices.js');

const listAll = (req, res) => {

    const investments = investmentService.getAllInvestments();
    res.json(investments);
};

const create = (req , res) =>{

    const newInvestmentData = req.body;
    const result  = investmentService.createNewInvestment(newInvestmentData);

    if(!result.sucess){

        return res.status(400).json({message: result.message

        });

    }

    res.status(201).json(result.data);

};

const update = (req, res) =>{

    const {id} = req.params;
    const dataUpdate = req.body;
    const result = investmentService.updateInvestment(id, dataUpdate);

    if(!result.sucess){

        return res.status(404).json({message: result.message});

    }
    res.json(result.data);

}

const remove = (req, res) => {

    const {id} = req.params;
    const result = investmentService.deleteInvestment(id);
    if(!result.sucess){

        return res.status(404).jason({message: result.message});

    }
    res.status(204).send();

}

module.exports = {

listAll,
create,
update,
remove,

}