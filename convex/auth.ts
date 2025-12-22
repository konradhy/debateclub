import { convexAuth } from "@convex-dev/auth/server";
import GitHub from "@auth/core/providers/github";
import { Password } from "@convex-dev/auth/providers/Password";
import { ResendOTP } from "./otp/ResendOTP";
import { ResendPasswordReset } from "./otp/ResendPasswordReset";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [
    Password({
      reset: ResendPasswordReset,
      verify: ResendOTP,
    }),
    GitHub({
      authorization: {
        params: { scope: "user:email" },
      },
    }),
  ],
});
