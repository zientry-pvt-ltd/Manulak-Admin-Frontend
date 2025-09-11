import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AppButton, AppInput, Form } from "@/components";
import { loginInputSchema } from "@/features/auth/schema";
import { useLoginMutation } from "@/services/auth";
import type { NormalizedAPIError } from "@/types";
import { normalizeError } from "@/utils/error-handler";

type LoginFormProps = {
  onLoginSuccess: () => void;
  // eslint-disable-next-line no-unused-vars
  onLoginError?: (error: NormalizedAPIError) => void;
};

const LoginForm = ({ onLoginSuccess, onLoginError }: LoginFormProps) => {
  const [login, { isLoading }] = useLoginMutation();

  const form = useForm<z.infer<typeof loginInputSchema>>({
    resolver: zodResolver(loginInputSchema),
    defaultValues: {
      user_name: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginInputSchema>) => {
    try {
      await login(data).unwrap();
      onLoginSuccess();
    } catch (error) {
      const message = normalizeError(error);
      onLoginError?.(message);
      console.error("Login failed:", message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <AppInput
          label="Username"
          type="text"
          placeholder="Username"
          startIcon={User}
          fullWidth
          error={form.formState.errors.user_name?.message}
          {...form.register("user_name")}
        />

        <AppInput
          label="Password"
          type="password"
          placeholder="••••••"
          startIcon={Lock}
          fullWidth
          error={form.formState.errors.password?.message}
          {...form.register("password")}
        />

        <AppButton
          type="submit"
          className="mt-6"
          fullWidth
          isLoading={isLoading}
        >
          Login
        </AppButton>
      </form>
    </Form>
  );
};

export default LoginForm;
