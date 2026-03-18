"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { updatePersonalInfo } from "@/actions/users";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/users-store";

const optionalUrlSchema = z
  .string()
  .trim()
  .refine(
    (value) => value === "" || z.url().safeParse(value).success,
    "Please enter a valid URL."
  );

const personalInfoSchema = z.object({
  fullname: z.string().trim().min(2, "Full name must be at least 2 characters."),
  email: z.email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(7, "Phone number must be at least 7 characters.")
    .max(20, "Phone number must be less than 20 characters."),
  professionalTitle: z
    .string()
    .trim()
    .min(2, "Professional title must be at least 2 characters."),
  address: z.string().trim().min(5, "Address must be at least 5 characters."),
  linkedInUrl: optionalUrlSchema,
  githubUrl: optionalUrlSchema,
  summary: z
    .string()
    .trim()
    .min(20, "Summary must be at least 20 characters.")
    .max(1000, "Summary must be less than 1000 characters."),
});

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;

const inputStyles =
  "h-[58px] rounded-lg border-zinc-200 bg-white px-4 text-[1.05rem] placeholder:text-zinc-500 focus-visible:border-zinc-400 focus-visible:ring-zinc-300";

const labelStyles = "text-[1.03rem] leading-none font-semibold text-zinc-900";

export function PersonalInfoTab() {
  const { user } = useUserStore();
  const existingPersonalInfo = user?.resume_data?.personal_info;

  const form = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    mode: "onChange",
    defaultValues: {
      fullname: existingPersonalInfo?.fullname ?? "",
      email: existingPersonalInfo?.email ?? user?.email ?? "",
      phone: existingPersonalInfo?.phone ?? "",
      professionalTitle: existingPersonalInfo?.professionalTitle ?? "",
      address: existingPersonalInfo?.address ?? "",
      linkedInUrl: existingPersonalInfo?.linkedInUrl ?? "",
      githubUrl: existingPersonalInfo?.githubUrl ?? "",
      summary: existingPersonalInfo?.summary ?? "",
    },
  });

  const loading = form.formState.isSubmitting;

  async function onSubmit(data: PersonalInfoFormValues) {
    const result = await updatePersonalInfo(data);

    if (!result.success) {
      toast.error(result.error || "Unable to update personal information.");
      return;
    }

    toast.success(result.message);
  }

  return (
    <div className="pt-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
          <div className="grid grid-cols-1 gap-x-5 gap-y-6 md:grid-cols-3">
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelStyles}>Full Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="John Doe" className={inputStyles} {...field} />
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
                  <FormLabel className={labelStyles}>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" className={inputStyles} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelStyles}>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+1 (555) 123-4567" className={inputStyles} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="professionalTitle"
              render={({ field }) => (
                <FormItem className="md:col-span-3">
                  <FormLabel className={labelStyles}>Professional Title</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="e.g., Senior Software Engineer"
                      className={inputStyles}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="md:col-span-3">
                  <FormLabel className={labelStyles}>Address</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="City, State, Country" className={inputStyles} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem className="md:col-span-3">
                  <FormLabel className={labelStyles}>Professional Summary</FormLabel>
                  <FormControl>
                    <textarea
                      placeholder="Write a brief summary about yourself..."
                      className="min-h-32 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-[1.05rem] text-zinc-900 placeholder:text-zinc-500 focus-visible:border-zinc-400 focus-visible:ring-[3px] focus-visible:ring-zinc-300 focus-visible:outline-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedInUrl"
              render={({ field }) => (
                <FormItem className="md:col-span-3">
                  <FormLabel className={labelStyles}>LinkedIn URL (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      className={inputStyles}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="githubUrl"
              render={({ field }) => (
                <FormItem className="md:col-span-3">
                  <FormLabel className={labelStyles}>GitHub URL (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://github.com/yourprofile"
                      className={inputStyles}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              className="h-[52px] rounded-lg bg-emerald-900 px-8 text-base font-medium text-white hover:bg-emerald-800"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
