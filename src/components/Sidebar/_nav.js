export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      name: 'Museums',
      url: '/museums',
      icon: 'fa fa-building',
      children: [
        {
          name: 'Manage Museums',
          url: '/museums/manage',
          icon: 'fa fa-building'
        },
      ]
    },
    {
      name: 'Quizzes',
      url: '/quizzes',
      icon: 'fa fa-list',
      children: [
        {
          name: 'Manage Quizzes',
          url: '/quizzes/manage',
          icon: 'fa fa-list'
        },
      ]
    },
    {
      name: 'Logout',
      url: '/logout',
      icon: 'icon-logout',
      badge: {
      }
    }
  ]
};
