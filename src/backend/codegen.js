// @ts-ignore
const { codegen } = require('swagger-axios-codegen');
const path = require("path");
const fs = require("fs");

const replace = require("replace-in-file");

module.exports = async (options) => {
  const outFile = path.resolve(options.outputDir, "index.ts");

  try {
    await codegen({
      strictNullChecks: false,
      modelMode: "interface",
      ...options
    });

    await replace({
      files: outFile,
      from: /\?: Date;/g,
      to: ': string;'
    });
    //
    await replace({
      files: outFile,
      from: /id\?: number;/g,
      to: "id: number;"
    });

    await replace({
      files: outFile,
      from: /createDate: string;/g,
      to: "createDate?: string;"
    });

    await replace({
      files: outFile,
      from: /name\?: string;/g,
      to: "name: string;"
    });

    await replace({
      files: outFile,
      from: /export class AuthService/g,
      to: "export class AuthentificationService"
    });

    await replace({
      files: outFile,
      from: /export class UserService/g,
      to: "export class UserControllerService"
    });

    await replace({
      files: outFile,
      from: /export class WorkspacesService/g,
      to: "export class WorkspacesControllerService"
    });

    await replace({
      files: outFile,
      from: /export interface RoomVO/g,
      to: "export interface RoomVO_Old"
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

export interface RoomVO {
  id: number;
  street?: string;
  building: number;
  cadastreNumber?: string;
  account?: string;
  ownerName?: string;
  number: string;
  certificate?: string;
  square?: number;
  percentage?: number;
  type: EnumRoomVOType;
  typeDescription: string;
  ownerIds?: number[];
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
export const OwnerService = new OwnerControllerService();
export const AuthService = new AuthentificationService();
export const UserService = new UserControllerService();
export const WorkspacesService = new WorkspacesControllerService();
	`, (err) => {
      if (err) {
        console.error("Append error");
      } else {
        console.log("Append success");
      }
    });
  } catch (e) {
    console.log("%cCodegen error!!!", "color: red");
    console.log(e);
  }
};
