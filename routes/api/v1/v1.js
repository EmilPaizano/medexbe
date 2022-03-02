const express = require('express');
const router =  express.Router();
const {verifyApiHeaderToken} =require('./headerVerifyMiddleware');
const pacientesRoutes = require('./pacientes/pacientes');
const expedientesRoutes =require('./expedientes/expedientes');
const seguridadRoutes = require('./seguridad/seguridad')

const {passport,jwtMiddleware} = require("./seguridad/jwtHelper")

router.use(passport.initialize());
//public
router.use('/seguridad',verifyApiHeaderToken,seguridadRoutes)

//middlewares
router.use('/pacientes',verifyApiHeaderToken,jwtMiddleware,pacientesRoutes);
router.use('/expedientes',verifyApiHeaderToken,jwtMiddleware,expedientesRoutes);



module.exports = router;