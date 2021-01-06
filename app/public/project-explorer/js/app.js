//              Signin
const signUpForm = document.getElementById("signupForm");
const signUpButton = document.getElementById("submitButton");
const programs = document.getElementsByTagName("select");
const fNameValue = document.querySelector("input[name='firstName']");
const lNameValue = document.querySelector("input[name='lastName']");
const emailValue = document.querySelector("input[name='email']");
const passwordValue = document.querySelector("input[name='password']");
const matricNoValue = document.querySelector("input[name='matricNumber']");
const programList = document.querySelector("select[name='program']");
const yearList = document.querySelector("select[name='graduationYear']");


//              Login
const loginForm = document.getElementById("loginForm");
const loginButton = document.getElementById("loginButton");

//              Project
const projectNameValue = document.querySelector("input[name='name']");
const projectAbstractValue = document.querySelector("textarea");
const projectAuthorValue = document.querySelector("input[name='authors']");
const projectTagValue = document.querySelector("input[name='tags']");
const createProjectButton = document.getElementById("createProjectButton");

//              Update Project
const updateProjectName = document.getElementById("project_name");
const updateProjectAbstract = document.getElementById("project_abstract");
const updateProjectAuthors = document.getElementById("project_authors");
const updateProjectTags = document.getElementById("project_tags");

const projectContainer = document.querySelector(".container .showcase");

//              Index Page
const navbarMenu = document.getElementById("navbarMenu");
// 
const currentPath = window.location.href;

function appendProgram(programName) {
    var program = document.createElement('option');
    program.value = programName;
    var node = document.createTextNode(programName);
    program.appendChild(node);
    programList.appendChild(program);
}



function appendGraduationYears(yearDate) {
    var year = document.createElement('option');
    year.value = yearDate;
    var node = document.createTextNode(yearDate);
    year.appendChild(node);
    yearList.appendChild(year);
}

function error(errorText, parentDiv) {
    let program = document.createElement('div');
    program.className = "alert alert-danger h4 small";
    for (let i = 0; i < errorText.length; i++) {
        let node = document.createTextNode(errorText[i]);
        program.appendChild(node);
        let newLine = document.createElement('br');
        program.appendChild(newLine);
    }
    let title = document.getElementById(parentDiv);
    title.appendChild(program);
}

function isLoggedIn() {
    let cookieExist = document.cookie.split(';').some((item) => item.trim().startsWith('uid='));
    return cookieExist;
}

function appendProject(project) {
    // 
    let createproject = document.createElement('div');
    createproject.className = "col text-left";
    // 
    var projectCard = document.createElement('div');
    projectCard.className = "card";
    createproject.appendChild(projectCard);
    // 
    var projectCardBody = document.createElement('div');
    projectCardBody.className = "card-body";
    projectCard.appendChild(projectCardBody);
    // 
    let projectTitle = document.createElement('h3');
    projectTitle.className = "text-primary card-title";
    let titleAnchorTag = document.createElement("a");
    titleAnchorTag.href = `viewProject.html?id=${project['id']}`;
    let projectTitleNode = document.createTextNode(project['name']);
    titleAnchorTag.appendChild(projectTitleNode);
    projectTitle.appendChild(titleAnchorTag);
    projectCardBody.appendChild(projectTitle);
    // 
    var projectAuthors = document.createElement('li');
    projectAuthors.className = "list-unstyled";
    var projectAuthorsNode = document.createTextNode(project['authors']);
    projectAuthors.appendChild(projectAuthorsNode);
    projectCardBody.appendChild(projectAuthors);
    // 
    var projectAbstract = document.createElement('p');
    var projectAbstractNode = document.createTextNode(project['abstract']);
    projectAbstract.appendChild(projectAbstractNode);
    projectCardBody.appendChild(projectAbstract);
    // 
    var projectTag = document.createElement('li');
    projectTag.className = "text-primary list-unstyled";
    for (let index = 0; index < project['tags'].length; index++) {
        var projectTagLink = document.createElement('a');

        projectTagLink.className = "card-link";
        projectTagLink.href = "#";
        var tag = document.createTextNode(`#${project['tags'][index]}`);
        projectTagLink.appendChild(tag);
        projectTag.appendChild(projectTagLink);


    }
    // 

    projectCardBody.appendChild(projectTag);

    projectContainer.appendChild(createproject);
}

