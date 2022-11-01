import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "ca-central-1_53gnIRL7N",
    ClientId: "16llphlcb6qakdf2d6embmf6b6"
}

export default new CognitoUserPool(poolData);