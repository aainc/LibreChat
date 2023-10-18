const { z } = require('zod');

function errorsToString(errors) {
  return errors
    .map((error) => {
      let field = error.path.join('.');
      let message = error.message;

      return `${field}: ${message}`;
    })
    .join(' ');
}

const allowedCharactersRegex =
  /^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFFa-zA-Z0-9_.@#$%&*()\p{Script=Latin}\p{Script=Common}]+$/u;
const injectionPatternsRegex = /('|--|\$ne|\$gt|\$lt|\$or|\{|\}|\*|;|<|>|\/|=)/i;

const usernameSchema = z
  .string()
  .min(2)
  .max(80)
  .refine((value) => allowedCharactersRegex.test(value), {
    message: 'Invalid characters in username',
  })
  .refine((value) => !injectionPatternsRegex.test(value), {
    message: 'Potential injection attack detected',
  });

const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(128)
    .refine((value) => value.trim().length > 0, {
      message: 'Password cannot be only spaces',
    }),
});

const registerSchema = z
  .object({
    name: z.string().min(3).max(80),
    username: z
      .union([z.literal(''), usernameSchema])
      .transform((value) => (value === '' ? null : value))
      .optional()
      .nullable(),
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .max(128)
      .refine((value) => value.trim().length > 0, {
        message: 'Password cannot be only spaces',
      }),
    confirm_password: z
      .string()
      .min(8)
      .max(128)
      .refine((value) => value.trim().length > 0, {
        message: 'Password cannot be only spaces',
      }),
  })
  .superRefine(({ confirm_password, password }, ctx) => {
    if (confirm_password !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
      });
    }
  });

module.exports = {
  loginSchema,
  registerSchema,
  errorsToString,
};
