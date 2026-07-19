declare module "react-google-recaptcha" {
  import * as React from "react";

  export type ReCAPTCHAProps = {
    sitekey: string;
    theme?: "light" | "dark" | string;
    onChange?: (token: string | null) => void;
    onExpired?: () => void;
    [key: string]: unknown;
  };

  // Minimal instance API used by this project.
  export type ReCAPTCHAInstance = {
    getValue(): string | null;
    reset(): void;
  };

  const ReCAPTCHA: React.ComponentClass<ReCAPTCHAProps> & {
    prototype: ReCAPTCHAInstance;
  };

  export default ReCAPTCHA;
}



