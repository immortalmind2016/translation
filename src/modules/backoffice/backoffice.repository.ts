import { TextModel } from "../translation/translation.model";

const changeStatus = (id, status) =>
  TextModel.findOneAndUpdate({ _id: id }, { $set: { status } }, { new: true });

export const backofficeRepository = {
  changeStatus,
};
