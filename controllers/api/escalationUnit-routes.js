const router = require("express").Router();
const { response } = require("express");
const sequelize = require("../config/connection");
const { Escalation_Unit } = require("../../models");

router.get("/", (req, res) => {
  Escalation_Unit.findAll({
    attributes: [
      "id",
      "first_name",
      "last_name",
      "employee_number",
      "site",
      "start_date",
      "role",
      "language",
      "group",
      "supervisor_id",
      "qa_agent",
    ],
  })

    .then((callRepData) => res.json(callRepData))

    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Escalation_Unit.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "first_name",
      "last_name",
      "employee_number",
      "site",
      "start_date",
      "role",
      "language",
      "group",
      "supervisor_id",
      "qa_agent",
    ],
  })

    .then((callRepData) => res.json(callRepData))

    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  if (req.session) {
    Escalation_Unit.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      employee_number: req.body.employee_number,
      site: req.body.site,
      start_date: req.body.start_date,
      role: req.body.role,
      language: req.language,
      group: req.group,
      qa_agent: req.body.qa_agent,
    })
      .then((callRepData) => res.json(callRepData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

router.put("/:id", (req, res) => {
  Escalation_Unit.update(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      employee_number: req.body.employee_number,
      site: req.body.site,
      start_date: req.body.start_date,
      role: req.body.role,
      language: req.language,
      group: req.group,
      qa_agent: req.body.qa_agent,
    },

    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((callRepData) => {
      if (callRepData) {
        res.status(404).json({ message: "No call rep found" });
        return;
      }
      res.json(callRepData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  console.log("id", req.params.id);
  Escalation_Unit.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((callRepData) => {
      if (!callRepData) {
        res.status(404).json({ message: "No call rep found with this id" });
        return;
      }
      res.json(callRepData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;