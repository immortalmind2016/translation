import transporter from "../config/emailConfig";
import { translationDataEmail } from "../templates/emailTemplate";
import { Language, SimilarityAlgorithm } from "../types";

export const getTranslatedSubtitles = (
  results: SimilarityAlgorithm[]
): string => {
  const translatedSubTitles = results.map((result) => {
    let message = ``;
    if (result.similar?.length === 0) {
      message = result.message;
    } else {
      message = result.similar[0].data.translations[Language.de];
    }
    return `${result.index} ${result.time} ${message}`;
  });
  return translatedSubTitles.join("\n");
};

export const sendSubtitlesEmail = async (translatedSubtitles, email) => {
  return transporter.sendMail(
    translationDataEmail({
      to: email,
      attachments: translatedSubtitles.map((translatedSubtitle) => ({
        content: translatedSubtitle.textData,
        filename: translatedSubtitle.fileName,
      })),
    })
  );
};
