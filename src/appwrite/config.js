import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";
export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
          createAt: new Date().getTime(),
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  async updatePost(slug,{ title, content, featuredImage, status}) {
    try{
        return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
              title,
              content,
              featuredImage,
              status,
            }

        )
    }
    catch(error){
      console.log(error);
    }

  }
  async deletePost(slug)//slug is id
  {
    try{
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteDatabaseId,
        slug
      )
      return true;
    }
    catch(error){
      console.log(error);
      return false;
    }
  }
  async getPost(slug){
    try{
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
    }
    catch(error){
      console.log(error);
      return false;

    }
  }
  async getPosts(queries =[Query.equal("status","active")]){
    try{
      
    }
    catch(error){
      console.log(error);
      return false;

    }
  }
  async uploadFile(file){
    try{
      return await this.bucket.createFile(
        conf.appwriteUrlBucketId,
        ID.unique(),
        file
        
      )
    }
    catch(error){
      console.log(error);
      return false;

    }
  }
  async deleteDocument(fileId){

    try{
        await this.bucket.deleteFile(
          conf.appwriteUrlBucketId,
          fileId
        )
        return true
    }
    catch(error){

      console.log(error)
    }
    return false
  }
  getFilePreview(fileId){
    return this.bucket.getFilePreview(
      conf.appwriteUrlBucketId,
      fileId
    )
  }
}
const service = new Service();
export default service;
