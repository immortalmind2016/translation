import transporter from "../../../config/emailConfig";
import { translationDataEmail } from "../../../templates/emailTemplate";
import { SimilarityAlgorithm } from "../../../types";
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const getTranslatedSubtitles = (
  results: SimilarityAlgorithm[],
  toLanguage: string
): string => {
  const translatedSubTitles = results.map((result) => {
    let message = ``;
    if (
      result.similar?.length === 0 ||
      !result.similar[0]?.data.translations[toLanguage]
    ) {
      message = result.message;
    } else {
      message = result.similar[0].data.translations[toLanguage];
    }
    return `${result.index} ${result.time} ${message}`;
  });
  return translatedSubTitles.join("\n");
};

export const sendSubtitlesEmail = async (translatedSubtitles, email) => {
  const emailMsg = translationDataEmail({
    to: email,
    attachments: translatedSubtitles.map((translatedSubtitle) => ({
      content: translatedSubtitle.textData,
      filename: translatedSubtitle.fileName,
    })),
  });
  return sgMail.send(emailMsg);
};
