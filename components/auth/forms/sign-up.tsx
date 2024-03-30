"use client";

import React, { useState, useTransition } from "react";

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sign_up_schema as formSchema } from "@/schema/auth-schema";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormItem,
  FormField,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeOff, Eye } from "lucide-react";
import { signUp } from "@/actions/sign-up";

export const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_name: "",
      email: "",
      password: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const togglePassword = () => setShowPassword(!showPassword);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(() => {
      signUp(values).then((data) => {
        if (data.success) return toast.success(data.success);
        if (data.error) return toast.error(data.error);
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="user_name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="username" autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="email" autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="w-full flex items-center justify-center relative">
                  <Input
                    placeholder="password"
                    autoComplete="off"
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />
                  {showPassword ? (
                    <Eye
                      size={20}
                      className="text-neutral-500 absolute right-2"
                      role="button"
                      onClick={togglePassword}
                    />
                  ) : (
                    <EyeOff
                      size={20}
                      className="text-neutral-500 absolute right-2"
                      role="button"
                      onClick={togglePassword}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          variant={"default"}
          disabled={!isValid || isSubmitting || isPending}
        >
          SignUp
        </Button>
      </form>
    </Form>
  );
};
