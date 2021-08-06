const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const activity = require('./activity')
const countries = require ('./country')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use('/', countries);
router.use('/', activity);

module.exports = router;
