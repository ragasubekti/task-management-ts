import { Response } from "express";
import { AuthorizationRequest } from "../middlewares/Authorization";
import TaskModel from "../models/TaskModel";

export const CreateTask = async (req: AuthorizationRequest, res: Response) => {
  const { name, description, dueDate, isCompleted } = req.body;

  // if (req.decoded.isManager) {
  //   return res.status(400).send({
  //     message: "You're not allowed to create task"
  //   });
  // }

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
};
