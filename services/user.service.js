import loadDataFromDatabase, { writeToFile } from "../DAL/postsDAL.js";

export async function name(user, userDBpath) {
  try {

    const allusers = await loadDataFromDatabase(userDBpath);

    for (let i = 0; i < allusers.length; i++) {
      if (allusers[i].username === user.username) {
        return { status: "exists", user: allusers[i] };
        break;
      }
    }
    const maxID =
      allusers.length > 0 ? Math.max(...allusers.map((r) => r.id)) : 1;
    user.id = maxID + 1;
    allusers.push(user);

    await writeToFile(allusers, userDBpath);

    return { status: "created", user: user };

  } catch (err) {
    console.error("error:", err.message);
    throw err;
  }
}
