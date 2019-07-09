import { Response } from "express";
import { AuthorizationRequest } from "../middlewares/Authorization";
import TaskModel, { ITaskModel } from "../models/TaskModel";
import { Document } from "mongoose";

export const CreateTask = async (req: AuthorizationRequest, res: Response) => {
  const { name, description, dueDate, isCompleted } = req.body;

  try {
    const create = await new TaskModel({
      name,
      description,
      dueDate,
      asignedTo: req.decoded.id,
      creator: req.decoded.id,
      isCompleted: isCompleted || false
    }).save();

    if (!create) {
      return res.status(500).send({
        message: "There's an unknown error happened to our end"
      });
    }

    return res.status(201).send({
      message: "Successfully created task!"
    });
  } catch (e) {
    return res.status(500).send({
      message: e
    });
  }
};

export const GetTask = async (req: AuthorizationRequest, res: Response) => {
  if (req.decoded.isManager) {
    const task = await TaskModel.find()
      .populate("asignedTo", "name username")
      .populate("creator", "name username");

    return res.send({
      message: "Successfully Retrieved Task List",
      data: task
    });
  }

  const task = await TaskModel.find({
    asignedTo: req.decoded.id
  });

  return res.send({
    message: "Successfully Retrieved Task List",
    data: task
  });
};

export const CompleteTask = async (
  req: AuthorizationRequest,
  res: Response
) => {
  const taskId = req.params.id;

  try {
    const task: any = await TaskModel.findOne({
      _id: taskId
    })
      .populate("asignedTo", "name username")
      .populate("creator", "name username");

    // console.log(task.creator);

    if (!task) {
      return res.status(404).send({
        message: "Not found"
      });
    }

    if (task && task.creator._id == req.decoded.id) {
      const update = await TaskModel.updateOne(task, {
        isCompleted: true
      });

      return res.send({
        message: "Successfully Completed "
      });
    } else {
      return res.status(401).send({
        message: `You're not allowed to do this`
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "Unknown error"
    });
  }
};
