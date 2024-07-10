import express from "express";
import responses from "../../common/response.js";
import { login } from "../../db/user.js";
import bcrypt from "bcrypt";

var router = express.Router();

const userLogin = async (req, res) => {
  try {
    console.log("dsdds", req.body);
    const data = {
      email: req.headers.email,
      password: req.headers.password,
    }
    const result = await login(data);
    console.log(result);
    if (result.authToken) {
      res.send({
        status: 200,
        authToken: result.authToken,
        message: "Login successfully",
      });
    }
  } catch (error) {
    return responses.errorOccured;
  }
};

export {userLogin};
