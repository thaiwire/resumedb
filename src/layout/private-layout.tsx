"use client";

import { getLoggedInUser } from "@/actions/users";
import FullPageLoader from "@/components/ui/full-page-loader";
import { useUserStore } from "@/store/users-store";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import PrivateHeader from "./private-header";

function PrivatLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { setUser, setUserLoading, isUserLoading } = useUserStore();

  useEffect(() => {
    let isMounted = true;

    const loadLoggedInUser = async () => {
      setUserLoading(true);
      const result = await getLoggedInUser();

      if (!isMounted) {
        return;
      }

      if (!result || !result.success) {
        setUser(null);
        setUserLoading(false);
        router.replace("/login");
        return;
      }

      const role = result.data?.role;
      const isAdminRoute = pathname.startsWith("/admin");

      if (isAdminRoute && role !== "admin") {
        setUser(result.data ?? null);
        setUserLoading(false);
        router.replace("/user/template");
        return;
      }

      setUser(result.data ?? null);
      setUserLoading(false);
    };

    loadLoggedInUser();

    return () => {
      isMounted = false;
    };
  }, [pathname, router, setUser, setUserLoading]);

  if (isUserLoading) {
    return <FullPageLoader message="Loading your account..." />;
  }

  return (
    <div>
      <PrivateHeader />
      <div className="p-5">{children}</div>
    </div>
  );
}

export default PrivatLayout;
