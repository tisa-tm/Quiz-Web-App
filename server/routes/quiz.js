const router = require('express').Router();
const handle = require('../handlers/quiz');

router.get('/', handle.displayAllQuizes);
router.post('/createquiz', handle.createQuiz);
router.get('/getquiz/:quizid',handle.getQuiz);
router.post('/submitquiz',handle.setScore);
router.get('/getuserquizes/:userid',handle.getAllQuizesTakenByUser);
router.get('/getusercreatedquizes/:userid',handle.getAllQuizesCreatedByUser);
router.delete('/deleteallquizes',handle.deleteAllQuizes);

module.exports = router;



