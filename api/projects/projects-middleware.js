// projects ara yazılımları buraya
const projectModel = require("./projects-model");

async function validateProjectId(req, res, next) {
  try {
    let { id } = req.params;
    let existProject = await projectModel.get(id);
    if (!existProject) {
      res.status(404).json({ message: "project not found" });
    } else {
      req.project = existProject;
    }
    next();
  } catch (error) {
    next(error);
  }
}

function validateProjectDetail(req, res, next) {
  try {
    let { name, description, completed } = req.body;
    if (!name || !description || completed == undefined) {
      res.status(400).json({ message: "Eksik alan var" });
    } else {
      req.project = {
        name: name,
        description: description,
        completed: completed,
      };
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  validateProjectDetail,
  validateProjectId,
};
