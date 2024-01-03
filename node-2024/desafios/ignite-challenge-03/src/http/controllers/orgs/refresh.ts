import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(req: FastifyRequest, reply: FastifyReply) {
  await req.jwtVerify({ onlyCookie: true })

  const token = await reply.jwtSign({
    sign: { sub: req.user.sub },
  })

  const refreshToken = await reply.jwtSign({
    sign: {
      expiresIn: '7d',
      sub: req.user.sub,
    },
  })

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({ token })
}
