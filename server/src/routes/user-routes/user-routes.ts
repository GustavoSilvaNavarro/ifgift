import Router from '@koa/router';

import { getAllUsers, addNewUser, getSingleUserInfo, updateUserInfo } from '../../controllers/user-controllers';

const router = new Router();

router.get('/user', getAllUsers);
router.post('/user', addNewUser);
router.get('/single-user', getSingleUserInfo);
router.put('/user/:userEmail', updateUserInfo);

export default router;
