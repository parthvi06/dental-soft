import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "ca-central-1_zwSLJHKgi",
    ClientId: "6n08g7dupuuvsqk2ufvskvboam"
}

export default new CognitoUserPool(poolData);