//      Navbar: Updates navbar if user has loged in
function updateNavbar(userName) {
    navbarMenu.innerHTML = "";

    let createElement = document.createElement('ul');
    createElement.className = "navbar-nav nav ml-auto";
    // 
    let createSignedInElement = document.createElement('li');
    createSignedInElement.className = "nav-item nav-link text-white-50 small pr-0 mr-0";
    let signinTextNode = document.createTextNode("Signed in as:");
    createSignedInElement.appendChild(signinTextNode);
    // 
    let createNameElement = document.createElement('li');
    createNameElement.className = "nav-item";
    let nameAnchorTag = document.createElement("a");
    nameAnchorTag.href = "profile.html";
    nameAnchorTag.className = "nav-link text-light small";
    let nameTextNode = document.createTextNode(userName);
    nameAnchorTag.appendChild(nameTextNode);
    createNameElement.appendChild(nameAnchorTag);
    // 
    let createLogoutElement = document.createElement('li');
    createLogoutElement.className = "nav-item";
    let logoutAnchorTag = document.createElement("a");
    logoutAnchorTag.href = "login.html";
    logoutAnchorTag.className = "nav-link text-white-50 small";
    logoutAnchorTag.id = "logout";
    let logoutTextNode = document.createTextNode("Logout");
    logoutAnchorTag.appendChild(logoutTextNode);
    createLogoutElement.appendChild(logoutAnchorTag);
    // 
    createElement.appendChild(createSignedInElement);
    createElement.appendChild(createNameElement);
    createElement.appendChild(createLogoutElement);
    // 
    navbarMenu.appendChild(createElement);
}

function updateProject(projectName, projectAbstract, authorList, tagList) {
    updateProjectName.innerHTML = projectName;
    updateProjectAbstract.innerHTML = projectAbstract;

    for (let index = 0; index < authorList.length; index++) {
        let authorlist = document.createElement('li');
        authorlist.className = "list-group-item";
        let authorlistTextNode = document.createTextNode(authorList[index]);
        authorlist.appendChild(authorlistTextNode);
        updateProjectAuthors.appendChild(authorlist);
    }
    
    let tagList = "";
    for (let index = 0; index < tagList.length; index++) {
        tagList += "#" + tagList[index] + " ";
    }
    updateProjectTags.innerHTML = tagList;
}


function loadPrograms() {
    fetch('/api/programs').then(
        response => {
            response.json().then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    appendProgram(data[i]);
                }
            });
        }
    );
}

function loadYears() {
    fetch('/api/graduationYears').then(
        response => {
            response.json().then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    appendGraduationYears(data[i]);
                }
            });
        }
    );
}

function onSignUpButtonClick(err) {
    document.cookie = "";
    fetch('/api/register',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "firstname": fNameValue.value,

                "lastname": lNameValue.value,

                "email": emailValue.value,

                "password": passwordValue.value,

                "matricNumber": matricNoValue.value,

                "program": programList.value,

                "graduationYear": yearList.value,
            })
        }
    ).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            response.json().then(errorText => {
                error(errorText["errors"], "signupTitle");
                throw Error("Bad request");
            });
        }
    }).then(data => {
        let key = "uid";
        let value = data["id"];
        document.cookie = `${key}=${value};path=/;`;
        window.location.replace('index.html');
    }).catch(e => {
    });
    err.preventDefault();
}


// Index  Page

