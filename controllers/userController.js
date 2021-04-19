const { response, request } = require('express');

const getUsuarios = (req = request,res = response ) => {

    const query = req.query;

    // puedo desectructurar
    // const { q, nombre = 'no name', edad } = req.query;

    res.json({
        msg: 'GET API - Controlador',
        query
    });
}

const postUsuarios = (req,res) => {

    const { nombre, edad } = req.body;

    res.json({
        msg: 'POST API - Controlador',
        nombre,
        edad
    });
}

const putUsuarios = (req,res) => {

    const id = req.params.id;

    res.json({
        msg: 'PUT API - Controlador',
        id
    });
}

const deleteUsuarios = (req,res) => {
    res.json({
        msg: 'DELETE API - Controlador'
    });
}

const patchUsuarios = (req,res) => {
    res.json({
        msg: 'PATCH API - Controlador'
    });
}


module.exports = {
    getUsuarios,
    postUsuarios,
    putUsuarios,
    deleteUsuarios,
    patchUsuarios
}