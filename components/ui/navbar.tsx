import React from "react";

function navbar() {
  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <div className="w-full bg-background">
        <nav className="w-full flex justify-between items-center border-b border-foreground/10 h-16 shadow-md px-5 sm:px-10">
          <a href="/" className="text-lg font-semibold text-primary">
            ProfilerV2
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
  );
}

export default navbar;
