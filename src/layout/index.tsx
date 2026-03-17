"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import PrivatLayout from './private-layout';

function CustomLayout({ children }: { children: React.ReactNode }) {
  
 const pathname = usePathname();
 const isPrivate = pathname.startsWith("/user") || pathname.startsWith("/admin");   
 if (!isPrivate) {
    return <>{children}</>;
 }

  return (
    <PrivatLayout>{children}</PrivatLayout>
  )
}

export default CustomLayout