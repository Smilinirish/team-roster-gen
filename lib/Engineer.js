const employee = require('./employee');

class Engineer extends employee{
    constructor(name,employeeId,email,gitHub){
        super(name,employeeId,email)
        this.gitHub = gitHub
        this.role = "Engineer"
    }
    getgitHub(){
        return this.gitHub
    }
}

module.exports = Engineer