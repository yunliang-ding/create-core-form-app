import { TableProps } from 'react-core-form';
import userForm from './form';

export default (): TableProps => {
  return {
    title: '用户列表',
    bordered: false,
    searchSchema: {
      column: 3,
      schema: [
        {
          type: 'Input',
          label: '用户姓名',
          name: 'name',
        },
      ],
    },
    columns: [
      {
        title: '姓名',
        dataIndex: 'name',
      },
    ],
    tools: [
      {
        key: 'add',
        label: '新增',
        modalFormProps: userForm(),
      },
    ],
    rowOperations: {
      title: '操作',
      width: 200,
      menus(record) {
        return [
          {
            label: '编辑',
            modalFormProps: userForm({
              initialValues: record,
            }),
          },
        ];
      },
    },
    request: async () => {
      await new Promise((res) => setTimeout(res, 1000));
      return {
        success: true,
        total: 2,
        list: [
          {
            name: '测试001',
          },
          {
            name: '测试002',
          },
        ],
      };
    },
  };
};
