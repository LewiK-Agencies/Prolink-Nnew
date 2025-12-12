import { ResumeData, ResumeCustomization } from '../types/resume';
import { setCookie, getCookie, deleteCookie, generateSecureToken } from './cookies';

const RESUME_DATA_KEY = 'resumeBuilderData';
const CUSTOMIZATION_KEY = 'resumeCustomization';
const PAYMENT_STATUS_KEY = 'paymentCompleted';
const DOWNLOAD_TOKEN_COOKIE = 'download_token';

export const saveResumeData = (data: ResumeData): void => {
  try {
    localStorage.setItem(RESUME_DATA_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save resume data:', error);
  }
};

export const loadResumeData = (): ResumeData | null => {
  try {
    const data = localStorage.getItem(RESUME_DATA_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load resume data:', error);
    return null;
  }
};

export const saveCustomization = (customization: ResumeCustomization): void => {
  try {
    localStorage.setItem(CUSTOMIZATION_KEY, JSON.stringify(customization));
  } catch (error) {
    console.error('Failed to save customization:', error);
  }
};

export const loadCustomization = (): ResumeCustomization | null => {
  try {
    const data = localStorage.getItem(CUSTOMIZATION_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load customization:', error);
    return null;
  }
};

export const setPaymentCompleted = (): void => {
  localStorage.setItem(PAYMENT_STATUS_KEY, 'true');
};

export const hasCompletedPayment = (): boolean => {
  return localStorage.getItem(PAYMENT_STATUS_KEY) === 'true';
};

export const clearPaymentStatus = (): void => {
  localStorage.removeItem(PAYMENT_STATUS_KEY);
};

// Secure token management using cookies
export const generateDownloadToken = (): string => {
  const token = generateSecureToken();
  // Store token in secure cookie (7 days expiry)
  setCookie(DOWNLOAD_TOKEN_COOKIE, token, 7);
  console.log('Generated and stored download token in secure cookie:', token);
  return token;
};

export const getDownloadToken = (): string | null => {
  return getCookie(DOWNLOAD_TOKEN_COOKIE);
};

export const validateDownloadToken = (token: string): boolean => {
  const storedToken = getDownloadToken();
  console.log('Validating token:', { provided: token, stored: storedToken, match: storedToken === token });
  return storedToken === token;
};

export const clearDownloadToken = (): void => {
  deleteCookie(DOWNLOAD_TOKEN_COOKIE);
};

// Clear all data after successful download
export const clearAllData = (): void => {
  localStorage.removeItem(RESUME_DATA_KEY);
  localStorage.removeItem(CUSTOMIZATION_KEY);
  localStorage.removeItem(PAYMENT_STATUS_KEY);
  clearDownloadToken();
};