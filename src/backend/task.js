/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const dotenv = require('dotenv');
const codegen = require("./codegen");

dotenv.config();

codegen({
	methodName: 'backend',
	isHello: true,
	openApi: '3.0.1',
	remoteUrl: 'http://130.193.40.220:8080/api/v3/api-docs',
	outputDir: 'src/backend/services/backend',
	useStaticMethod: false
});
