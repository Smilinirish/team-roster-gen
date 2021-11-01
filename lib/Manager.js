const employee = require('./employee');

class Manager extends employee{
    constructor(name,employeeId,email,officeNumber){
        super(name,employeeId,email)
        this.officeNumber = officeNumber
        this.role = "Manager"
    }
    getOfficeNumber(){
        return this.officeNumber
    }
}

module.exports = Manager