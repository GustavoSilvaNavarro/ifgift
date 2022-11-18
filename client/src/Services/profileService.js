const BASEurl = 'http://localhost:8080';

export const getAllUsers = async () => {
  try {
    const result = await fetch(`${BASEurl}/user`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const user = await result.json();
    return user;
  } catch (err) {
    console.error(err);
  }
};

export const getUserInfo = async userId => {
  try {
    const result = await fetch(`${BASEurl}/single-user`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userId}`,
      },
    });
    const user = await result.json();
    return user;
  } catch (err) {
    console.error(err);
  }
};

export const addUser = async user => {
  try {
    const result = await fetch(`${BASEurl}/user`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return result.json();
  } catch (err) {
    console.error(err);
  }
};

export const updateUser = async user => {
  try {
    const result = await fetch(`${BASEurl}/user/${user.email}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return result.json();
  } catch (err) {
    console.error(err);
  }
};
