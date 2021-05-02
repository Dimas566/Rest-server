const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
//const usuario = require('../models/usuario');


const getUsuarios = async(req = request,res = response ) => {

   // const query = req.query;

    // puedo desectructurar
    // const { q, nombre = 'no name', edad } = req.query;

    // get all users pagers
    const { limite = 5, desde = 0 } = req.query;
    const QUERY = { estado: true };

    /*const users = await Usuario.find(QUERY)
        .skip(Number( desde ))
        .limit(Number( limite ));*/
    
   // const total = await Usuario.countDocuments(QUERY);

    const [ total, usuarios ] = await Promise.all([
        Usuario.count(QUERY),
        Usuario.find(QUERY)
            .skip(Number( desde ))
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        usuarios
       // resp
        //total,
        //users
    });
}

const postUsuarios = async (req,res) => {

    //const { nombre, edad } = req.body;
    const { nombre, correo, password, role } = req.body;
    const usuario = new Usuario( { nombre, correo, password, role } );

    // Encriptar la contraseña 
    const salt = bcryptjs.genSaltSync(10); //numero de vueltas para la contra
    usuario.password = bcryptjs.hashSync( password, salt ); // Encriptar en una sola via

    // Guardar en BD
    await usuario.save();

    res.json({
        msg: 'POST API - Controlador',
        usuario
    });
}

const putUsuarios = async(req,res) => {

    const { id } = req.params;
    const { _id, password, correo, google, ...resto } = req.body;

    // TODO validar contra base de datos
    if ( password ) {
        // Encriptar la contraseña 
        const salt = bcryptjs.genSaltSync(10); //numero de vueltas para la contra
        resto.password = bcryptjs.hashSync( password, salt ); // Encriptar en una sola via
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario);
}

const deleteUsuarios = async(req,res) => {

    const { id } = req.params;

    // borrado fisicamente
   // const usuario = await Usuario.findByIdAndDelete( id );

   // desactivar usuario
   const usuario = await Usuario.findByIdAndUpdate( id, { estado: false });


    res.json({
        usuario
    });
}

const patchUsuarios = async(req,res) => {

    res.json({
        msg: 'PATCH - USUARIOS'
    });
}


module.exports = {
    getUsuarios,
    postUsuarios,
    putUsuarios,
    deleteUsuarios,
    patchUsuarios
}