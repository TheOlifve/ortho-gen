import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

const validExtensions: Set<string> = new Set(['cpp', 'hpp', 'h']);

function getHeaderFromCurrentDirectory(filePath: string, className: string): string {
	const directoryPath = path.dirname(filePath);
	let matchingFile: string = `.hpp`;
	const extensions = ['.h', '.hpp'];
	const files = fs.readdirSync(directoryPath);

	for (const ext of extensions) {
		const fileName = `${className}${ext}`;
		if (files.includes(fileName)) {
				matchingFile = ext;
		}
	}
	return matchingFile;
}

function getFile(filePath: string): string {
	const pathParts = filePath.split('/');
	const lastElement = pathParts[pathParts.length - 1];

	return lastElement;
}

function getFileExtension(file: string): string {
	const lastDotIndex = file.lastIndexOf('.');

	if (lastDotIndex == -1)
		throw new Error(`Wrong file type`);
	const fileExtension = file.slice(lastDotIndex + 1, lastDotIndex + 100);
	if (!validExtensions.has(fileExtension))
		throw new Error(`Wrong file type`);
	return fileExtension;
}

function getClassName(file: string): string {
	const lastDotIndex = file.lastIndexOf('.');

	if (lastDotIndex == -1)
		throw new Error(`Wrong file type`);
	let className = file.slice(0, lastDotIndex);
	className = className.charAt(0).toUpperCase() + className.slice(1);
	return className;
}

function getFileId(file: string): string {
	const id = file.replace(/\.(?=[^.]*$)/, '_').toUpperCase();

	return id;
}

function toHeader(file: string): string {
	const fileName = getClassName(file);
	const headerFile = fileName + `.hpp`;

	return headerFile;
}

function generateHeaderFile(className: string, fileId: string): string[] {
	const lines = [];

	lines[0] = `#ifndef ${fileId}`;
	lines[1] = `# define ${fileId}`;
	lines[3] = `# include <iostream>`;
	lines[5] = `class ${className} {`;
	lines[6] = `	public:`;
	lines[7] =`		${className}();`;
	lines[8] =`		${className}(const ${className} &other);`;
	lines[9] =`		~${className}();`;
	lines[10] =`		${className}&	operator=(const ${className} &other);`;
	lines[11] =`	private:`;
	lines[13] =`};`;
	lines[15] =`# endif`;
	return lines;
}

function generateCppFile(className: string, file: string, headerExtension: string): string[] {
	const lines = [];

	lines[0] = `#include "${className}${headerExtension}"`;
	lines[2] = `${className}::${className}() {`;
	lines[3] = `	std::cout << "[ ${className} default constructor called ]" << std::endl;`
	lines[4] = `}`;
	lines[6] = `${className}::${className}(const ${className} &other) {`;
	lines[7] = `	std::cout << "[ ${className} copy constructor called ]" << std::endl;`;
	lines[8] = `	if (this != &other) {`;
	lines[9] = `		;`;
	lines[10] = `	}`;
	lines[11] = `}`;
	lines[13] = `${className}::~${className}() {`;
	lines[14] = `	std::cout << "[ ${className} destructor called ]" << std::endl;`;
	lines[15] = `}`;
	lines[17] = `${className} &${className}::operator=(const ${className} &other) {`;
	lines[18] = `	std::cout << "[ ${className} copy assignment operator called ]" << std::endl;`;
	lines[19] = `	if (this != &other) {`;
	lines[20] = `		;`;
	lines[21] = '	}';
	lines[22] = `	return *this;`;
	lines[23] = `}`;
	return lines;
}

export function activate(context: vscode.ExtensionContext)
{
	let orthodoxCanonicalFormClassGeneratorCommand = vscode.commands.registerCommand('extension.orthodoxCanonicalFormClassGenerator', async () =>
	{
		const editor = vscode.window.activeTextEditor;
		
		if (editor)
		{
			let		result: string;
			let		fileExtension: string;
			let		className: string;
			let		headerExtension: string;
			let		fileOldData: string;
			let		classData: string[];
			let		updatedData: string;
			const	document = editor.document;
			const	filePath = document.uri.fsPath;
			const	file = getFile(filePath);
			const	fileId = getFileId(file);
			
			try {
				fileExtension = getFileExtension(file);
				className = getClassName(file);
			} catch (error) {
				vscode.window.showErrorMessage(`[ Wrong file type - ${file} ]`);
				return ;
			}
			headerExtension = getHeaderFromCurrentDirectory(filePath, className);
			try{
				fileOldData = fs.readFileSync(filePath, 'utf8');
			} catch (error) {
				vscode.window.showErrorMessage(`[ Faild to read ${file} ]`);;
				return ;
			}
			if (fileExtension == `hpp` || fileExtension == `h`)
				classData = generateHeaderFile(className, fileId);
			else
				classData = generateCppFile(className, file, headerExtension);
			updatedData = fileOldData + classData.join('\n');
			fs.writeFileSync(filePath, updatedData, 'utf8');
			await document.save();

			if (className == `hpp` || className == `h`)
				vscode.window.showInformationMessage(`[ Orthodox Canonical Form Class successfully added to ${file} ]`);
			else
				vscode.window.showInformationMessage(`[ Orthodox Canonical Form Class implementation successfully added to ${file} ]`);
		}
		else
		{
			vscode.window.showErrorMessage('No active editor found.');
		}
		});
		context.subscriptions.push(orthodoxCanonicalFormClassGeneratorCommand);
		
	}
	
	export function deactivate() {}
