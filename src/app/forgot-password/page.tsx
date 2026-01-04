import { ForgotPasswordForm } from "./components/forgot-password-form";
import { GalleryVerticalEnd } from "lucide-react";

const ForgotPassword = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Sisi Kiri: Form & Logo */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-white">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <span className="font-bold text-blue-900 dark:text-blue-400">
              LOKET CO
            </span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <ForgotPasswordForm />
          </div>
        </div>
      </div>

      {/* Sisi Kanan: Gambar Security/Lock */}
      <div className="bg-muted relative hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1920&auto=format&fit=crop"
          alt="Forgot Password Background"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
