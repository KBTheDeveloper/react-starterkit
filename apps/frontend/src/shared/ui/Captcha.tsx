import { useRef } from "react";

import ReCAPTCHA from "react-google-recaptcha";

interface CaptchaProps {
  onChange: (token: string | null) => void;
}

const Captcha = ({ onChange }: CaptchaProps) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    console.warn("reCAPTCHA site key not set");
    return null;
  }

  return <ReCAPTCHA ref={recaptchaRef} sitekey={siteKey} onChange={onChange} />;
};

export default Captcha;
