const router = require("express").Router();

const { Employee } = require("../../models");

router.get("/", (req, res) => {
  Employee.findAll({
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
      "employee_supervisor_id",
      "qa_agent",
    ],
  })

    .then((callRepData) => res.json(callRepData))

    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Employee.findOne({
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
      "employee_supervisor_id",
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
    Employee.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      employee_number: req.body.employee_number,
      site: req.body.site,
      role: req.body.role,
      language: req.body.language,
      group: req.body.group,
      employee_supervisor_id: req.body.employee_supervisor_id,
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
  Employee.update(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      employee_number: req.body.employee_number,
      site: req.body.site,
      role: req.body.role,
      language: req.body.language,
      group: req.body.group,
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
  Employee.destroy({
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