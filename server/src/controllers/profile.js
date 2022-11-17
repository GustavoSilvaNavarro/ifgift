import Profile from '../models/profile.js';
import jwt from 'jsonwebtoken';

export const getAllProfiles = async ctx => {
  try {
    const result = await Profile.find();
    ctx.body = result;
    ctx.status = 200;
  } catch (error) {
    console.error(error);
    ctx.status = 400;
  }
};

export const getProfileInfo = async ctx => {
  try {
    const token = ctx.request.header.authorization.split(' ')[1];
    const { _id } = jwt.verify(token, 'secret key');
    const result = await Profile.findOne({ _id });
    ctx.body = result;
    ctx.status = 200;
  } catch (error) {
    console.log('Get request error in profile controller', error);
    ctx.status = 500;
  }
};

export const insertProfile = async ctx => {
  try {
    let profile = await Profile.findOne({ email: ctx.request.body.email });
    if (!profile) {
      profile = await Profile.create(ctx.request.body);
    }
    const newToken = jwt.sign({ _id: profile._id }, 'secret key');
    ctx.body = { profile, token: newToken };
    ctx.status = 201;
  } catch (error) {
    console.log('Error creating profile in controller');
    ctx.status = 400;
  }
};

export const updateProfile = async ctx => {
  try {
    let profile = await Profile.updateOne(ctx.request.body);
    ctx.body = profile;
    ctx.status = 200;
  } catch (error) {
    console.log('Error updating profile in controller.');
    ctx.status = 400;
  }
};
