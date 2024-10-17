import type { z } from 'zod'

// field: error.path[0],
// message: error.message
export function zodError(error: z.ZodError) {
  return new Response(
    JSON.stringify({
      error: error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join('\n'),
    }),
    {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}
