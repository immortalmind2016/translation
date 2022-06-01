export const errorsText = (err) =>
  err.details.map((detail) => detail.message).join(",");
