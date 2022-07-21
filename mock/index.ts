module.exports = {
  '/api/userInfo': {
    code: 200,
    data: {
      userId: 1001,
      userName: '测试用户',
      userAvatar: 'https://avatars.githubusercontent.com/u/18275334?s=48&v=4',
      orgName: '测试机构',
      menus: [
        {
          icon: 'icon-kehu',
          name: '用户管理',
          path: '/user',
          children: [
            {
              icon: 'icon-yonghu',
              name: '用户列表',
              path: '/user/list',
              children: [],
            },
          ],
        },
        {
          icon: 'icon-xitong',
          name: '字典管理',
          path: '/dict',
          children: [
            {
              icon: 'icon-xitong',
              name: '字典列表',
              path: '/dict/list',
              children: [],
            },
          ],
        },
      ],
    },
  },
  'POST /api/user/login': async (req, res) => {
    await new Promise((r) => setTimeout(r, 2000, true));
    res.send({
      code: 200,
      data: '123abc',
    });
  },
};
