import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, code: string) => {
  await resend.emails.send({
    from: "lucia-auth@thxran.in",
    to: email,
    subject: "Verifiy your email",
    html: `<p>use this code: ${code} to verifiy your email.</p>`,
  });
};
