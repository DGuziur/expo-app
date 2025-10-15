export function getAuthErrorNamePl(code: string): string {
  console.log("code:", code);
  switch (code) {
    // Email/Password Authentication Errors
    case "auth/invalid-email":
      return "Please enter a valid email address";

    case "auth/user-disabled":
      return "This account has been disabled. Please contact support";

    case "auth/user-not-found":
      return "No account found with this email address";

    case "auth/wrong-password":
      return "Incorrect password. Please try again";

    case "auth/email-already-in-use":
      return "This email is already registered. Try signing in instead";

    case "auth/weak-password":
      return "Password should be at least 6 characters";

    case "auth/missing-password":
      return "Please enter a password";

    case "auth/missing-email":
      return "Please enter an email address";

    // Network and Server Errors
    case "auth/network-request-failed":
      return "Network error. Please check your connection and try again";

    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later";

    case "auth/operation-not-allowed":
      return "This sign-in method is not enabled. Please contact support";

    case "auth/invalid-credential":
      return "Invalid credentials. Please check your email and password";

    case "auth/account-exists-with-different-credential":
      return "An account already exists with this email using a different sign-in method";

    // Token and Session Errors
    case "auth/expired-action-code":
      return "This link has expired. Please request a new one";

    case "auth/invalid-action-code":
      return "Invalid or expired link. Please request a new one";

    case "auth/user-token-expired":
      return "Your session has expired. Please sign in again";

    case "auth/requires-recent-login":
      return "For security, please sign in again to complete this action";

    // Password Reset Errors
    case "auth/invalid-continue-uri":
      return "Invalid redirect link";

    case "auth/unauthorized-continue-uri":
      return "Unauthorized redirect link";

    // Multi-factor Authentication Errors
    case "auth/multi-factor-auth-required":
      return "Multi-factor authentication is required";

    case "auth/maximum-second-factor-count-exceeded":
      return "Maximum number of second factors exceeded";

    case "auth/second-factor-already-in-use":
      return "This second factor is already in use";

    // Phone Authentication Errors
    case "auth/invalid-phone-number":
      return "Please enter a valid phone number";

    case "auth/missing-phone-number":
      return "Please enter a phone number";

    case "auth/quota-exceeded":
      return "SMS quota exceeded. Please try again later";

    case "auth/captcha-check-failed":
      return "Captcha verification failed. Please try again";

    case "auth/invalid-verification-code":
      return "Invalid verification code. Please try again";

    case "auth/invalid-verification-id":
      return "Invalid verification ID";

    // Provider-specific Errors
    case "auth/popup-blocked":
      return "Pop-up was blocked by your browser. Please allow pop-ups and try again";

    case "auth/popup-closed-by-user":
      return "Sign-in was cancelled. Please try again";

    case "auth/cancelled-popup-request":
      return "Only one pop-up request is allowed at a time";

    case "auth/credential-already-in-use":
      return "This credential is already associated with another account";

    // Generic/Unknown Errors
    case "auth/internal-error":
      return "An internal error occurred. Please try again";

    case "auth/invalid-api-key":
      return "Invalid API key. Please contact support";

    case "auth/app-deleted":
      return "App has been deleted. Please contact support";

    case "auth/invalid-user-token":
      return "Your session is invalid. Please sign in again";

    case "auth/web-storage-unsupported":
      return "Web storage is not supported in this browser";

    default:
      return "An unexpected error occurred. Please try again";
  }
}
