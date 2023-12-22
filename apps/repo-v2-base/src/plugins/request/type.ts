/** HTTP Result enum */
export enum HttpResponseCode {
  SUCCESS = 200,

  NOT_LOGIN = 401,

  NOT_PERMISSION = 403,

  NOT_FOUND = 404,

  SERVER_ERROR = 500,
}

export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
