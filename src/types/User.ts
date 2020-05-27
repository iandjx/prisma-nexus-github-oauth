import { objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.githubUserId()
    t.model.bio()
    t.model.public_gists()
    t.model.public_repos()
  },
})
