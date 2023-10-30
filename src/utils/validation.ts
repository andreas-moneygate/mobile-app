import { numbersWithDot } from './ui'

const validationSchema = {
  username: {
    required: { value: true, message: 'Username is required' },
    maxLength: { value: 70, message: 'Minimum length 70 characters' }
  },
  password: {
    required: { value: true, message: 'Password is required' },
    minLength: { value: 8, message: 'Minimum length 8 characters' },
    pattern: {
      value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      message: 'Must include at least one number and symbol',
    },
  },
  confirmPassword: (password: string) => ({
    required: { value: true, message: 'Password confirmation is required' },
    minLength: { value: 8, message: 'Minimum length 8 characters' },
    pattern: {
      value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      message: 'Must include at least one number and symbol',
    },
    validate: (value: string) => value === password || 'Passwords are different',
  }),
  email: {
    required: { value: true, message: 'Email is required' },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Please enter a valid email',
    },
  },
  transactionAmount: (files: Array<File>, isBiggerThanLimit: boolean) => ({
    required: { value: true, message: 'Field is required' },
    validate: (value: string) => {
      if (!Number(numbersWithDot(value))) {
        return false
      }
      return isBiggerThanLimit ? Boolean(files.length) : true
    },
  }),
  text: {
    required: { value: true, message: 'Field is required' },
  },
  currency: {
    required: { value: true, message: '' },
    pattern: {
      value: /^(?![$]+$)[0-9$]*$/,
      message: '',
    },
  },
  paymentDetails: {
    required: { value: true, message: 'Field is required' },
    minLength: { value: 2, message: 'Minimum length 2 characters' },
  },
  required: {
    required: { value: true, message: 'Field is required' },
  },
  requiredField: (fieldName: string) => ({
    required: { value: true, message: `${fieldName} is required` },
  }),
}

export default validationSchema
