import React from 'react';
import { cn } from '@/shared/lib/cn';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'outline' | 'ghost';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "px-6 py-3 rounded-lg font-medium transition-colors duration-300 relative overflow-hidden",
          {
            'bg-white text-black hover:bg-white/90': variant === 'primary',
            'border border-white/20 hover:bg-white/10 text-white': variant === 'outline',
            'text-white/60 hover:text-white': variant === 'ghost',
          },
          className
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
