import { TranslationRepository } from "../translation/translation.repository";
import { backofficeRepository } from "./backoffice.repository";

const changeStatus = (id, status) =>
  backofficeRepository.changeStatus(id, status);
const listTranslations = () => TranslationRepository.list();

export const backofficeService = {
  changeStatus,
  listTranslations,
};