function onLoadIndexPage() {
    let cookieExist = document.cookie.split(';').some((item) => item.trim().startsWith('uid='));
    console.log(`cookie exist ${cookieExist}`);
    if (cookieExist) {
        // let uid = document.cookie.split(";")[0].substr(4);
        let uid = document.cookie.split(';').find(row => row.startsWith('uid')).split('=')[1];
        console.log(`cookie exist ${uid}`);

        fetch(`/api/users/${uid}`).then(
            response => {
                response.json().then(function (data) {
                    let userFirstName = data["firstname"];
                    updateNavbar(userFirstName);

                }).catch(e => {
                    console.log(e);
                });
            }
        );
    } else {


    }
}

function onLoginButtonClick(evnt) {
    document.cookie = "";
    fetch('/api/login',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                "email": emailValue.value,

                "password": passwordValue.value,
            },
            ),
        }
    ).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            response.json().then(errorText => {
                let errorMessage = ['Invalid email/password'];
                error(errorMessage, "loginTitle");
                throw Error("Bad request");
            });
        }
    }).then(data => {
        let key = "uid";
        let value = data["data"].id;
        document.cookie = `${key}=${value};path=/;`;
        window.location.replace('index.html');
    }).catch(e => {
        // console.log(e);
    });
    evnt.preventDefault();
}



// Create Project
function onCreateProjectButtonClick(evnt) {
    let cookieExist = document.cookie.split(';').some((item) => item.trim().startsWith('uid='));
    if (cookieExist) {
        fetch('/api/projects',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        "name": projectNameValue.value,

                        "abstract": projectAbstractValue.value,

                        "authors": projectAuthorValue.value.split(","),

                        "tags": projectTagValue.value.split(","),
                    },
                ),
            }
        ).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                response.json().then(errorText => {
                    error(errorText["errors"], "createProjectTitle");
                    throw Error("Bad request");
                });
            }
        }).then(data => {
            window.location.replace('index.html');
        }).catch(e => {
            // console.log(e);
        });
        evnt.preventDefault();
    } else {
        window.location.replace('login.html');
    }
}

function projectList() {
    fetch('/api/projects').then(
        response => {
            response.json().then(function (data) {
                // console.log(data);

                if (data.length > 4) {
                    for (var i = 0; i < 4; i++) {
                        appendProject(data[i]);
                    }
                }
                else {
                    for (var i = 0; i < data.length; i++) {
                        appendProject(data[i]);
                    }
                }
            }
            );
        }
    );
}

function projectId() {

    var searchParams = new URLSearchParams(currentPath);
    for ([key, value] of searchParams) {
        // console.log(`${key}  =  ${value}`);
        return value;
    }
}

function getProject() {
    fetch(`/api/projects/${projectId()}`).then(
        // response => {
        //     if (response.ok) {
        //         console.log( response.json());
        //     } else {
        //         response.json().then(errorText => {
        //             console.log(errorText);
        //             throw Error("Bad request");
        //         });
        //     }
        response => {
            response.json().then(function (data) {
                console.log(data);
            }
            );
        }
    );
}

function logoutUser() {
    document.cookie = ``;
    window.location.replace('index.html');
}

if (currentPath.includes("index.html")) {
    onLoadIndexPage();
    projectList();
    let logoutElement = document.getElementById("logout");
    logoutElement.addEventListener('click', logoutUser);

}
else if (currentPath.includes("login.html")) {
    loginButton.addEventListener('click', onLoginButtonClick);

}
else if (currentPath.includes("register.html")) {
    loadPrograms();
    loadYears();
    signUpButton.addEventListener('click', onSignUpButtonClick);
}
else if (currentPath.includes("viewProject.html")) {

    projectList();
    logoutUser();
}
else if (currentPath.includes("createProject.html")) {
    createProjectButton.addEventListener('click', onCreateProjectButtonClick);
    logoutUser();

}
else if (currentPath.includes("viewProject.html")) {
    getProject();
    logoutUser();
}
