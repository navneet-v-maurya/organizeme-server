import todo from "../models/todo.js";
import responseStructure from "../../utils/responseStructure.js";

export const add_todo = (data, cb) => {
  try {
    console.log("reached controller");
    return cb(
      null,
      responseStructure
        .merge({
          status: 200,
          success: true,
          data: "hii",
          message: "add_todo",
        })
        .toJS()
    );
  } catch (err) {
    return cb(
      responseStructure
        .merge({
          status: 400,
          success: false,
          data: null,
          message: "add_todo",
        })
        .toJS()
    );
  }
};
