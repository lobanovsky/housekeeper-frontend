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

			await fs.appendFile(outFile, `
export const PaymentService = new PaymentControllerService();
export const PaymentReportService = new PaymentReportControllerService();
export const FileService = new FileControllerService();
export const DecisionService = new DecisionControllerService();
export const DecisionReportService = new DecisionReportControllerService();
export const RoomService = new RoomControllerService();
export const RoomReportService = new RoomReportControllerService();
	`, (err) => {
				if (err) {
					console.error('Append error');
				} else {
					console.log('Append success');
				}
			});
	} catch (e) {
		console.log('%cCodegen error!!!', 'color: red');
		console.log(e);
	}

};
