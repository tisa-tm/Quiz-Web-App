const router = require('express').Router();
const handle = require('../handlers/user');

router.get('/', handle.getUsers); 
router.delete('/delete', handle.deleteAll);
router.post('/login', handle.login);
router.post('/register', handle.register);
router.get('/getcurrentuser', handle.getCurrentUser);
router.get('/logout', handle.logout);

module.exports = router;