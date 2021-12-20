class RouterCreator {
  constructor(service, router) {
    this.service = service;
    this.router = router;
  }
  createCrud() {
    this.router.get('/', (req, res) => {
      this.service
        .getAll()
        /* always returns array, even if empty/one */
        .then((result) => {
          console.log(result.body);
          if (result.length != 0) res.status(200).json(result);
          else res.status(204).send();
        })
        .catch((e) => {
          console.log(e.message);
          res.json({ error: e.message, stack: e.stack });
        });
    });

    this.router.get('/:id', (req, res) => {
      this.service
        .getById(req.params.id)
        /* Returns one object */
        .then((result) => {
          console.log(result.body);
          if (result) res.status(200).json(result);
          else res.status(204).send();
        })
        .catch((e) => {
          console.log(e.message);
          res.json({ error: e.message, stack: e.stack });
        });
    });

    this.router.post('/', (req, res) => {
      const data = req.body;
      this.service.create(data).then((result) => {
        console.log(result.body);
        res.status(result.status).json(result.data);
      });
    });

    this.router.put('/', (req, res) => {
      const data = req.body;
      const id = req.body.id;

      this.service.update(data, id).then((result) => {
        console.log(result.body);
        res.status(result.status).json(result.data);
      });
    });

    this.router.delete('/', (req, res) => {
      const id = req.body.id;

      this.service.destroy(id).then((result) => {
        console.log(result.body);
        res.status(result.status).json(result.data);
      });
    });
  }

  getRouter() {
    return this.router;
  }
}

module.exports = RouterCreator;
