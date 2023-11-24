import My_Task from "../models/my_task.js";
import responseStructure from "../../utils/responseStructure.js";
import moment from "moment";

export const my_task_graph_data = async (data, cb) => {
  try {
    const where_data = {
      created_by: data.user._id,
    };

    if (data.date) {
      where_data.createdAt = {
        $gte: new Date(data.date),
        $lt: new Date(moment(data.date).add(1, "day").format("YYYY-MM-DD")),
      };
    } else if (data.start && data.end) {
      where_data.createdAt = {
        $gte: new Date(data.start),
        $lt: new Date(moment(data.end).add(1, "day").format("YYYY-MM-DD")),
      };
    } else {
      const latest_date = await My_Task.findOne(
        { user_id: data.user_id },
        { createdAt: true },
        { sort: { createdAt: -1 } }
      );
      where_data.createdAt = {
        $gt: new Date(moment(latest_date?.createdAt).format("YYYY-MM-DD")),
        $lt: new Date(
          moment(latest_date?.createdAt).add(1, "day").format("YYYY-MM-DD")
        ),
      };
    }

    const res = await My_Task.find(where_data);

    const created = {
      name: "Created",
      value: 0,
      color: "#00C49F",
      tasks: [],
    };

    const progress = {
      name: "Progress",
      value: 0,
      color: "#FFBB28",
      tasks: [],
    };

    const completed = {
      name: "Completed",
      value: 0,
      color: "#FF8042",
      tasks: [],
    };

    res.forEach((el) => {
      if (el.status === "created") {
        created.value++;
        created.tasks.push(el.title);
      } else if (el.status === "completed") {
        completed.value++;
        completed.tasks.push(el.title);
      } else {
        progress.value++;
        progress.tasks.push(el.title);
      }
    });

    return cb(
      null,
      responseStructure
        .merge({
          status: 200,
          success: true,
          data: {
            graph_data: [created, progress, completed],
            total: res.length,
          },
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
