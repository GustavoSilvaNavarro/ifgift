import Router from 'koa-router';
const router = new Router();
import { getAllProfiles, getProfileInfo, insertProfile, updateProfile } from './controllers/profile.js';
import { fetchMyLists, insertList, findByIdAndUpdate, deleteList } from './controllers/lists.js';

router.get('/allprofiles', getAllProfiles);
router.get('/profile', getProfileInfo);
router.post('/profile', insertProfile);
router.put('/profile', updateProfile);

router.get('/mylists/:userId', fetchMyLists);
router.post('/mylists/:userId', insertList);
router.put('/myLists/:id', findByIdAndUpdate);
router.delete('/mylists/:id', deleteList);

export default router;
