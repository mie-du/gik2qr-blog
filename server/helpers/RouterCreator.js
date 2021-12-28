class RouterCreator {
  constructor(service, router) {
    this.service = service;
    this.router = router;
  }
  createGet() {
    this.router.get('/', (req, res) => {
      this.service
        .getAll()
        /* always returns array, even if empty/one */
        .then((result) => {
          if (result.length != 0) res.status(200).json(result);
          else res.status(204).send();
        })
        .catch((e) => {
          console.log(e.message);
          res.json({ error: e.message, stack: e.stack });
        });
    });
  }
  createGetById() {
    this.router.get('/:id', (req, res) => {
      this.service
        .getById(req.params.id)
        /* Returns one object */
        .then((result) => {
          if (result) res.status(200).json(result);
          else res.status(204).send();
        })
        .catch((e) => {
          console.log(e.message);
          res.json({ error: e.message, stack: e.stack });
        });
    });
  }
  createPost() {
    this.router.post('/', (req, res) => {
      const data = req.body;
      this.service.create(data).then((result) => {
        res.status(result.status).json(result.data);
      });
    });
  }
  createPut() {
    this.router.put('/', (req, res) => {
      const data = req.body;
      const id = req.body.id;

      this.service.update(data, id).then((result) => {
        res.status(result.status).json(result.data);
      });
    });
  }
  createDelete() {
    this.router.delete('/', (req, res) => {
      const id = req.body.id;

      this.service.destroy(id).then((result) => {
        res.status(result.status).json(result.data);
      });
    });
  }
  createCrud() {
    this.createGet();
    this.createGetById();
    this.createPost();
    this.createPut();
    this.createDelete();
  }

  getRouter() {
    return this.router;
  }
}

module.exports = RouterCreator;
