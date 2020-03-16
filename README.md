# Read the file - assignment
This project is a React+Express application that reads a sample status file of Debian or Ubuntu System, finds individual packages out of the files, displays it details and links to it dependencies. Previously used ejs templating engine for frontend and now refactoring code to make SPA.

Live Demo of previous version made with Express and EJS : https://readthefile.herokuapp.com/

Live Demo of current version with React and Express : Not updated in heroku but shown in images.

Updated!!!

<img width="90%" alt="Screenshot 2020-03-16 at 14 44 21" src="https://user-images.githubusercontent.com/39858235/76759714-ebf8e700-6794-11ea-950d-c594657e358c.png">


<img width="90%" alt="read-the-file-updated-with-buttons" src="https://user-images.githubusercontent.com/39858235/75652313-6be66380-5c63-11ea-8fae-45a44b02a3a1.png">

### Task is to:

    1) Locate a file called /var/lib/dpkg/status on Debian and Ubuntu systems. (It holds information about software packages related to the system)
    2) Write program and create an HTML interface/web application
    3 The program should expose some key information about packages as follows:
    - Index page: Lists installed packages alphabetically + package names should be links
    - Package name links : Should open following informations about a single package:
            - Name
            - Description
            - The names of the packages the current package depends on (skip version numbers)
            - The names of the packages that depend on the current package
        The dependencies and reverse dependencies should be clickable and the user can navigate the package structure by clicking from package to package.

### Some things to keep in mind were

    - Minimum use of external dependencies.
    - The main design goal of this program is clean, simple, maintainable and readable code.
    - Only look at the Depends field. Ignore other fields that work kind of similarly, such as Suggests and Recommends.
    - Sometimes there are alternates in a dependency list, separated by the pipe character |. - When rendering alternate dependencies as mentioned in previous point, render any alternative that maps to a package name that has an entry in the file as a link and just print the name of the package name for other packages.
    - The section “Syntax of control files” of the Debian Policy Manual applies to the input data.

#### The solution should run on non-Debian systems as well. 
#### Sample data 'status.real' file is used from (https://gist.github.com/lauripiispanen/29735158335170c27297422a22b48caa).

### Implementation of the solution

    Tech stack used are Express, Node.js, Axios with React. Used Nodejs file system(fs) module to read or access files.

    For displaying individal packages:
    - fs module is used to readFile,
    - regular expressions(RegEx) to split the data received,
    - built in JavaScript Object methods to extract and create object for all packages and
    - array methods like forEach to turn dependencies string to links

### Folder structure

    backend - Includes server files with Express
    frontend  - Includes all related to frontend with React/Axios
    README.md - This file

# Using this folder in local machine

- Download zip from 'Clone or Download' button of repository file
- Open terminal, cd folderPath, and paste

`git clone https://github.com/archanakarki/read-the-file.git`

- In terminal : 
```
cd read-the-file
- Open two seperate terminal window(or in VSCode use split terminal window option)
- In one terminal window
```
cd backend
npm install
npm start
```
- In second terminal window
```
cd frontend
npm install
npm start
```
- Frontend views runs in http://localhost:3000 and server side data runs in http://localhost:3001
