// eylemlerle ilgili ara katman yazılımları yazın
const actionModel = require("./actions-model");
const projectModel = require("../projects/projects-model");
const { route } = require("./actions-router");

async function validateActionId(req, res, next) {
  try {
    let isExistAction = await actionModel.get(req.params.id);
    if (!isExistAction) {
      res.status(404).json({ message: "actions not found" });
    } else {
      req.action = isExistAction;
    }
    next();
  } catch (error) {
    next(error);
  }
}

async function validateActionDetail(req, res, next) {
  try {
    let { project_id, description, notes, completed } = req.body;
    if (
      !project_id ||
      !description ||
      !notes ||
      typeof completed != "boolean"
    ) {
      res.status(400).json({ message: "Missed fields" });
    } else {
      if (project_id > 0) {
        let isExistPorject = await projectModel.get(project_id);
        if (!isExistPorject) {
          res.status(400).json({ message: "project not found" });
        } else {
          req.action = req.body;
        }
      }
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  validateActionDetail,
  validateActionId,
};
