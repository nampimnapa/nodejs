var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var studentRouter = require('./routes/student');
var mongoose = require('mongoose')
var Mystudent = require('./models/student')

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var dbURL='mongodb://127.0.0.1:27017/university'

mongoose.connect(dbURL)
.then((result)=>app.listen(3001))
.catch((err)=>console.log(err))

// app.get('/student/insert',(req,res)=>{
//   const student=new Mystudent({
//     studentID:'643020399-1',
//     name:'Pimnapa Sri',
//     year_of_study:'3',
//     email:'pimnapa.s@kkumail.com'
//   })
//   student.save()
//   .then((result)=>{
//     res.send(result)
//   })
//   .catch((err)=>{
//     console.log(err)
//   })
// }
// )


app.post('/insert', (req, res) => {
  const student = new Mystudent(req.body);
  student.save()
    .then((result) => {
      // return res.send(result)
      return res.redirect('/student');
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get('/student/:id',(req,res)=>{
  const id=req.params.id
  Mystudent.findByIdAndDelete(id)
  .then((result) => {
    return res.redirect('/student')
  })
  .catch((err) => {
    console.log(err);
  })
});
// app.get('/student/update',(req,res)=>{
//   const id=req.params.id
//   Mystudent.findByIdAndUpdate(id,{
//     studentID : req.body.studentID,
//     name: req.body.name,
//     year_of_study : req.body.year_of_study,
//     email : req.body.email
//   })
//   .then((result) => {
//     return res.redirect('/student')
//   })
//   .catch((err) => {
//     console.log(err);
//   })
// });

// view engine setup

app.use('/student',studentRouter);

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
