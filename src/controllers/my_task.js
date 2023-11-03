import My_Task from "../models/my_task.js";
import responseStructure from "../../utils/responseStructure.js";

export const add_my_task = async (data, cb) => {
  try {
    if (!data.title || !data.start || !data.end)
      throw new Error("Params missing");

    const new_task = new My_Task({
      created_by: data.user._id,
      title: data.title,
      details: data.details || "",
      start: new Date(data.start),
      end: new Date(data.end),
    });

    const res = await new_task.save();

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

export const get_my_task = async (data, cb) => {
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

    const res = await My_Task.find(where_data);

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

export const delete_my_task = async (data, cb) => {
  try {
    if (!data.id) throw new Error("Params missing");

    const found_task = await My_Task.findById(data.id);
    if (!found_task) throw new Error("no task found");

    if (found_task.created_by !== data.user._id) {
      throw new Error("You dont have permission to delete this task");
    }

    const res = await My_Task.findByIdAndDelete(data.id);

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

export const update_my_task = async (data, cb) => {
  try {
    if (!data.id) throw new Error("Params missing");

    const found_task = await My_Task.findById(data.id);
    if (!found_task) throw new Error("no task found");

    if (found_task.created_by !== data.user._id) {
      throw new Error("You dont have permission to update this task");
    }

    const updated_data = {};
    if (data.title) {
      updated_data.title = data.title;
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
