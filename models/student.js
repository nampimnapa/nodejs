const mongoose=require('mongoose')
const Schema=mongoose.Schema
const studentSchema = new Schema(
    {
        studentID:{
            type:String,
            require:true
        },
        name:{
            type:String,
            require:true
        },
        year_of_study:{
            type:String,
            require:true
        },
        email:{
            type:String,
            require:true
        }
    },{timestamps:true}
)
const student=mongoose.model('student',studentSchema)
module.exports=student