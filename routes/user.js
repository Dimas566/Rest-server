const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios, patchUsuarios } = require('../controllers/userController');

const { esRoleValido, existeEmail, existeUsuarioByID } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.get('/', getUsuarios);

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe ser más de 6 letras').isLength( { min: 6 } ),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( existeEmail ),
    //check('role', 'No es un role válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( esRoleValido ),
    validarCampos
], postUsuarios);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioByID ),
    validarCampos
],putUsuarios);

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioByID ),
    validarCampos
],deleteUsuarios);

router.patch('/', patchUsuarios);

module.exports = router;