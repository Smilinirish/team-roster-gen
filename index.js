const inquirer = require('inquirer');
const fs = require('fs');
const intern = require('./lib/Intern');
const manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const team = []
const htmlclose =[`</body>
</html>`]
const htmlstring = [`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>My Team</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <script src="https://kit.fontawesome.com/56cab0a4d8.js" crossorigin="anonymous"></script>
</head>
<body>
<header class='py-3 mb-4 border-bottom text-center text-white bg-danger'>
<h1>My Team</h1>
</header>
    <div class="row row-cols-1 row-cols-md-3 g-4">
    `]
const createManager = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Manager name?\n',
            name: 'name'
        },
        {
            type: 'input',
            message: 'employee ID number\n',
            name: 'employeeId',
        },
        {
            type: 'input',
            message: 'email address for manager\n',
            name: 'email'
        },
        {
            type: 'input',
            message: 'office number for manager?\n',
            name: 'officeNumber'
        }
    ])
        .then(function (data) {
            let { name, employeeId, email, officeNumber } = data;
            let teamMember = new manager(name, employeeId, email, officeNumber);
            team.push(teamMember);
            console.log(team);
            addTeamMember();
        })
};
const addEngineer = () =>{
    inquirer.prompt([
        {
            type:'input',
            message:'Name\n',
            name:'name'
        },
        {
            type: 'input',
            message: 'employee ID number\n',
            name: 'employeeId'
        },
        {
            type:'input',
            message:'email\n',
            name:'email'
        },
        {
            type:'input',
            message:'GitHub profil',
            name:'gitHub'
        }
    ])
    .then(function(data){
        let {name,employeeId,email,gitHub} = data;
        let teamMember = new Engineer(name,employeeId,email,gitHub);
        team.push(teamMember);
        console.log(team);

        addTeamMember();
    })
}
const addIntern = ()=>{
    inquirer.prompt([
        {
            type:'input',
            message:'Name\n',
            name:'name'
        },
        {
            type: 'input',
            message: 'employee ID number\n',
            name: 'employeeId'
        },
        {
            type:'input',
            message:'email\n',
            name:'email'
        },
        {
            type:'input',
            message:'School\n',
            name:'school'
        }
    ])
    .then(function(data){
        let {name,employeeId,email,school} = data;
        let teamMember = new intern(name,employeeId,email,school);
        team.push(teamMember);
        console.log(team);

        addTeamMember();
    })
}
const addTeamMember = () => {
    inquirer.prompt([
        {
            type:'list',
            message:'Add Team Memeber?\n',
            choices:['Add Engineer','Add Intern','No'],
            name:'addMember'
        }
    ])
    .then(function(data){
        switch(data.addMember){
            case 'Add Engineer':
                addEngineer();
                break;
            case 'Add Intern':
                addIntern();
                break;
            case 'No':
                finsihTeam();
                break;
        }
    })
}
const cardGen = ()=>{
    team.forEach(teamMember => {
        let card =`<div class="col">
        <div class="card rounded shadow-sm m-2">
        <div class="card-header text-white bg-primary">`
            
            if(teamMember.officeNumber){
                card +=`<h2>${teamMember.name}</h2>
                <h2><i class="fas fa-mug-hot"></i> ${teamMember.role}</h2>
            </div>
            <div class="card-body">
                <ul class="list-group">
                <li class="list-group-item">Employee ID: ${teamMember.employeeId}</li>
                <li class="list-group-item">Email: <a href="Email:${teamMember.email}">${teamMember.email}</a></li>
                <li class="list-group-item">Office Number:${teamMember.officeNumber}</li>
                </ul>
                </div>
                </div>
                </div>
                `
            }
            if(teamMember.gitHub){ 
                card +=`<h2>${teamMember.name}</h2>
                <h2><i class="fas fa-glasses"></i> ${teamMember.role}</h2>
            </div>
            <div class="card-body">
                <ul class="list-group">
                <li class="list-group-item">Employee ID: ${teamMember.employeeId}</li>
                <li class="list-group-item">Email: <a href="Email:${teamMember.email}">${teamMember.email}</a></li>
                <li class="list-group-item">GitHub:<a href="https://github.com/${teamMember.gitHub}">${teamMember.gitHub}</a></li>
                </ul>
                </div>
                </div>
                </div>
                `
            }
            if(teamMember.school){
                card +=`<h2>${teamMember.name}</h2>
                <h2><i class="fas fa-user-graduate"></i> ${teamMember.role}</h2>
            </div>
            <div class="card-body">
                <ul class="list-group">
                <li class="list-group-item">Employee ID: ${teamMember.employeeId}</li>
                <li class="list-group-item">Email: <a href="Email:${teamMember.email}">${teamMember.email}</a></li>
                <li class="list-group-item">School:${teamMember.school}</li>
                </ul>
                </div>
                </div>
                </div>
                `
        
            }
            htmlstring.push(card);

    });
    htmlstring.push(htmlclose);
    htmlGen();
}

const htmlGen = ()=>{
    fs.writeFile(`./dist/${team[0]}.html`, htmlstring.join(""), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
        });
}


function finsihTeam() {
    cardGen(team);
}
createManager();