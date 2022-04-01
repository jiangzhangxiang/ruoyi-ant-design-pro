// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Create User This can only be done by the logged in User. POST /User */
export async function createUser(body: API.User, options?: { [key: string]: any }) {
  return request<any>('/User', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Creates list of users with given input array POST /User/createWithArray */
export async function createUsersWithArrayInput(
  body: API.User[],
  options?: { [key: string]: any },
) {
  return request<any>('/User/createWithArray', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Creates list of users with given input array POST /User/createWithList */
export async function createUsersWithListInput(body: API.User[], options?: { [key: string]: any }) {
  return request<any>('/User/createWithList', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Logs User into the system GET /User/login */
export async function loginUser(
  params: {
    // query
    /** The User name for login */
    username: string;
    /** The password for login in clear text */
    password: string;
  },
  options?: { [key: string]: any },
) {
  return request<string>('/User/login', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Logs out current logged in User session GET /User/logout */
export async function logoutUser(options?: { [key: string]: any }) {
  return request<any>('/User/logout', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Get User by User name GET /User/${param0} */
export async function getUserByName(
  params: {
    // path
    /** The name that needs to be fetched. Use user1 for testing.  */
    username: string;
  },
  options?: { [key: string]: any },
) {
  const { username: param0 } = params;
  return request<API.User>(`/user/${param0}`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

/** Updated User This can only be done by the logged in User. PUT /User/${param0} */
export async function updateUser(
  params: {
    // path
    /** name that need to be updated */
    username: string;
  },
  body: API.User,
  options?: { [key: string]: any },
) {
  const { username: param0 } = params;
  return request<any>(`/user/${param0}`, {
    method: 'PUT',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** Delete User This can only be done by the logged in User. DELETE /User/${param0} */
export async function deleteUser(
  params: {
    // path
    /** The name that needs to be deleted */
    username: string;
  },
  options?: { [key: string]: any },
) {
  const { username: param0 } = params;
  return request<any>(`/user/${param0}`, {
    method: 'DELETE',
    params: { ...params },
    ...(options || {}),
  });
}
