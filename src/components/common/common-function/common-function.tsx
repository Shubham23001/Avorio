// import { selectGeneralSettings } from '@/pages/login/login-slices/auth-slice';
import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
export interface CurrencyType {
  value: string;
}
export const restrictInvalidCharacters = (event: React.KeyboardEvent<HTMLInputElement>) => {
  const invalidChars = ['e', 'E', '+', '-'];
  if (invalidChars.includes(event.key)) {
    event.preventDefault();
  }
};

export const allowOnlyNumericInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

  if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
    e.preventDefault();
  }
};

//no special characters allowed
export const restrictSpecialCharacters = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab', ' '];
  const regex = /^[a-zA-Z0-9 _-]$/;
  if (!regex.test(e.key) && !allowedKeys.includes(e.key)) {
    e.preventDefault();
  }
};

// export const restrictZipCodeInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
//   const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
//   const input = e.currentTarget;
//   // Only allow numbers and auto-insert dash after 3 digits
//   if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
//     e.preventDefault();
//     return;
//   }

//   // Auto-insert dash after 3 digits if not already present
//   if (/[0-9]/.test(e.key)) {
//     const value = input.value;
//     const selectionStart = input.selectionStart ?? value.length;
//     // Only insert dash if typing at the 3rd position and dash not present
//     if (value.length === 3 && selectionStart === 3 && !value.includes('-')) {
//       // Insert dash after 3 digits
//       input.value = value + '-';
//       // Move cursor after dash
//       setTimeout(() => {
//         input.setSelectionRange(4, 4);
//       }, 0);
//     }
//   }
// };

export const restrictZipCodeInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
  // Allow alphanumeric and dash
  const isCharOrDash = /^[a-zA-Z0-9-]$/.test(e.key);
  const input = e.currentTarget;

  if (!isCharOrDash && !allowedKeys.includes(e.key)) {
    e.preventDefault();
    return;
  }

  const charCount = input.value.length;

  if (isCharOrDash) {
    if (charCount >= 10) {
      e.preventDefault();
      return;
    }
  }
};

//type number only with +
export const typeNumberOnly = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const input = e.currentTarget;
  const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];

  const isNumber = e.key >= '0' && e.key <= '9';

  const isPlus = e.key === '+' && input.selectionStart === 0 && !input.value.includes('+');

  if (!allowedKeys.includes(e.key) && !isNumber && !isPlus) {
    e.preventDefault();
  }
};

//type only number
export const typeNumber = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];

  const isNumber = e.key >= '0' && e.key <= '9';

  if (!allowedKeys.includes(e.key) && !isNumber) {
    e.preventDefault();
  }
};

//allow decimal values
export function restrictInvalidCharactersForDecimal(e: React.KeyboardEvent<HTMLInputElement>): void {
  const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];

  if (allowedKeys.includes(e.key)) return;

  const isDigit = /[0-9]/.test(e.key);
  const isDot = e.key === '.';
  const input = e.currentTarget;
  const value = input.value;
  const selectionStart = input.selectionStart ?? 0;
  const selectionEnd = input.selectionEnd ?? 0;

  const nextValue = value.slice(0, selectionStart) + e.key + value.slice(selectionEnd);

  if (!isDigit && !isDot) {
    e.preventDefault();
    return;
  }

  if (isDot && value.includes('.')) {
    e.preventDefault();
    return;
  }

  if (parseFloat(value) === 100 && nextValue !== '100') {
    e.preventDefault();
    return;
  }

  const [beforeDecimal, afterDecimal = ''] = nextValue.split('.');

  if (afterDecimal.length > 2) {
    e.preventDefault();
    return;
  }

  const numericValue = parseFloat(nextValue);
  if (!isNaN(numericValue) && numericValue > 100) {
    e.preventDefault();
    return;
  }
}

export const hasMobileViewForSettings = (path: string) => {
  const basePath = '/general-settings/accounts-&-billing';

  if (!path.startsWith(basePath)) return false;
  const rest = path.replace(basePath, '');
  const segments = rest.replace(/^\/|\/$/g, '').split('/');

  return segments[0] !== '' && segments.length === 1;
};

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

//allow only aplhabets
export const allowOnlyAlphabets = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab', ' '];

  const isAlphabet = /^[a-zA-Z]$/.test(e.key);

  if (!isAlphabet && !allowedKeys.includes(e.key)) {
    e.preventDefault();
  }
};

