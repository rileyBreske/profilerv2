import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import { Questionnaire } from "@/components/Questionnaire";
import { redirect } from "next/navigation";
import PFV2 from "@/components/PFV2";
import Link from "next/link";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <div className="w-full bg-background">
        <nav className="w-full flex justify-between items-center border-b border-foreground/10 h-16 shadow-md px-5 sm:px-10">
          <a href="/" className="text-lg font-semibold text-primary">
            <PFV2 />
          </a>
          <div className="flex space-x-6">
            {/* <a href="#about" className="hover:text-secondary transition-colors duration-200">
              About
            </a>
            <a href="#programs" className="hover:text-secondary transition-colors duration-200">
              Programs
            </a>
            <a href="#contact" className="hover:text-secondary transition-colors duration-200">
              Contact
            </a> */}
          </div>
          <AuthButton />
        </nav>
      </div>

      <div className="w-full">
        <Questionnaire />
      </div>

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
