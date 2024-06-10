const Post = require("./post.js");
const fileService = require("./fileService.js");
class postService {
  async create(post, picture) {
    const fileName = fileService.saveFile(picture);
    const filePath = `C:\\alldesktop\\Diplom2copy\\fundamental-react\\server\\postPictures\\${fileName}`
    const myFile = picture
    myFile.mv(filePath)
    const createdPost = new Post({title:post.title, content:post.content, picture:fileName});
    await createdPost.save()
    console.log(createdPost)
    return createdPost;
  }

  async getAll() {
    const posts = await Post.find();
    return posts;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("id not correct");
    } 
    const post = await Post.findById(id);
    return post;
  }

  async update(post) {
    if (!post.id) {
      throw new Error("id not correct");
    }
    const updatedPost = await Post.findByIdAndUpdate(post.id, post, {
      new: true,
    });
    return updatedPost;
  }

  async delete(id) {
    if (!id) {
      throw new Error("id not correct");
    }
    const post = await Post.findByIdAndDelete(id);
    return post;
  }
}

module.exports = new postService();
