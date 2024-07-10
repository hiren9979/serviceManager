import express from "express";
import responses from "../../common/response.js";

import { generateV4uuid } from "../../common/common.js";
import { addService, getServices, deleteService, updateService, getSingleService } from "../../db/service.js";

var router = express.Router();

const addServiceController = async (req, res) => {
  try {
    const data = {
      serviceName: req.body.serviceName,
      categoryId: req.body.categoryId,
      type: req.body.type,
      priceOptionsId: req.body.priceOptionsId
    };
    console.log(data);
    const info = await addService(data);
    console.log(info);
    res.send(responses.successResponse(200, info.message));
  } catch (error) {
    return responses.errorOccured(500, "Error While add category");
  }
};

const removeServiceController = async (req, res) => {
  try {
    console.log(req.headers);
    const data = {
      categoryId: req.headers.categoryid,
      serviceId: req.headers.serviceid,
    };
    console.log(data);
    const info = await deleteService(data);
    console.log(info);
    if (info.status === 200) {
      res.send(responses.successResponse(200, info.message));
    } else {
      res.send(responses.errorOccured(400,"Something went wrong with the service. Please try again"));
    }
  } catch (error) {
    return responses.errorOccured;
  }
};

const updateServiceController = async (req, res) => {
  try {
    console.log("dsdds", req.body);

    const data = {
      serviceName: req.body.serviceName,
      id: req.body.id,
      categoryId: req.body.categoryId,
      type: req.body.type,
      priceOptionsId: req.body.priceOptionsId,
    };
    console.log(data);
    const result = await updateService(data);
    console.log(result);
    if (result.status === 200) {
      res.send(responses.successResponse(200, result.message));
    } else {
      res.send(responses.errorOccured(400,"Category not found please reverify from you side."));
    }
  } catch (error) {
    return responses.errorOccured;
  }
};

const getAllServices = async (req, res) => {
  try {
    console.log("dsdds", req.headers);
    const data = {
      categoryId: req.headers.categoryId,
    }
    const result = await getServices(data);
    console.log(result);
    if (result.status === 200) {
      res.send({
        status: 200,
        data: result.data,
        message: "Services fetched successfully",
      });
    }
  } catch (error) {
    return responses.errorOccured;
  }
};

const getService = async (req, res) => {
  try {
    console.log("dsdds", req.body);
    const data = {
      categoryId: req.headers.categoryId,
      id: req.headers.id,
    }
    const result = await getSingleService(data);
    console.log(result);
    if (result.status === 200) {
      res.send({
        status: 200,
        data: result.data,
        message: "Services fetched successfully",
      });
    }
  } catch (error) {
    return responses.errorOccured;
  }
};

export {
  addServiceController,
  updateServiceController,
  getAllServices,
  getService,
  removeServiceController,
};
