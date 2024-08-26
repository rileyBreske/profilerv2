import AuthButton from "../components/AuthButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PFV2Lg from "../components/PFV2-Lg";

export default async function Index() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <header className="container mx-auto flex h-20 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#" className="text-2xl font-bold" prefetch={false}>
          ProfilerV2
        </Link>
        <AuthButton />
      </header>
      <main className="flex-1 align-middle">
        <section className="container mx-auto flex max-w-5xl flex-col items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
          <PFV2Lg />
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">Simplify Athlete Readiness</h1>
          <p className="mt-6 text-lg text-muted-foreground">Streamline athlete to coach readiness metrics and improve coaching effectiveness.</p>
          <Link href="/protected">
            <Button className="mt-10">Get Started</Button>
          </Link>
        </section>
      </main>
      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Created by{" "}
          <a href="https://github.com/rileyBreske/profilerv2" target="_blank" className="font-bold hover:underline" rel="noreferrer">
            Riley Breske
          </a>
        </p>
      </footer>
    </div>
  );
}
