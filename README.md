# Pre-assignment

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

### Some things to keep in mind

    - Minimum use of external dependencies.
    - The main design goal of this program is clean, simple, maintainable and readable code.
    - Only look at the Depends field. Ignore other fields that work kind of similarly, such as Suggests and Recommends.
    - Sometimes there are alternates in a dependency list, separated by the pipe character |. - When rendering alternate dependencies as mentioned in previous point, render any alternative that maps to a package name that has an entry in the file as a link and just print the name of the package name for other packages.
    - The section “Syntax of control files” of the Debian Policy Manual applies to the input data.

#### The solution should run on non-Debian systems as well. 
#### Sample data file can be found in (https://gist.github.com/lauripiispanen/29735158335170c27297422a22b48caa).