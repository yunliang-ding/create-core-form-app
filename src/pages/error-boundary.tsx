/* eslint-disable no-console */
import { Result, Button } from 'antd';
import { FrownOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

export default (props) => {
  useEffect(() => {
    console.log('错误捕获', props.error.message);
  }, []);
  return (
    <Result
      status="warning"
      icon={<FrownOutlined />}
      title="很抱歉，您的操作导致系统出现了一些问题"
      extra={
        <>
          <Button
            type="dashed"
            style={{ marginLeft: 20 }}
            onClick={() => {
              window.location.reload();
            }}
          >
            重新加载
          </Button>
        </>
      }
    />
  );
};
