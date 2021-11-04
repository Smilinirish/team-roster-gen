const inquirer = require('inquirer');
const fs = require('fs');
const intern = require('./lib/Intern');
const manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const team = []
const htmlstring = [`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${team[0]}</title>
    <link href="https://fonts.googleapis.com/css?family=Bebas+Neue&display=swap" rel="stylesheet">
</head>
<body>
    <div class="banner-bar">
        <h1>${team[0]}</h1>
    </div>
    <div class="card-container">
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
        let card =`<div class="member-card">
        <div class="card-top">
            <h2>${team.name}</h2>
            <h2>${team.title}</h2>
        </div>
        <div class="card-bottom">
            <p>Employee ID: ${team.id}</p>
            <p>Email: <a href="Email:${team.email}">${team.email}</a>></p>`
            if(team.office){
                card +=`
                <p>${team.managerNumber}</p>
                `
            }
            if(team.gitHub){
                card +=`
                <p>${team.gitHub}</p>
                `
            }
            if(team.school){
                card +=`
                <p>${team.school}</p>
                `
            }
            htmlstring.push(card)

    });
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