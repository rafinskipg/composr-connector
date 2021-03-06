import * as jwt from './jwt';
export * from './events';

export function buildURI(urlBase) {
  return urlBase.replace('{{module}}', 'composr');
}

export function checkStatus(response) {
  if (response.ok) {
    return response.json().catch(() => response);
  }

  let error = new Error(response.statusText);
  error.status = response.status;
  error.response = response;
  throw error;

}

export function generateUUID() {
  let d = new Date().getTime();
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

export {
  jwt
 };
