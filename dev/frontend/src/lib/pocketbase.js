import PocketBase from 'pocketbase';
const pb = new PocketBase(process.env.REACT_APP_PB_URL);
pb.autoCancellation(false)
export default pb;