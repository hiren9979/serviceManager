import { response } from "express";
import { generateV4uuid } from "../common/common.js";
import { executeQuery } from "../common/common.js";
import responses from "../common/response.js";
export async function addCategory(data) {
  try {
    const query = `INSERT INTO category (id, name) VALUES (?, ?);`;
    const result = await executeQuery(query, [generateV4uuid(), data.name]);
    console.log("result: " + result);
    if (result && result.affectedRows > 0) {
      console.log("Category added successfully.");
      return {
        status: 200,
        message: "Category added successfully",
      };
    } else {
      console.error("Failed to add Category.");
      return { status: 400, message: "Failed to add Category" };
    }
  } catch (error) {
    console.error("Error adding expense:", error);
    throw error;
  }
}

export async function getCategories() {
  try {
    console.log("aasasasas");
    const query = `SELECT * FROM category;`;
    const result = await executeQuery(query, []);
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

export async function getSingleCategory(data) {
  try {
    console.log("aasasasas");
    const query = `SELECT * FROM category WHERE id = ?;`;
    const result = await executeQuery(query, [data.id]);
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

export async function deleteCatetory(data) {
  try {
    console.log("delete",data);
    const query = `DELETE FROM category WHERE id = ?;`;
    const result = await executeQuery(query, [data.id]);
    console.log("ddsdf");
    if (result.affectedRows > 0) {
      return responses.successResponse(200, "Catetory deleted successfully");
    } else {
      return responses.badRequest;
    }
  } catch (error) {
    return responses.errorOccured(400, error);
  }
}

export async function updateCategory(data) {
  try {
    console.log("dddd");
    const query = `UPDATE category SET name = ? WHERE id = ?;`;
    const result = await executeQuery(query, [data.name, data.id]);
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
