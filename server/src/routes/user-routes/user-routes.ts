import Router from '@koa/router';

import { getAllUsers } from '../../controllers/user-controllers';

const router = new Router();

router.get('/allprofiles', getAllUsers);
// router.get('/profile', getProfileInfo);
// router.post('/profile', insertProfile);
// router.put('/profile', updateProfile);

export default router;
