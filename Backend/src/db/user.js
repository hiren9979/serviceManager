import responses from "../common/response.js";
import { executeQuery, generateV4uuid } from "../common/common.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function createUser(data) {
  try {
    const query = `INSERT INTO users (id, name, email, password, authToken) VALUES (?, ?, ?, ?, ?);`;
    const result = await executeQuery(query, [
      generateV4uuid(),
      data.name,
      data.email,
      data.password,
      data.authToken,
    ]);
    if (result) {
      return responses.created;
    } else {
      return responses.badRequest;
    }
  } catch (error) {
    return responses.errorOccured(400, error);
  }
}

export async function login(data) {
  try {
    console.log(data.email.toLowerCase() == "admin@codesfortomorrow.com");
    console.log(data.password);
    if (
      data.email.toLowerCase() == "admin@codesfortomorrow.com" &&
      data.password == " Admin123!@#"
    ) {
      console.log("dddsd");
      const authToken = jwt.sign({}, "dddd", {
        expiresIn: "24h",
      });

      console.log(authToken);
      const authData = {
        authToken: authToken,
      };
      return authData;
    } else {
      return responses.errorOccured(404, "Provide proper user credentials!!!");
    }
  } catch (error) {
    return responses.errorOccured(400, error);
  }
}
