import * as v from 'valibot'

export class ValibotService {
  static validate<TInput, TOutput>(schema: v.BaseSchema<TInput, TOutput, v.Issue>, data: unknown) {
    const result = v.safeParse(v.object(schema), data)

    if (!result.success) {
      return {
        success: false,
        errors: result.issues.map(issue => ({
          field: issue.path?.[0] || 'unknown',
          message: issue.message,
        })),
      }
    }

    return { success: true, data: result.output }
  }
}
