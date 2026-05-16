import ReCAPTCHA from 'react-google-recaptcha';
import { useRef } from 'react';

interface CaptchaProps {
    onChange: (token: string | null) => void;
}

export const Captcha = ({ onChange }: CaptchaProps) => {
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

    if (!siteKey) {
        console.warn('reCAPTCHA site key not set');
        return null;
    }

    return (
        <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={siteKey}
            onChange={onChange}
        />
    );
};
