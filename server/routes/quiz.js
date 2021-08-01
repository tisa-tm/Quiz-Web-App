const router = require('express').Router();
const handle = require('../handlers/quiz');
const auth = require('../middleware/auth');

router.get('/', auth, handle.displayAllQuizes);
router.post('/createquiz', auth, handle.createQuiz);
router.get('/getquiz/:quizid',auth, handle.getQuiz);
router.post('/submitquiz',auth, handle.setScore);
router.get('/getuserquizes/:userid',auth, handle.getAllQuizesTakenByUser);
router.get('/getusercreatedquizes/:userid',auth, handle.getAllQuizesCreatedByUser);
router.delete('/deleteallquizes',auth, handle.deleteAllQuizes);
router.get('/send',handle.send);
router.get('/read', handle.read);

module.exports = router;



