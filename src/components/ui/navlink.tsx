import * as React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";
import { VariantProps } from "class-variance-authority";

type ButtonVariants = VariantProps<typeof buttonVariants>;

export interface NavLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    ButtonVariants {
  asChild?: boolean;
  to: string;
}

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, variant, size, asChild = false, to, ...props }, ref) => {
    const Comp = asChild ? Slot : RouterNavLink;
    return (
      <Comp
        to={to}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
NavLink.displayName = "NavLink";

export { NavLink };
