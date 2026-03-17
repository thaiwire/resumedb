"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { loginUser } from "@/actions/users"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const loginSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(100, "Password must be less than 100 characters."),
  role: z.enum(["user", "admin"]),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      role: "user",
    },
  })

  const loading = form.formState.isSubmitting

  async function onSubmit(data: LoginFormValues) {
    const result = await loginUser({
      email: data.email,
      password: data.password,
      role: data.role,
    })

    if (!result.success) {
      toast.error(result.error || "Unable to login user.")
      return
    }

    toast.success(result.message)
    form.reset()
    router.push(result.redirectPath)
  }

  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-6 sm:px-6 sm:py-8">
      <section className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-5xl items-center justify-center sm:min-h-[calc(100vh-4rem)]">
        <div className="w-full max-w-[540px] rounded-xl border border-zinc-300 bg-zinc-100 px-7 py-9 shadow-lg shadow-zinc-900/10 sm:px-10 sm:py-11">
          <h1 className="text-center text-4xl leading-none font-bold tracking-tight text-zinc-900">Login</h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-9 space-y-7" noValidate>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-2xl leading-none font-semibold text-zinc-800">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        autoComplete="email"
                        className="h-[45px] rounded-md border-zinc-300 bg-zinc-100 px-4 text-lg placeholder:text-zinc-500"
                        {...field}
                      />
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
                    <FormLabel className="text-2xl leading-none font-semibold text-zinc-800">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="........"
                        autoComplete="current-password"
                        className="h-[45px] rounded-md border-zinc-300 bg-zinc-100 px-4 text-lg placeholder:text-zinc-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="select">
                    <FormLabel className="text-2xl leading-none font-semibold text-zinc-800">Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-[45px] w-full rounded-md border-zinc-300 bg-zinc-100 px-4 text-lg">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="user">user</SelectItem>
                        <SelectItem value="admin">admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="h-[45px] w-full rounded-md bg-emerald-900 text-xl font-medium text-white hover:bg-emerald-800"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>

          <p className="mt-9 text-center text-2xl text-zinc-600">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-emerald-900 hover:text-emerald-800">
              Register here
            </Link>
          </p>

          <p className="mt-6 text-center text-2xl">
            <Link href="/" className="text-zinc-600 hover:text-zinc-800">
              ← Back to home
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}