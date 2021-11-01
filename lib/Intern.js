const employee = require('./employee');

class Intern extends employee{
    constructor(name,employeeId,email,school){
        super(name,employeeId,email)
        this.school = school
        this.role = "Intern"
    }
    getSchool(){
        return this.school
    }
}

module.exports = Intern 