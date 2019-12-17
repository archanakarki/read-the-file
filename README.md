# Read the file

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
#### Sample data file can be found in (https://gist.github.com/lauripiispanen/29735158335170c27297422a22b48caa).

### Implementation of the solution

    Tech stack used are Express, Node.js and ejs template engine for views. Mostly used nodejs file system(fs) module to read or access files.

    For only displaying sample file:
    - File is read line by line with readline module and few Regular expressions(RegEx).

    For displaying individal packages:
    - fs module is used to readFile, 
    - regular expressions(RegEx) to split the data received,
    - built in JavaScript Object methods to extract and create object for all packages and
    - array methods like forEach to turn dependencies string to links

### Folder structure

    Public - Includes css and js files for entire website
    Views  - Includes all the html templates in ejs form
    app.js - Contains all the app configuration and applications logic
    package.json - App's information and dependencies
    README.md - Information about the problem and implementation of solution
    status.real - Sample status file used throughout the app, in case the client OS is linux or other than linux, and if the access to local status file is denied.

### Images of
    Homepage
<img width="791" alt="Homepage" src="https://user-images.githubusercontent.com/39858235/70989119-bb3cdf00-20cb-11ea-8c43-5b91f045ff10.png">

    Sample file page
<img width="772" alt="Sample file" src="https://user-images.githubusercontent.com/39858235/70989121-bbd57580-20cb-11ea-9a46-4470bcd4076e.png">

    All packages name list page
<img width="690" alt="All packages name list" src="https://user-images.githubusercontent.com/39858235/70989123-bbd57580-20cb-11ea-9627-2c411061f46d.png">

    Individual package details page
<img width="1231" alt="Individual package details" src="https://user-images.githubusercontent.com/39858235/70989125-bc6e0c00-20cb-11ea-9f83-5b6daba723fb.png">


