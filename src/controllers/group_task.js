import Group_Task from "../models/group_task";
import Task_Team from "../models/task_team";
import responseStructure from "../../utils/responseStructure";

export const add_group_task = async (data, cb) => {
  try {
    if (
      !data.title ||
      !data.start ||
      !data.end ||
      !data.team_id ||
      !data.members ||
      data.members.length <= 0
    )
      throw new Error("Params missing");

    const new_group_task = new Group_Task({
      created_by: data.user._id,
      title: data.title,
      details: data.details || "",
      start: new Date(data.start),
      end: new Date(data.end),
      team_id: data.team_id,
      members: data.members,
    });

    const res = await new_group_task.save();

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
