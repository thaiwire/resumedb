"use server";

import { createSupabaseServerClient } from "@/config/supabase-server-config";
import { IUser } from "@/interfaces";
import { revalidatePath } from "next/cache";

type LoginSuccessResult = {
  success: true;
  message: string;
  role: IUser["role"];
  redirectPath: string;
};

type LoginErrorResult = {
  success: false;
  error: string;
};

type LoginActionResult = LoginSuccessResult | LoginErrorResult;

type LogoutActionResult =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      error: string;
    };

export const registerUser = async (payload : Partial<IUser>) => {
    try {
      const supabase = await createSupabaseServerClient();
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: payload.email!,
        password: payload.password!,
        options: {
          data: {
            name: payload.name || null,
          },
        },
      });
      if (authError) {
        throw new Error(authError.message);
      }

      if (!authData.user) {
        throw new Error("Unable to create user account.");
      }
      
        const { error } = await supabase.from("user_profile").insert({
            email : payload.email!,
            name : payload.name || null,
            role : "user"
        })
        if(error) {
            throw new Error(error.message);
        }
        return {
            success : true,
            message : 'User registered successfully!'
        }


     

    } catch (error) {
       return {
        success : false,
        error : (error as Error).message
       } 
    }
}

export const loginUser = async (payload: Partial<IUser>): Promise<LoginActionResult> => {
  try {
    const supabase = await createSupabaseServerClient();

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: payload.email!,
      password: payload.password!,
    });

    if (authError) {
      throw new Error(authError.message);
    }

    if (!authData.user) {
      throw new Error("Unable to log in user account.");
    }

    const { data: profile, error: profileError } = await supabase
      .from("user_profile")
      .select("role")
      .eq("email", payload.email!)
      .maybeSingle();

    if (profileError) {
      throw new Error(profileError.message);
    }

    if (!profile?.role) {
      throw new Error("User role is missing. Please contact support.");
    }

    const role = profile.role as IUser["role"];

    if (payload.role && payload.role !== role) {
      await supabase.auth.signOut();
      throw new Error(`This account does not have ${payload.role} access.`);
    }

    return {
      success: true,
      message: "Login successful!",
      role,
      redirectPath: role === "admin" ? "/admin/dashboard" : "/user/template",
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
    };
  }
};
  
export const getLoggedInUser = async () => {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError) {
      throw new Error(authError.message);
    }
    if (!user) {
      return null;
    }
    const { data: profileData, error: profileError } = await supabase
      .from("user_profile")
      .select("id, email, name, role")
      .eq("email", user.email!)
      .single();

    if (profileError) {
      throw new Error(profileError.message);
    }
    
    return {
       success: true,
       data : profileData
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
    }
  }
}

export const logoutUser = async (): Promise<LogoutActionResult> => {
  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/");
    revalidatePath("/login");
    revalidatePath("/user/template");
    revalidatePath("/admin/dashboard");

    return {
      success: true,
      message: "Logout successful!",
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
    };
  }
};

