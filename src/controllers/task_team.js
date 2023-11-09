import Task_Team from "../models/task_team";

export const add_task_team = async (data, cb) => {
  try {
    if (
      !data.members ||
      data.members.length <= 0 ||
      !data.group_name ||
      !data.created_by
    )
      throw new Error("Params missing");

    const new_task_team = new Task_Team({
      group_name: data.group_name,
      members: data.members,
      created_by: data.user._id,
      admins: [data.user._id],
    });

    const res = await new_task_team.save();

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
