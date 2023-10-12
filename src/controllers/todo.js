import todo from "../models/todo.js";
import responseStructure from "../../utils/responseStructure.js";

export const add_todo = async (data, cb) => {
  try {
    if (!data.user_id || !data.todo || !data.start || !data.end)
      throw new Error("Params missing");

    const newTodo = new todo({
      user_id: data.user_id,
      todo: data.todo,
      details: data.details || "",
      start: new Date(data.start),
      end: new Date(data.end),
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
    const where_data = {};
    if (data.date) {
      where_data.created_at = new Date(data.date);
    } else if (data.start && data.end) {
      where_data.created_at = {
        $gte: new Date(data.start),
        $lte: new Date(data.end),
      };
    } else {
      const latest_date = await todo.findOne(
        { user_id: data.user_id },
        { created_at: true },
        { sort: { created_at: -1 } }
      );
      where_data.created_at = latest_date?.created_at;
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

export const update_todo_status = async (data, cb) => {
  try {
    if (!data.id) throw new Error("Params missing");

    const found = await todo.findOne({ _id: data.id });
    if (!found) throw new Error("todo not found");

    if (found.is_done) {
      throw new Error("This todo is alreday done, you cant change its status");
    }

    if (data.is_active === found.is_active) {
      throw new Error(
        `this todo is already marked as ${
          data.is_active ? "active" : "inative"
        }`
      );
    }

    const updated_data = {};
    if (data.is_active === true || data.is_active === false) {
      updated_data.is_active = data.is_active;
    } else if (data.is_done === true) {
      updated_data.is_active = false;
      updated_data.is_done = true;
    }

    const res = await todo.findByIdAndUpdate(data.id, updated_data, {
      new: true,
    });

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
