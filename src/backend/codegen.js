// @ts-ignore
const { codegen } = require('swagger-axios-codegen');
const path = require('path');
const fs = require('fs');

const replace = require('replace-in-file');

module.exports = async (options) => {
	const outFile = path.resolve(options.outputDir, 'index.ts');

	try {
		await codegen({
			strictNullChecks: false,
			modelMode: 'interface',
			...options
		});
		if (options.isHello) {
			await replace({
				files: outFile,
				from: /Enum.*DocumentType/g,
				to: 'DocTypeEnum'
			});
			//


			await replace({
				files: outFile,
				from: /passport_main\?: Passport;/g,
				to: 'passport_main: Passport;'
			});

			await replace({
				files: outFile,
				from: /inn\?: Inn;/g,
				to: 'inn: Inn;'
			});

			await replace({
				files: outFile,
				from: /snils\?: Snils;/g,
				to: 'snils: Snils;'
			});

			await replace({
				files: outFile,
				from: /journal\?: Journal;/g,
				to: 'journal: Journal;'
			});


			await replace({
				files: outFile,
				from: /id\?: number;/g,
				to: 'id: number;'
			});

			await replace({
				files: outFile,
				from: /loadFileTimestamp\?: Date;/g,
				to: 'loadFileTimestamp?: string;'
			});

			await replace({
				files: outFile,
				from: /export interface (?:Inn|Snils|STDPFR|STDR|Passport|Journal|Army|Diploma|AccountInfo|Marriage|Registration|Revenue|StudyCertificate|Anketa|Certificate) {}/g,
				to: ''
			});


			await fs.appendFile(outFile, `
export enum DocTypeEnum {
  'PASSPORT_MAIN' = 'PASSPORT_MAIN',
  'PASSPORT_ADDRESS' = 'PASSPORT_ADDRESS',
  'PASSPORT_18' = 'PASSPORT_18',
  'PASSPORT_CHILDREN' = 'PASSPORT_CHILDREN',
  'PASSPORT_ARMY' = 'PASSPORT_ARMY',
  'PASSPORT_MARRIAGE' = 'PASSPORT_MARRIAGE',
  'JOURNAL' = 'JOURNAL',
  'ARMY' = 'ARMY',
  'DIPLOMA' = 'DIPLOMA',
  'STDR' = 'STDR',
  'STDPFR' = 'STDPFR',
  'INN' = 'INN',
  'SNILS' = 'SNILS',
  'ACCOUNT_INFO' = 'ACCOUNT_INFO',
  'FORM' = 'FORM',
  'MARRIAGE' = 'MARRIAGE',
  'REGISTRATION' = 'REGISTRATION',
  'REVENUE' = 'REVENUE',
  'CERTIFICATE' = 'CERTIFICATE',
  'STUDY_CERTIFICATE' = 'STUDY_CERTIFICATE'
}
			
export interface SimpleDocument {
	documentId?: number;
	loadFileTimestamp?: string;
	requestId?: number;
	status: EnumDocumentStatus;
	documentType?: DocTypeEnum;
	comment?: string;
}

export interface AccountInfo {
	documentId?: number;
	requestId?: number;
	loadFileTimestamp?: string;
	status: EnumDocumentStatus;
	documentType?: DocTypeEnum;
	receiver?: string;
	account?: string;
	bic?: string;
	bankName?: string;
	corrAccount?: string;
	inn?: string;
	kpp?: string;
	divisionAddress?: string;
	divisionCity?: string;
}


export interface Passport {
	documentId?: number;
	loadFileTimestamp?: string;
	requestId?: number;
	status: EnumDocumentStatus;
	documentType?: DocTypeEnum;
	lastName?: string;
	firstName?: string;
	patronymicName?: string;
	series?: string;
	number?: string;
	birthDate?: Date;
	issueDate?: Date;
	gender?: string;
	birthPlace?: string;
	unitCode?: string;
	issuedBy?: string;
	comment?: string;
	address?: string;
	registrationDate?: Date;
}

export interface Snils extends SimpleDocument{
	number?: string;
}

export interface Inn extends SimpleDocument{
	number?: string;
}

export interface Passport18 extends SimpleDocument{}

export interface Passport19 extends SimpleDocument{}

export interface PassportAddress extends SimpleDocument{}

export interface PassportArmy extends SimpleDocument{}

export interface PassportMarriage extends SimpleDocument{}

export interface PassportChildren extends SimpleDocument{}

export interface Journal extends SimpleDocument{}

export interface STDR extends SimpleDocument{}

export interface STDRPFR extends SimpleDocument{}

export interface Marriage extends SimpleDocument{}

export interface Registration extends SimpleDocument{}

export interface Revenue extends SimpleDocument{}

export interface Certificate extends SimpleDocument{}

export interface Form extends SimpleDocument{}

export interface StudyCertificate extends SimpleDocument{}

	`, (err) => {
				if (err) {
					console.error('Append error');
				} else {
					console.log('Append success');
				}
			});

			await replace({
				files: outFile,
				from: /status\?: Enum(?!Request).*Status/g,
				to: 'status: EnumDocumentStatus'
			});

			await replace({
				files: outFile,
				from: /documentId\?: number;/g,
				to: 'documentId: number;'
			});

			await replace({
				files: outFile,
				from: /requesttId\?: number;/g,
				to: 'requestId: number;'
			});

			await replace({
				files: outFile,
				from: /documentType\?: DocTypeEnum/g,
				to: 'documentType: DocTypeEnum'
			});




			await replace({
				files: outFile,
				from: /requestId\?: number;/g,
				to: 'requestId: number;'
			});


			await fs.appendFile(outFile, `
export const RequestService = new RequestsService();
export const DocumentService = new DocumentsService();
export const FileService = new FilesService();
export const InteractionService = new InteractionControllerService();
	`, (err) => {
				if (err) {
					console.error('Append error');
				} else {
					console.log('Append success');
				}
			});
		}
	} catch (e) {
		console.log('%cCodegen error!!!', 'color: red');
		console.log(e);
	}

};
