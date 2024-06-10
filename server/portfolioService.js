const Portfolio = require("./portfolio.js");
const fileService = require("./fileService.js");
class portfolioService {
  async create(portfolio, picture, port_picture1, port_picture2, port_picture3) {
    const fileName = fileService.saveFile(picture);
    const fileName_port1 = fileService.saveFile(port_picture1);
    const fileName_port2 = fileService.saveFile(port_picture2);
    const fileName_port3 = fileService.saveFile(port_picture3);
    const filePath = `C:\\alldesktop\\Diplom2copy\\fundamental-react\\server\\portfolioPictures\\${fileName}`
    const filePath_port1 = `C:\\alldesktop\\Diplom2copy\\fundamental-react\\server\\portfolioPictures\\${fileName_port1}`
    const filePath_port2 = `C:\\alldesktop\\Diplom2copy\\fundamental-react\\server\\portfolioPictures\\${fileName_port2}`
    const filePath_port3 = `C:\\alldesktop\\Diplom2copy\\fundamental-react\\server\\portfolioPictures\\${fileName_port3}`
    const myFile = picture
    const myFile_port1 = port_picture1
    const myFile_port2 = port_picture2
    const myFile_port3 = port_picture3
    myFile.mv(filePath)
    myFile_port1.mv(filePath_port1)
    myFile_port2.mv(filePath_port2)
    myFile_port3.mv(filePath_port3)
    const createdPortfolio = new Portfolio({title:portfolio.title, content:portfolio.content, picture:fileName, port_picture1:fileName_port1, port_picture2:fileName_port2, port_picture3:fileName_port3});
    await createdPortfolio.save()
    console.log(createdPortfolio)
    return createdPortfolio;
  }

  async getAll() {
    const portfolios = await Portfolio.find();
    return portfolios;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("id not correct");
    } 
    const portfolio = await Portfolio.findById(id);
    return portfolio;
  }

  async update(portfolio) {
    if (!portfolio.id) {
      throw new Error("id not correct");
    }
    const updatedPortfolio = await Portfolio.findByIdAndUpdate(portfolio.id, portfolio, {
      new: true,
    });
    return updatedPortfolio;
  }

  async delete(id) {
    if (!id) {
      throw new Error("id not correct");
    }
    const portfolio = await Portfolio.findByIdAndDelete(id);
    return portfolio;
  }
}

module.exports = new portfolioService();
