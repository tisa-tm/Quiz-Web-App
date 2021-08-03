const router = require('express').Router();
const handle = require('../handlers/quiz');
const auth = require('../middleware/auth');

router.get('/', auth, handle.displayAllQuizes);
router.post('/createquiz', auth, handle.createQuiz);
router.get('/getquiz/:quizid',auth, handle.getQuiz);
router.post('/submitquiz',auth, handle.setScore);
router.get('/getquizestaken/:userid',handle.getAllQuizesTakenByUser);
router.get('/getscore/:userid/:quizid',handle.getScore);
router.get('/getquizescreated/:userid',auth,handle.getAllQuizesCreatedByUser);
router.delete('/deleteallquizes',handle.deleteAllQuizes);
router.get('/send',handle.send);
router.get('/read', handle.read);
router.delete('/deletescores',handle.deleteAllScores);
router.get('/showallscores',handle.showAllScores);

module.exports = router;



