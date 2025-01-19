import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/auth";

import AuthForm from "@/components/auth/form";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect("/");
  return (
    <section className="flex fixed top-0 right-0 left-0 h-screen w-screen overflow-hidden flex-col items-center justify-center bg-background/20 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 rounded-lg border p-6 shadow-sm md:p-12 mt-12 bg-muted">
        <Image
          className="mb-8 dark:invert"
          src="/icon.svg"
          alt="logo"
          width={50}
          height={72}
        ></Image>
        <p className="text-center text-xl">Welcome to router.so</p>
        <p className="text-center text-muted-foreground">
          Login to access your account.
        </p>
        <div className="flex flex-col items-center w-full gap-2">
          <AuthForm />
        </div>
      </div>
    </section>
  );
}
