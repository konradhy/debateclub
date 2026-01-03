import Resend from "@auth/core/providers/resend";
import { Resend as ResendAPI } from "resend";
import { alphabet, generateRandomString } from "oslo/crypto";
import { VerificationCodeEmail } from "./VerificationCodeEmail";
import { AUTH_EMAIL, AUTH_RESEND_KEY } from "@cvx/env";

export const ResendPasswordReset = Resend({
  id: "resend-password-reset",
  apiKey: AUTH_RESEND_KEY,
  maxAge: 60 * 20, // 20 minutes
  async generateVerificationToken() {
    return generateRandomString(8, alphabet("0-9"));
  },
  async sendVerificationRequest({
    identifier: email,
    provider,
    token,
    expires,
  }) {
    const resend = new ResendAPI(provider.apiKey);
    const { error } = await resend.emails.send({
      from: AUTH_EMAIL ?? "DebateClub <noreply@updates.midassuite.com>",
      to: [email],
      subject: `Reset your DebateClub password`,
      react: VerificationCodeEmail({
        code: token,
        expires,
        purpose: "password reset"
      }),
    });

    if (error) {
      throw new Error(JSON.stringify(error));
    }
  },
});
