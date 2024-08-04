# Orthodox Canonical Form Class Generator

## Overview

The **Orthodox Canonical Form Class Generator** (Ortho Gen) is a Visual Studio Code extension designed to automatically generate Orthodox canonical forms for C++ classes. This tool helps streamline the process of creating header files that include necessary include guards and definitions, following a standardized format.

## Features

- **Generate Header Guards**: Automatically adds `#ifndef`, `#define`, and `#endif` guards to prevent multiple inclusions.
- **Define Canonical Class**: Generates class definitions in a canonical form, including constructors, destructors, and assignment operators.
- **Customizable Class Names**: Easily specify the class name to generate corresponding header guards and definitions.
- **Supports Multiple Extensions**: Checks for both `.h` and `.hpp` file extensions.

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window.
3. Search for `Ortho Gen` or `Orthodox Canonical Form Class Generator`.
4. Click `Install` to add the extension to your VS Code environment.

## Usage

### Command Palette

1. Open the Command Palette by pressing `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux).
2. Type `Ortho Gen` and select it from the dropdown.

### Keybinding

You can also use the default keybinding `Cmd+Ctrl+O` (Mac) or `Ctrl+Alt+O` (Windows/Linux) to quickly generate the canonical form.

### Custom Command

You can run the command directly from the Command Palette:



## Configuration

The extension does not require any configuration out of the box. Simply run the command to generate the canonical class form for the currently active file.

## Development

If you want to contribute to the development of this extension, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/TheOlifve/ortho-gen.git
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Compile the TypeScript code:
    ```bash
    npm run compile
    ```

4. Run the extension in a development instance of VS Code:
    ```bash
    code --extensionDevelopmentPath=path/to/your/extension
    ```

5. To test the extension, use:
    ```bash
    npm run test
    ```

## License

This extension is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support

For issues and feature requests, please open an issue on the [GitHub repository](https://github.com/TheOlifve/ortho-gen/issues).
