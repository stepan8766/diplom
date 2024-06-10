const portfolioService = require("./portfolioService.js");


class portfolioController {
  async create(req, res) {
    try {
      const portfolio = await portfolioService.create(req.body, req.files.picture, req.files.port_picture1, req.files.port_picture2, req.files.port_picture3,);
      res.json(portfolio);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAll(req, res) {
    try {
      const portfolios = await portfolioService.getAll();
      return res.json(portfolios);
    } catch (error) {
      res.status(500).json(error);
    }
    
  }

  async getOne(req, res) {
    try {
      const portfolio = await portfolioService.getOne(req.params.id);
      return res.json(portfolio);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async update(req, res) {
    try {
      const updatedPortfolio = await portfolioService.update(req.body);
      return res.json(updatedPortfolio);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async delete(req, res) {
    try {
      const portfolio = await portfolioService.delete(req.params.id);
      return res.json(portfolio);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new portfolioController();
