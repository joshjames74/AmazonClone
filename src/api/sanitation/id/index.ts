export function sanitizeId(id: number): number {
  if (typeof id !== "number") {
    throw new Error("Id is not a number");
  }
  if (id > 10000) {
    throw new Error("Id is too large");
  }
  if (id < 0) {
    throw new Error("Id is not a positive number");
  }
  if (id % 1 !== 0) {
    throw new Error("Id is not an integer");
  }
  return id;
}
