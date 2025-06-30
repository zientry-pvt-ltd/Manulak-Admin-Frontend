import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AppButton, AppInput } from "@/components";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/features/auth";
import { loginInputSchema } from "@/features/auth/schema";

type LoginFormProps = {
  onLoginSuccess: () => void;
  // eslint-disable-next-line no-unused-vars
  onLoginError?: (error: Error) => void;
};

const LoginForm = ({ onLoginSuccess, onLoginError }: LoginFormProps) => {
  const { handleLogin, isLoading } = useAuth();

  const form = useForm<z.infer<typeof loginInputSchema>>({
    resolver: zodResolver(loginInputSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginInputSchema>) => {
    console.log("LoginForm onSubmit", data);
    try {
      await handleLogin({ email: "arundeshan@gmail.com", password: "123321" });
      onLoginSuccess();
    } catch (error) {
      console.error("Login failed:", error);
      onLoginError?.(error as Error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <AppInput
          label="Username"
          size="md"
          type="text"
          placeholder="Username"
          startIcon={User}
          fullWidth
          error={form.formState.errors.userName?.message}
          {...form.register("userName")}
        />

        <AppInput
          label="Password"
          type="password"
          size="md"
          placeholder="••••••"
          startIcon={Lock}
          fullWidth
          error={form.formState.errors.password?.message}
          {...form.register("password")}
        />

        <AppButton
          type="submit"
          size="md"
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
