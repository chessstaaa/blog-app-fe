import { toast as sonnerToast } from "sonner";

interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
}

export function useToast() {
  const toast = (props: ToastProps) => {
    const { title, description, variant = "default", duration = 5000 } = props;

    if (variant === "destructive") {
      sonnerToast.error(description || title, {
        description: title ? description : undefined,
        duration,
      });
    } else {
      sonnerToast.success(description || title, {
        description: title ? description : undefined,
        duration,
      });
    }
  };

  return { toast };
}
