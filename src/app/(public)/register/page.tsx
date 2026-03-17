"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { registerUser } from "@/actions/users"
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

const registerSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters.")
    .max(60, "Full name must be less than 60 characters."),
  email: z.email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(100, "Password must be less than 100 characters."),
})

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  })

  const loading = form.formState.isSubmitting

  async function onSubmit(data: RegisterFormValues) {
    const result = await registerUser({
      email: data.email,
      password: data.password,
      name: data.fullName,
    })

    if (!result.success) {
      toast.error(result.error || "Unable to register user.")
      return
    }

    toast.success(result.message)
    form.reset()
    router.push("/login")
  }

  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-6 sm:px-6 sm:py-8">
      <section className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-5xl items-center justify-center sm:min-h-[calc(100vh-4rem)]">
        <div className="min-h-screen max-w-[540px] rounded-xl border border-zinc-300 bg-zinc-100 px-7 py-9 shadow-lg shadow-zinc-900/10 sm:px-10 sm:py-11">
          <h1 className="text-center text-4xl leading-none font-bold tracking-tight text-zinc-900">Create Account</h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-9 space-y-7" noValidate>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-2xl leading-none font-semibold text-zinc-800">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        autoComplete="name"
                        className="h-[52px] rounded-md border-zinc-300 bg-zinc-100 px-4 text-lg placeholder:text-zinc-500"
                        {...field}
                      />
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
                        autoComplete="new-password"
                        className="h-[45px] rounded-md border-zinc-300 bg-zinc-100 px-4 text-lg placeholder:text-zinc-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="h-[45px] w-full rounded-md bg-emerald-900 text-xl font-medium text-white hover:bg-emerald-800"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Account"}
              </Button>
            </form>
          </Form>

          <p className="mt-9 text-center text-2xl text-zinc-600">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-emerald-900 hover:text-emerald-800">
              Login here
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