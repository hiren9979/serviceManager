import express from "express";
import responses from "../../common/response.js";
import {
  addCategory,
  deleteCatetory,
  getCategories,
  getSingleCategory,
  updateCategory,
} from "../../db/category.js";
import { generateV4uuid } from "../../common/common.js";

var router = express.Router();

const addCategoryController = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
    };
    console.log(data);
    const info = await addCategory(data);
    console.log(info);
    res.send(responses.successResponse(200, info.message));
  } catch (error) {
    return responses.errorOccured(500, "Error While add category");
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const data = {
      id: req.headers.id,
    };
    console.log(data);
    const info = await deleteCatetory(data);
    if (info.status === 200) {
      res.send(responses.successResponse(200, info.message));
    } else {
      res.send(responses.badRequest(info.status, info.message));
    }
  } catch (error) {
    return responses.errorOccured(500, "Error While add category");
  }
};

const updateCategoryController = async (req, res) => {
  try {
    console.log("dsdds", req.params);

    const data = {
      name: req.body.name,
      id: req.body.id,
    };
    const result = await updateCategory(data);
    console.log(result);
    if (result.status === 200) {
      res.send(responses.successResponse(200, result.message));
    } else {
      console.log("aaa");
      res.send({
        status: 500,
        message: "Not found category",
      });
    }
  } catch (error) {
    return responses.errorOccured(500, "Error updating category");
  }
};

const getAllCategory = async (req, res) => {
  try {
    console.log("dsdds", req.body);
    const result = await getCategories();
    console.log(result);
    if (result.status === 200) {
      res.send({
        status: 200,
        data: result.data,
        message: "Categories fetched successfully",
      });
    }
  } catch (error) {
    return responses.errorOccured(500, "Error updating category");
  }
};

const getCategory = async (req, res) => {
  try {
    console.log("dsdds", req.headers);
    const data = {
      id: req.headers.id,
    }
    const result = await getSingleCategory(data);
    console.log(result);
    if (result.status === 200) {
      res.send({
        status: 200,
        data: result.data,
        message: "Categorry fetched successfully",
      });
    }
  } catch (error) {
    return responses.errorOccured(500, "Error updating category");
  }
};

export {
  addCategoryController,
  updateCategoryController,
  getCategory,
  getAllCategory,
  deleteCategoryController,
};
