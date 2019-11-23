"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
function createAuthClient(options) {
    const axiosInstance = axios_1.default.create({
        baseURL: options.authServerUrl,
    });
    return {
        async register(registerOptions) {
            try {
                const { data: user } = await axiosInstance.post('/auth/register', registerOptions);
                return user;
            }
            catch (error) {
                throw error;
            }
        },
    };
}
exports.createAuthClient = createAuthClient;
//# sourceMappingURL=index.js.map