const gateway = {
  domain: `${process.env.VUE_APP_GATEWAY}/admin`,
  // 租户 - 新增
  addTenant: {
    method: 'post',
    url: '/manage/tenant'
  },
  // 租户 - 删除
  delTenant: {
    method: 'delete',
    url: '/manage/tenant/{id}'
  },
  // 租户 - 编辑
  editTenant: {
    method: 'put',
    url: '/manage/tenant/{id}'
  },
  // 租户 - 分页
  pageTenant: {
    url: '/manage/tenant'
  },
  // 租户 - 角色 - 新增
  addTenantRoles: {
    method: 'put',
    url: '/manage/tenant/{id}/app/role'
  },
  // 租户 - 角色 - 查询（已分配）
  listTenantRole: {
    url: '/manage/tenant/{id}/app/role'
  },
  // 租户 - 角色 - 树（可分配）
  treeTenantRole: {
    url: '/manage/app/roles'
  },
  // 用户 - 新增
  addUser: {
    method: 'post',
    url: '/manage/tenant/user'
  },
  // 用户 - 删除
  delUser: {
    method: 'delete',
    url: '/manage/tenant/user/{id}'
  },
  // 用户 - 编辑
  editUser: {
    method: 'put',
    url: '/manage/tenant/user/{id}'
  },
  // 用户 - 分页
  pageUser: {
    url: '/manage/tenant/user/page'
  },
  // 用户 - 角色 - 分配
  allocateUserRoles: {
    method: 'put',
    url: '/manage/tenant/user/{id}/assign/roles'
  },
  // 用户 - 角色 - 已分配列表
  listAllocatedUserRole: {
    url: '/manage/role/user/{id}/roles'
  },
  // 应用 - 新增
  addApp: {
    method: 'post',
    url: '/manage/app'
  },
  // 应用 - 删除
  delApp: {
    method: 'delete',
    url: '/manage/app/{id}'
  },
  // 应用 - 编辑
  editApp: {
    method: 'put',
    url: '/manage/app'
  },
  // 应用 - 分页
  pageApp: {
    url: '/manage/app'
  },
  // 角色 - 新增
  addRole: {
    method: 'post',
    url: '/manage/role'
  },
  // 角色 - 删除
  delRole: {
    method: 'delete',
    url: '/manage/role/{id}'
  },
  // 角色 - 编辑
  editRole: {
    method: 'put',
    url: '/manage/role'
  },
  // 角色 - 分页
  pageRole: {
    url: '/manage/role'
  },
  // 菜单 - 新增
  addMenu: {
    method: 'post',
    url: '/manage/menu'
  },
  // 菜单 - 删除
  delMenu: {
    method: 'delete',
    url: '/manage/menu/{id}'
  },
  // 菜单 - 编辑
  editMenu: {
    method: 'put',
    url: '/manage/menu'
  },
  // 菜单 - 树
  treeMenu: {
    url: '/manage/menu/tree/menu'
  }
}

export default gateway
