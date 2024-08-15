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

        await replace({
            files: outFile,
            from: /\?: Date;/g,
            to: ': string;'
        });
        await fs.appendFile(outFile, `
			
export interface TopResponse {
	count: number,
	id: number,
	flatNumber?: string,
	phoneNumber?: string,
	userName: string
};

export interface TopFilter {
	gateId?: number;
	startDate?: string;
	endDate?: string;
}


export const PaymentService = new PaymentControllerService();
export const PaymentReportService = new PaymentReportControllerService();
export const FileService = new FileControllerService();
export const DecisionService = new DecisionControllerService();
export const DecisionReportService = new DecisionReportControllerService();
export const RoomService = new RoomControllerService();
export const RoomReportService = new RoomReportControllerService();
export const GateService = new LogEntryControllerService();
export const AccountService = new AccountControllerService();
export const CounterpartyService = new CounterpartyControllerService();
export const BuildingService = new BuildingControllerService();
export const AccessService = new AccessControllerService();
export const AreaService = new AreaControllerService();
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
