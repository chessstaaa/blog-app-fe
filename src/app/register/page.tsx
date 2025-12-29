import { SignupForm } from "./components/signup-form";
import { GalleryVerticalEnd } from "lucide-react";

const Register = () => {
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
              OrganizerApp.
            </span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>

      {/* Sisi Kanan: Gambar (Nuansa Biru/Abstract yang berbeda sedikit dari Login) */}
      <div className="bg-muted relative hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1920&auto=format&fit=crop"
          alt="Register Background"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Register;
