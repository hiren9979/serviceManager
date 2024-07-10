import { response } from "express";
import { generateV4uuid } from "../common/common.js";
import { executeQuery } from "../common/common.js";
import responses from "../common/response.js";
export async function addService(data) {
  try {
    const query = `INSERT INTO service (id, serviceName, categoryId, type, priceOptionId) VALUES (?, ?, ?, ?, ?);`;
    const result = await executeQuery(query, [
      generateV4uuid(),
      data.serviceName,
      data.categoryId,
      data.type,
      data.priceOptionId,
    ]);
    console.log("result: " + result);
    if (result) {
      console.log("Service added successfully.");
      return {
        status: 200,
        message: "Service added successfully",
      };
    } else {
      console.error("Failed to add Service.");
      return { status: 400, message: "Failed to add Service" };
    }
  } catch (error) {
    console.error("Error adding expense:", error);
    return responses.badRequest(400, "Failed to add service.");
  }
}

export async function getServices(data) {
  try {
    console.log("aasasasas");
    const query = `SELECT * FROM service WHERE categoryId = ?;`;
    const result = await executeQuery(query, [data.categoryId]);
    console.log("ddsdf", result);
    if (result) {
      return {
        status: 200,
        data: result,
      };
    } else {
      return responses.badRequest;
    }
  } catch (error) {
    return responses.errorOccured(400, error);
  }
}

export async function getSingleService(data) {
  try {
    console.log("aasasasas");
    const query = `SELECT * FROM service WHERE categoryId = ? AND serviceId = ?;`;
    const result = await executeQuery(query, [data.categoryId,data.serviceId]);
    console.log("ddsdf", result);
    if (result) {
      return {
        status: 200,
        data: result,
      };
    } else {
      return responses.badRequest;
    }
  } catch (error) {
    return responses.errorOccured(400, error);
  }
}

export async function deleteService(data) {
  try {
    console.log("delete", data);
    const query = `DELETE FROM service WHERE id = ? AND categoryId = ?;`;
    const result = await executeQuery(query, [data.id, data.categoryId]);
    console.log("ddsdf", result.affectedRows);
    if (result.affectedRows > 0) {
      return responses.successResponse(200, "Service deleted successfully");
    } else {
      return responses.badRequest;
    }
  } catch (error) {
    return responses.errorOccured;
  }
}

export async function updateService(data) {
  try {
    console.log("dddd", data);
    const query = `UPDATE service SET serviceName = ?, categoryId = ?, type = ?, priceOptionId= ? WHERE id = ?;`;
    const result = await executeQuery(query, [
      data.serviceName,
      data.categoryId,
      data.type,
      data.priceOptionId,
      data.id,
    ]);
    console.log(result);
    if (result.affectedRows > 0) {
      return responses.successResponse(200, "Category updated successfully");
    } else {
      return responses.badRequest;
    }
  } catch (error) {
    return responses.errorOccured(400, error);
  }
}
