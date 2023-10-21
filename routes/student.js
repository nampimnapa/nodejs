var express = require('express');
var router = express.Router();
var Mystudent = require('../models/student')

router.get('/', function(req, res, next) {
  Mystudent.find()
    .then((result) => {
      res.render('student',{data:result})
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get('/portfolio', function(req, res, next) {
  const port=[{name:'Pimnapa Sriboonreuang',contact:{email:'pimnapa.s@kkumail.com',
  linkedin:'https://linkedin.com/in/pimnapa'}
}]
  res.render('portfolio',{port});
});
router.get('/resume', function(req, res, next) {
  res.render('resume');
});

router.get('/edit/:id', async (req, res) => {
  const sid = req.params.id
  Mystudent.findById(sid)
      .then((result) => {
          res.render('editForm',{data:result});
      });
})

router.post('/update/:id', (req, res) => {
  const sid = req.params.id
  Mystudent.findByIdAndUpdate(sid, {
      studentID: req.body.studentID,
      name: req.body.name,
      year_of_study: req.body.year_of_study,
      email: req.body.email,
  }).then((result) => {
      res.redirect('/student');
  });
})

module.exports = router;