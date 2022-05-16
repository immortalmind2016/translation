import config from "../config";
import { EmailTemplateArgs } from "../types";

export const emailTemplate = ({
  subject,
  to,
  text,
  attachments,
}: EmailTemplateArgs) => ({
  from: config.email,
  to,
  subject,
  text,
  attachments,
});
export const translationDataEmail = (
  input: Omit<EmailTemplateArgs, "subject">
) =>
  emailTemplate({
    ...input,
    subject: "Translation Data | Lengoo",
    text: "Check the follow attachment which contains your translated data",
  });
