import { TextModel } from "../model/translate.model";
import { RequestWithData } from "../types";
import { updateStatusSchema } from "../utils/validator";

export const changeStatus = async (req: RequestWithData, res) => {
  const body = req.body;
  const result = updateStatusSchema.validate(body);
  const { error } = result;

  if (!!error) {
    return res.status(422).json({
      error: "Invalid Input",
    });
  }
  res.json({
    data: await TextModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { status: body.status } },
      { new: true }
    ),
  });
};
export const listStoredTranslations = async (req, res) => {
  res.json({ data: await TextModel.find() });
};