//for address where some special characters are allowed
export const addressSpecialCharactersAllowed = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab', ' '];
  const allowedSpecialChars = ['/', '#', '-'];
  const regex = /^[a-zA-Z0-9 /#-]$/;

  if (!regex.test(e.key) && !allowedKeys.includes(e.key)) {
    e.preventDefault();
    return;
  }

  if (allowedSpecialChars.includes(e.key)) {
    const input = e.currentTarget;
    const value = input.value;

    const charCount = (value.match(new RegExp(\\${e.key}, 'g')) || []).length;

    if (charCount >= 5) {
      e.preventDefault();
    }
  }
};

export const extractCurrencySymbols = (currencies: CurrencyType[]): string[] => {
  return currencies.map((currency) => {
    const match = currency?.match(/\(([^)]+)\)/);
    return match ? match[1] : ''; // returns symbol or empty string if not found
  });
};

//for amount or price field in class passes
export const handleAmountFieldKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const allowedKeys = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'];
  if (allowedKeys.includes(e.key)) return;

  const { value, selectionStart, selectionEnd } = e.currentTarget;

  // Block non-numeric keys except decimal
  if (!/^\d$/.test(e.key) && e.key !== '.') {
    e.preventDefault();
    return;
  }

  // Prevent more than one decimal point
  if (e.key === '.' && value.includes('.')) {
    e.preventDefault();
    return;
  }

  // Simulate the value after the key is pressed
  const newValue = value.slice(0, selectionStart ?? 0) + e.key + value.slice(selectionEnd ?? 0);

  // Limit to 2 digits after decimal
  if (newValue.includes('.')) {
    const [_, afterDecimal = ''] = newValue.split('.');
    if (afterDecimal.length > 2) {
      e.preventDefault();
      return;
    }
  }

  // Limit total length (including decimal) to 11 characters
  if (newValue.length > 11) {
    e.preventDefault();
    return;
  }
};

// Prevent only text (letters) input, allow everything else
export const preventTextInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const isCtrlOrMeta = e.ctrlKey || e.metaKey;

  // Allow control shortcuts like Ctrl+C, Ctrl+V, etc.
  if (isCtrlOrMeta) {
    return;
  }

  const isLetter = /^[a-zA-Z]$/.test(e.key);
  if (isLetter) {
    e.preventDefault();
  }
};
//phone number
export const restrictPhoneNumberInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];
  const input = e.currentTarget;
  const val = input.value;
  const isNumber = /^[0-9]$/.test(e.key);
  const isPlus = e.key === '+' && input.selectionStart === 0 && !val.includes('+');

  // Count digits only (exclude +)
  const digitCount = val.replace(/\D/g, '').length;

  if (!allowedKeys.includes(e.key) && !isNumber && !isPlus) {
    e.preventDefault();
    return;
  }

  // Check max digits limit (15 digits)
  // Allow typing if selection exists (for replacing)
  const selectionStart = input.selectionStart ?? 0;
  const selectionEnd = input.selectionEnd ?? 0;

  if (isNumber && digitCount >= 15 && selectionStart === selectionEnd) {
    e.preventDefault();
  }

  // Plus is allowed only at start, no length check needed here because maxLength=16
};

export const generateDifferentColor = (name: string) => {
  const colors = [
    'bg-red-100 text-red-800',
    'bg-green-100 text-green-800',
    'bg-blue-100 text-blue-800',
    'bg-yellow-100 text-yellow-800',
    'bg-purple-100 text-purple-800',
    'bg-pink-100 text-pink-800',
    'bg-indigo-100 text-indigo-800',
  ];
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

export const getPathnameAfterBusiness = (pathname: string): string => {
  const parts = pathname.split('/').filter(Boolean);
  return parts.length > 1 ? '/' + parts.slice(1).join('/') : '/';
};

export const trimLastId = (path: string): string => {
  return path.replace(/\/:id$/, '');
};

export const getLastSegment = (path: string): string => {
  const parts = path.split('/').filter(Boolean);
  return '/' + parts[parts.length - 1];
};

// export const useCurrencySymbol = () => {
//   const currency = useSelector(selectGeneralSettings);

//   return extractCurrencySymbols(currency?.currency ? [currency.currency] : []);
// };

export const containsRoute = (pathname: string, routePattern: string): boolean => {
  const cleanPathname = getPathnameAfterBusiness(pathname);
  return cleanPathname.includes(routePattern);
};