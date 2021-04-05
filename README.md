# The Ballerina Compiler Toolkit

> To generate the syntax trees for any Ballerina source code

This project aims to render the syntax tree for any .bal piece of code.
Through this, developers can get an simplified representation of their code blocks for easier analysis.

## VSCode Extension

### Building the Extension
> Building with Tests
* If you want to build the VSIX of the extension with the tests, you need to:
    - Copy a released Ballerina distribution to a new "extractedDistribution" folder in the project root
    - Note that the copied distribution has to be of a version later than SwanLake Alpha3
    - Run a ```./gradlew build``` from the project root

> Building without Tests
* If you want to build the VSIX of the extension without the tests, you can run a ```./gradlew build -x test``` from the project root

### The capabilities of the VSCode extension come in 3 main forms.
* Generate the full syntax tree of a Ballerina source file    
* Generate the subtree of the syntax tree for a particular block of code
* Locate a particular piece of code on the full syntax tree

### These tree representations can be viewed in two forms.
* The Graphical Representation
    - ![Full Syntax Tree Screenshot](docs/GraphicalTree.png)
* The Dropdown Representation
    - ![Dropdown Syntax Tree Screenshot](docs/DropdownTree.png)

### Basic Usage

The command for the full syntax tree retrieval can be found on the Command Palette.
- ![Command Palette](docs/CommandPalette.gif)

The sub syntax tree retrieval and locate code options can be found as Code Actions.
- ![Code Actions](docs/CodeActions.gif)

### Features
> The syntax trees rendered through the visualizer have muliple features.
* Full collapsibility
    - ![Collapsibility](docs/Collapsible.gif)
* View node details
    - ![Node Details](docs/NodeDetails.gif)
* Track syntax diagnostics
    - ![Syntax Diagnostics](docs/Diagnostics.gif)
* Locate the tree node on the text editor
    - ![Locate Code](docs/LocateCode.gif)
* Switch to full tree mode from sub syntax trees and locate trees
    - ![Switch to Full Tree](docs/SwitchFullTree.gif)    

*All of these features are available in the Dropdown Representation as well.*
