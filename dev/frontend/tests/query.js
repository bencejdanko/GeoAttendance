require('dotenv').config();
const PocketBase = require('pocketbase/cjs');
const pb = new PocketBase("http://" + process.env.PB_URL);

const USERS_TABLE = "users";

const getAllUsers = async () => {
    const users = await pb.collection(USERS_TABLE).getFullList();
    return users;
}

const deleteUser = async (userid) => {
    await pb.collection(USERS_TABLE).delete(userid);
}
module.exports = {getAllUsers, deleteUser};