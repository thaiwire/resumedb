import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

type AuthContextResult = {
  response: NextResponse;
  user: Awaited<ReturnType<ReturnType<typeof createServerClient>["auth"]["getUser"]>>["data"]["user"] | null;
  role: "admin" | "user" | null;
};

export const getProxyAuthContext = async (
  request: NextRequest,
): Promise<AuthContextResult> => {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        response = NextResponse.next({
          request,
        });

        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return {
      response,
      user: user ?? null,
      role: null,
    };
  }

  const { data: profile } = await supabase
    .from("user_profile")
    .select("role")
    .eq("email", user.email)
    .maybeSingle();

  const role = profile?.role === "admin" ? "admin" : "user";

  return {
    response,
    user,
    role,
  };
};
