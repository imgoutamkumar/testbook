import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/redux/services/authApi";
import { setCredentials } from "@/redux/slices/authSlice";

const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setServerError(null);
    try {
      const response = await login(values).unwrap();

      // Check if account requires email OTP verification
      if (response?.data?.action === "VERIFY_ACCOUNT") {
        navigate("/auth/otp", { state: { email: values.email } });
        return;
      }

      if (response.success && response.data.user) {
        const user = response.data.user;
        dispatch(setCredentials(user));

        // Route by role
        if (user.role === "ADMIN" || user.role === "SUPERADMIN") {
          navigate("/admin/new-exam");
        } else if (user.role === "CONTENT_CREATOR") {
          navigate("/creator/tests");
        } else {
          navigate("/"); // Student portal
        }
      }
    } catch (err: any) {
      console.error("Login Error:", err);
      setServerError(err?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-background px-4">
      <div className="flex flex-col justify-center w-full max-w-md z-20 bg-card p-8 rounded-xl border shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Sign In</h1>
          <p className="text-sm text-muted-foreground mt-1">Enter your credentials to access your mock tests</p>
        </div>

        {serverError && (
          <div className="mb-4 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="student@example.com"
              {...register("email")}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link to="/auth/forgot-password" className="text-xs text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>

          <Button className="w-full mt-2" disabled={isLoading} type="submit">
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="text-sm text-center text-muted-foreground mt-6">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-primary font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;