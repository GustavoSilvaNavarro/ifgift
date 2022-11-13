import MyList from '../models/myList';


export const fetchMyLists = async (ctx) => {
  try {
    const result = await MyList.find();
    ctx.send(result);
    ctx.status(200);
  } catch (error) {
    console.error(error);
    ctx.status(500);
  }
}

export const insertList = async (ctx) => {
  try {
    const newList = await MyList.create(ctx.body);
    ctx.send(newList);
    ctx.status(201);
  } catch (error) {
    console.error(error);
    ctx.status(400).send();
  }
}