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
        githubCode: stringArg(),
      },
      resolve: async (_parent, { githubCode }, ctx) => {
        const githubToken = await getGithubToken(githubCode!)
        const githubUser = await getGithubUser(githubToken)

        let user = await ctx.prisma.user.findOne({
          where: {
            githubUserId: String(githubUser.id),
          },
        })

        if (!user) {
          user = await ctx.prisma.user.create({
            data: {
              githubUserId: String(githubUser.id),
              name: githubUser.name,
              bio: githubUser.bio,
              public_repos: githubUser.public_repos,
              public_gists: githubUser.public_gists,
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
