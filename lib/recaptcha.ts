const VERIFY_URL =
  "https://www.google.com/recaptcha/api/siteverify";

export async function verifyRecaptcha(token: string) {
  if (!token) {
    throw new Error("Missing reCAPTCHA token.");
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY!;

  const formData = new URLSearchParams();

  formData.append("secret", secret);
  formData.append("response", token);

  const response = await fetch(VERIFY_URL, {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error("reCAPTCHA verification failed.");
  }

  if (result.score < 0.5) {
    throw new Error("Suspicious activity detected.");
  }

  if (result.action !== "login") {
    throw new Error("Invalid reCAPTCHA action.");
  }

  return true;
}