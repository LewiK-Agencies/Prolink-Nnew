import { ResumeData, ResumeCustomization } from '../types/resume';

const RESUME_DATA_KEY = 'resumeBuilderData';
const CUSTOMIZATION_KEY = 'resumeCustomization';
const PAYMENT_STATUS_KEY = 'paymentCompleted';
const CHECKOUT_TOKEN_KEY = 'checkoutToken';
const CHECKOUT_STATE_KEY = 'checkoutState';

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

// Checkout token management
export const generateCheckoutToken = (): string => {
  const token = 'checkout_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  localStorage.setItem(CHECKOUT_TOKEN_KEY, token);
  return token;
};

export const getCheckoutToken = (): string | null => {
  return localStorage.getItem(CHECKOUT_TOKEN_KEY);
};

export const clearCheckoutToken = (): void => {
  localStorage.removeItem(CHECKOUT_TOKEN_KEY);
};

// Checkout state management
export const setCheckoutState = (state: 'initiated' | 'completed'): void => {
  localStorage.setItem(CHECKOUT_STATE_KEY, state);
};

export const getCheckoutState = (): string | null => {
  return localStorage.getItem(CHECKOUT_STATE_KEY);
};

export const clearCheckoutState = (): void => {
  localStorage.removeItem(CHECKOUT_STATE_KEY);
};

// Clear all data after successful download
export const clearAllData = (): void => {
  localStorage.removeItem(RESUME_DATA_KEY);
  localStorage.removeItem(CUSTOMIZATION_KEY);
  localStorage.removeItem(PAYMENT_STATUS_KEY);
  localStorage.removeItem(CHECKOUT_TOKEN_KEY);
  localStorage.removeItem(CHECKOUT_STATE_KEY);
};