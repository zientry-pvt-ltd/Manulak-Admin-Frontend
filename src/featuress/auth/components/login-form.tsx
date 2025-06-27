import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { AppButton, AppInput } from "@/components";
import { Form } from "@/components/ui/form";
import { loginInputSchema } from "@/featuress/auth/schema";

const LoginForm = () => {
  const form = useForm<z.infer<typeof loginInputSchema>>({
    resolver: zodResolver(loginInputSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof loginInputSchema>) => {
    console.log(data);
    toast.success("Event has been created");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <AppInput
          label="Username"
          size="sm"
          type="text"
          placeholder="Username"
          startIcon={User}
          error={form.formState.errors.userName?.message}
          {...form.register("userName")}
        />

        <AppInput
          label="Password"
          type="password"
          size="sm"
          placeholder="••••••"
          startIcon={Lock}
          error={form.formState.errors.password?.message}
          {...form.register("password")}
        />

        <AppButton type="submit" size="sm" className="mt-4">
          Login
        </AppButton>
      </form>
    </Form>
  );
};

export default LoginForm;
