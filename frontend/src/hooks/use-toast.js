import toast from "react-hot-toast";

// Custom hook wrapper around react-hot-toast
export function useToast() {
  return {
    toast: ({ title, description, variant }) => {
      if (variant === "destructive") {
        toast.error(`${title}: ${description}`);
      } else {
        toast.success(`${title}: ${description}`);
      }
    },
  };
}
