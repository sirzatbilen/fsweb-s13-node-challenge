// "eylem" routerını buraya yazın
const express = require("express");
const router = express.Router();
const actionModel = require("./actions-model");

const mw = require("./actions-middlware");

router.get("/", async (req, res, next) => {
  try {
    let actionsList = await actionModel.get();
    res.json(actionsList);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", mw.validateActionId, async (req, res, next) => {
  try {
    let { id } = req.params;
    let actions = await actionModel.get(id);
    res.json(actions);
  } catch (error) {
    next(error);
  }
});

router.post("/", mw.validateActionDetail, async (req, res, next) => {
  try {
    let action = req.action;
    let insertAction = await actionModel.insert(action);
    res.json(insertAction);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  mw.validateActionId,
  mw.validateActionDetail,
  async (req, res, next) => {
    try {
      let id = req.params.id;
      let action = req.action;
      let updatedData = await actionModel.update(id, action);
      res.json(updatedData);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", mw.validateActionId, async (req, res, next) => {
  try {
    await actionModel.remove(req.params.id);
    res.json({ message: `${req.params.id} action is deleted` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
