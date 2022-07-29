import { ModalFormProps } from 'react-core-form';
import { saveOrUpdate } from '../services';

export default (props: ModalFormProps = {}) =>
  ({ onSearch }: any) => {
    return {
      title: '新增用户',
      initialValues: props.initialValues,
      schema: [
        {
          type: 'Input',
          label: '姓名',
          name: 'name',
          required: true,
        },
        {
          type: 'Select',
          label: '性别',
          name: 'sex',
          props: {
            options: [
              {
                label: '男',
                value: 0,
              },
              {
                label: '女',
                value: 1,
              },
            ],
          },
        },
      ],
      async onSubmit(values) {
        await saveOrUpdate(values);
        onSearch();
      },
    };
  };
