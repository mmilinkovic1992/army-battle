export default [
  {
    _name: 'CSidebarNav',
    _children: [
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Dashboard',
      //   to: '/dashboard',
      //   icon: 'cil-speedometer',
      //   badge: {
      //     color: 'primary',
      //     text: 'NEW'
      //   }
      // },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Users']
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Users',
        route: 'users',
        icon: 'cil-people',
        items: [
          {
            name: 'List',
            to: {name: 'users-index'}
          },
          {
            name: 'Create',
            to: {name: 'users-create'}
          }
        ]
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Army']
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Armies',
        route: 'admin/armies',
        icon: 'cil-airplane-mode',
        items: [
          {
            name: 'List',
            to: {name: 'armies-index'}
          },
          {
            name: 'Create',
            to: {name: 'armies-create'}
          },
          {
            name: 'Update/Delete',
            to: {name: 'armies-update-delete'}
          },
        ]
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Games']
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Games',
        route: 'games',
        icon: 'cil-3d',
        items: [
          {
            name: 'List',
            to: {name: 'games-list'}
          },
          {
            name: 'Create',
            to: {name: 'games-create'}
          }
        ]
      },
    ]
  }
]