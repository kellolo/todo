import { type AuthData, ValibotService, emailSchema, passwordSchema } from 'frontend/src/shared'

type Fields = 'email' | 'password'

export const resolver = ({ values }: { values: AuthData }, field: Fields) => {
  const schema = {
    email: emailSchema,
    password: passwordSchema,
  }
  const result = ValibotService.validate({ [field]: schema[field] }, { [field]: values[field] })

  return result.success ? { errors: {} } : { errors: result.errors }
}
