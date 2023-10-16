import todo from "../models/todo.js";
import responseStructure from "../../utils/responseStructure.js";

export const add_todo = async (data, cb) => {
  try {
    console.log(data);
    if (
      !data.todo ||
      !data.start ||
      !data.end ||
      !data.created_for ||
      data.created_for.length <= 0
    )
      throw new Error("Params missing");

    const newTodo = new todo({
      created_by: data.user._id,
      todo: data.todo,
      details: data.details || "",
      start: new Date(data.start),
      end: new Date(data.end),
      created_for: data.created_for,
    });

    const res = await newTodo.save();

    return cb(
      null,
      responseStructure
        .merge({
          status: 200,
          success: true,
          data: res,
          message: "ok",
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
          message: err.message,
        })
        .toJS()
    );
  }
};

export const get_todo = async (data, cb) => {
  try {
    const where_data = {
      created_by: data.user._id,
    };

    if (data.date) {
      where_data.createdAt = new Date(data.date);
    } else if (data.start && data.end) {
      where_data.createdAt = {
        $gte: new Date(data.start),
        $lte: new Date(data.end),
      };
    } else {
      const latest_date = await todo.findOne(
        { user_id: data.user_id },
        { createdAt: true },
        { sort: { createdAt: -1 } }
      );
      where_data.createdAt = latest_date?.createdAt;
    }

    const res = await todo.find(where_data);

    return cb(
      null,
      responseStructure
        .merge({
          status: 200,
          success: true,
          data: res,
          message: "ok",
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
          message: err.message,
        })
        .toJS()
    );
  }
};

export const delete_todo = async (data, cb) => {
  try {
    if (!data.id) throw new Error("Params missing");

    const found_todo = await todo.findById(data.id);
    if (!found_todo) throw new Error("no todo found");

    if (found_todo.created_by !== data.user._id) {
      throw new Error("You dont have permission to delete this todo");
    }

    const res = await todo.findByIdAndDelete(data.id);

    return cb(
      null,
      responseStructure
        .merge({
          status: 200,
          success: true,
          data: res,
          message: "ok",
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
          message: err.message,
        })
        .toJS()
    );
  }
};

export const update_todo = async (data, cb) => {
  try {
    if (!data.id) throw new Error("Params missing");

    const found_todo = await todo.findById(data.id);
    if (!found_todo) throw new Error("no todo found");

    if (
      found_todo.created_by !== data.user._id ||
      !found_todo.created_for.includes(data.user._id)
    ) {
      throw new Error("You dont have permission to update this todo");
    }

    const updated_data = {};
    if (data.todo) {
      updated_data.todo = data.todo;
    }
    if (data.details) {
      updated_data.details = data.details;
    }
    if (data.start) {
      updated_data.start = new Date(data.start);
    }
    if (data.end) {
      updated_data.end = new Date(data.end);
    }
    if (data.status) {
      updated_data.status = data.status;
    }

    updated_data.updated_at = new Date();

    const res = await todo.findByIdAndUpdate(data.id, updated_data);

    return cb(
      null,
      responseStructure
        .merge({
          status: 200,
          success: true,
          data: res,
          message: "ok",
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
          message: err.message,
        })
        .toJS()
    );
  }
};
