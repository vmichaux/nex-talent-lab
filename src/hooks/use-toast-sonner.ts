
import { toast as sonnerToast } from 'sonner';

// Re-export Sonner toast with consistent configuration
export const toast = {
  // Standard toast
  info: (title: string, options?: { description?: string }) => {
    return sonnerToast(title, {
      description: options?.description,
      duration: 6000,
    });
  },
  
  // Success toast
  success: (title: string, options?: { description?: string }) => {
    return sonnerToast.success(title, {
      description: options?.description,
      duration: 6000,
    });
  },
  
  // Error toast
  error: (title: string, options?: { description?: string }) => {
    return sonnerToast.error(title, {
      description: options?.description,
      duration: 6000,
    });
  },
  
  // Warning toast
  warning: (title: string, options?: { description?: string }) => {
    return sonnerToast.warning(title, {
      description: options?.description,
      duration: 6000,
    });
  },

  // Custom toast for compatibility with existing code
  custom: (options: { title: string, description?: string, variant?: 'default' | 'destructive' }) => {
    if (options.variant === 'destructive') {
      return sonnerToast.error(options.title, {
        description: options.description,
        duration: 6000,
      });
    }
    return sonnerToast(options.title, {
      description: options.description,
      duration: 6000,
    });
  }
};

// For backward compatibility with code that uses useToast
export const useToast = () => {
  return {
    toast: {
      // Standard toast function (mimicking the Shadcn API)
      (options: { title: string, description?: string, variant?: 'default' | 'destructive' }) {
        return toast.custom(options);
      },
      // Helper methods
      ...toast
    }
  };
};
