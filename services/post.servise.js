import loadDataFromDatabase from "../DAL/postsDAL.js";

// Getting the data from the db
// Searching for the requested post
// Returning the requested post
export async function postFinder(id, dbPath) {
  try {

    let TheRequestedPost = "";
    const idToSearch = Number(id);
    const dataFromDB = await loadDataFromDatabase(dbPath);

    for (let i = 0; i < dataFromDB.length; i++) {
      if (dataFromDB[i].id === idToSearch) {
        TheRequestedPost = dataFromDB[i];
        break;
      }
    }
    if (!TheRequestedPost) {
      const err = new Error("There is no post with such an id.");
      err.status = 404;
      throw err;
    }
    return TheRequestedPost;
  } catch (err) {
    console.error("Error find the post", err.message);
    throw err;
  }
}


export  function writingNewPostToDB(){
  
}