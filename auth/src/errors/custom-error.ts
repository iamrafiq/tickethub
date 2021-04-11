export abstract class CustomError extends Error {
  abstract statusCode: number;
  constructor(message: string) {
    super(message); // if we pass any string to super this will print server log of error object, because this class extends error
    // Only because we are extending a build in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  // serializeErrors is a abstarct function which return a array of objects and each object has message and field property
  //field?: string  -> in here  ? means optional, means this property is optional
  abstract serializeErrors(): { message: string; field?: string }[];
}
