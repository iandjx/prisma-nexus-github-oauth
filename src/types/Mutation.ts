import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { intArg, mutationType, stringArg } from 'nexus'
import { APP_SECRET, getUserId } from '../utils'
import { getGithubToken, getGithubUser } from '../github'

export const Mutation = mutationType({
  definition(t) {
    t.field('authenticate', {
      type: 'AuthPayload',
      args: {
        githubUserId: intArg(),
        name: stringArg(),
        bio: stringArg(),
        public_repos: intArg(),
        public_gists: intArg(),
        authToken: stringArg(),
        refreshToken: stringArg(),
      },
      resolve: async (
        _parent,
        {
          githubUserId,
          name,
          bio,
          public_repos,
          public_gists,
          authToken,
          refreshToken,
        },
        ctx,
      ) => {
        let user = await ctx.prisma.user.findOne({
          where: {
            githubUserId: String(githubUserId),
          },
        })

        if (!user) {
          user = await ctx.prisma.user.create({
            data: {
              githubUserId: String(githubUserId),
              name: name,
              bio: bio,
              public_repos: public_repos!,
              public_gists: public_gists!,
              authToken: authToken!,
              refreshToken: refreshToken!,
            },
          })
        }

        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })
  },
})
