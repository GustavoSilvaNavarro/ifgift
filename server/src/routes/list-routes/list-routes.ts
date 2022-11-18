import Router from '@koa/router';

import {
  retrieveAllListByUserId,
  createNewList,
  addItemToList,
  deleteSingleList,
} from '../../controllers/list-controllers';

const router = new Router();

router.get('/list/:userId', retrieveAllListByUserId);
router.post('/list/:userId', createNewList);
router.put('/list/:listId', addItemToList);
router.delete('/list/:listId', deleteSingleList);

export default router;
