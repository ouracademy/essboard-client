interface Role {
  name: string
  permissions: string[]
  resource: any
}

class AuthorizationService {
  acl: Role[] = []

  can(permission: string, resource: any) {
    return this.acl.some(
      x => x.permissions.find(p => p === permission) && x.resource === resource
    )
  }

  addRole(name: string, permissions: string[], resource: any) {
    this.acl.push({ name, permissions, resource })
  }
}

describe('AuthorizationService', () => {
  const authorizationService = new AuthorizationService()
  const project = {
    id: '123'
  }

  authorizationService.addRole('member', ['view'], project)

  it('can do something with the resource if is authorized', () => {
    expect(authorizationService.can('view', project)).toBe(true)
  })

  it('cannot do something with the resource if is not authorized ', () => {
    expect(authorizationService.can('delete', project)).toBe(false)
  })
})

describe('authorization on public project', () => {
  let authorizationService: AuthorizationService
  const project = {
    id: '123',
    isPublic: true
  }

  beforeEach(() => {
    authorizationService = new AuthorizationService()
  })

  // call API: /me/role/:projectId
  it(`can view project if it's a guest (not authenticated)`, () => {
    const response = {
      role: 'guest',
      permissions: ['view']
    }

    authorizationService.addRole(response.role, response.permissions, project)
    expect(authorizationService.can('view', project)).toBe(true)
  })

  it('can view, emitOpinions, ... if is a member', () => {
    const response = {
      role: 'member',
      permissions: ['view', 'emitOpinions']
    }

    authorizationService.addRole(response.role, response.permissions, project)
    expect(authorizationService.can('view', project)).toBe(true)
    expect(authorizationService.can('emitOpinions', project)).toBe(true)
  })

  it(`cannot do nothing if isn't a member`, () => {
    expect(authorizationService.can('view', project)).toBe(false)
  })
})
