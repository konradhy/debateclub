import { createFileRoute } from "@tanstack/react-router";
import { Upload } from "lucide-react";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { useDoubleCheck } from "@/ui/use-double-check";
import { Input } from "@/ui/input";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { api } from "~/convex/_generated/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import * as validators from "@/utils/validators";
import { useSignOut } from "@/utils/misc";

// Color constants matching dashboard
const colors = {
  background: "#F5F3EF",
  cardBg: "#FAFAF8",
  border: "#E8E4DA",
  primary: "#3C4A32",
  primaryLight: "#5C6B4A",
  text: "#2A2A20",
  textMuted: "#5C5C54",
  textLight: "#888880",
};

export const Route = createFileRoute("/_app/_auth/dashboard/_layout/settings/")(
  {
    component: DashboardSettings,
    beforeLoad: () => ({
      title: "Settings",
      headerTitle: "Settings",
      headerDescription: "Manage your account settings.",
    }),
  },
);

export default function DashboardSettings() {
  const { data: user } = useQuery(convexQuery(api.app.getCurrentUser, {}));
  const signOut = useSignOut();
  const { mutateAsync: updateUsername } = useMutation({
    mutationFn: useConvexMutation(api.app.updateUsername),
  });
  const { mutateAsync: updateUserImage } = useMutation({
    mutationFn: useConvexMutation(api.app.updateUserImage),
  });
  const { mutateAsync: removeUserImage } = useMutation({
    mutationFn: useConvexMutation(api.app.removeUserImage),
  });
  const { mutateAsync: deleteCurrentUserAccount } = useMutation({
    mutationFn: useConvexMutation(api.app.deleteCurrentUserAccount),
  });
  const generateUploadUrl = useConvexMutation(api.app.generateUploadUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { startUpload } = useUploadFiles(generateUploadUrl, {
    onUploadComplete: async (uploaded) => {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      await updateUserImage({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        imageId: (uploaded[0].response as any).storageId,
      });
    },
  });
  const { doubleCheck, getButtonProps } = useDoubleCheck();

  const usernameForm = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      username: user?.username,
    },
    onSubmit: async ({ value }) => {
      await updateUsername({ username: value.username || "" });
    },
  });

  const handleDeleteAccount = async () => {
    await deleteCurrentUserAccount({});
    signOut();
  };

  if (!user) {
    return null;
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colors.background }}
    >
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8">
          <h1
            className="text-3xl font-bold"
            style={{ color: colors.text, fontFamily: "Georgia, serif" }}
          >
            Settings
          </h1>
          <p className="mt-1" style={{ color: colors.textMuted }}>
            Manage your account settings
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {/* Avatar */}
          <div
            className="rounded-xl border-2"
            style={{
              borderColor: colors.border,
              backgroundColor: colors.cardBg,
            }}
          >
            <div className="flex w-full items-start justify-between p-6">
              <div className="flex flex-col gap-2">
                <h2
                  className="text-xl font-semibold"
                  style={{ color: colors.text }}
                >
                  Your Avatar
                </h2>
                <p className="text-sm" style={{ color: colors.textMuted }}>
                  This is your avatar. It will be displayed on your profile.
                </p>
              </div>
              <label
                htmlFor="avatar_field"
                className="group relative flex cursor-pointer overflow-hidden rounded-full transition active:scale-95"
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    className="h-20 w-20 rounded-full object-cover"
                    alt={user.username ?? user.email}
                  />
                ) : (
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-lime-400 from-10% via-cyan-300 to-blue-500" />
                )}
                <div
                  className="absolute z-10 hidden h-full w-full items-center justify-center group-hover:flex"
                  style={{ backgroundColor: `${colors.primary}66` }}
                >
                  <Upload className="h-6 w-6 text-white" />
                </div>
              </label>
              <input
                ref={fileInputRef}
                id="avatar_field"
                type="file"
                accept="image/*"
                className="peer sr-only"
                required
                tabIndex={user ? -1 : 0}
                onChange={async (event) => {
                  if (!event.target.files) {
                    return;
                  }
                  const files = Array.from(event.target.files);
                  if (files.length === 0) {
                    return;
                  }
                  startUpload(files);
                }}
              />
            </div>
            <div
              className="flex min-h-14 w-full items-center justify-between rounded-b-xl border-t-2 px-6 py-3"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.background,
              }}
            >
              <p className="text-sm" style={{ color: colors.textMuted }}>
                Click on the avatar to upload a custom one from your files.
              </p>
              {user.avatarUrl && (
                <button
                  type="button"
                  className="rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all hover:shadow-sm"
                  style={{
                    borderColor: colors.border,
                    color: colors.text,
                    backgroundColor: colors.cardBg,
                  }}
                  onClick={() => {
                    removeUserImage({});
                  }}
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Username */}
          <form
            className="rounded-xl border-2"
            style={{
              borderColor: colors.border,
              backgroundColor: colors.cardBg,
            }}
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              usernameForm.handleSubmit();
            }}
          >
            <div className="flex w-full flex-col gap-4 p-6">
              <div className="flex flex-col gap-2">
                <h2
                  className="text-xl font-semibold"
                  style={{ color: colors.text }}
                >
                  Your Username
                </h2>
                <p className="text-sm" style={{ color: colors.textMuted }}>
                  This is your username. It will be displayed on your profile.
                </p>
              </div>
              <usernameForm.Field
                name="username"
                validators={{
                  onSubmit: validators.username,
                }}
                children={(field) => (
                  <Input
                    placeholder="Username"
                    autoComplete="off"
                    required
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={`w-80 bg-transparent ${field.state.meta?.errors.length > 0 &&
                      "border-red-500 focus-visible:ring-red-500"
                      }`}
                  />
                )}
              />
              {usernameForm.state.fieldMeta.username?.errors.length > 0 && (
                <p className="text-sm text-red-600">
                  {usernameForm.state.fieldMeta.username?.errors.join(" ")}
                </p>
              )}
            </div>
            <div
              className="flex min-h-14 w-full items-center justify-between rounded-b-xl border-t-2 px-6 py-3"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.background,
              }}
            >
              <p className="text-sm" style={{ color: colors.textMuted }}>
                Please use 32 characters at maximum.
              </p>
              <button
                type="submit"
                className="rounded-lg px-5 py-2 text-sm font-medium text-white transition-all hover:brightness-110"
                style={{ backgroundColor: colors.primary }}
              >
                Save
              </button>
            </div>
          </form>

          {/* Delete Account */}
          <div
            className="rounded-xl border-2"
            style={{
              borderColor: "#dc2626",
              backgroundColor: colors.cardBg,
            }}
          >
            <div className="flex flex-col gap-2 p-6">
              <h2
                className="text-xl font-semibold"
                style={{ color: colors.text }}
              >
                Delete Account
              </h2>
              <p className="text-sm" style={{ color: colors.textMuted }}>
                Permanently delete your account, all of your sessions, and their
                respective data.
              </p>
            </div>
            <div
              className="flex min-h-14 w-full items-center justify-between rounded-b-xl border-t-2 px-6 py-3"
              style={{
                borderColor: "#dc2626",
                backgroundColor: "#fee2e2",
              }}
            >
              <p className="text-sm" style={{ color: colors.textMuted }}>
                This action cannot be undone, proceed with caution.
              </p>
              <button
                className="rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-red-700"
                {...getButtonProps({
                  onClick: doubleCheck ? handleDeleteAccount : undefined,
                })}
              >
                {doubleCheck ? "Are you sure?" : "Delete Account"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
