import { connect } from 'umi';
import React from 'react';
import Iframe from '@/components/Iframe';
import { APP_BASE_API } from '@/utils/evn';

type IframeProps = {
  src: string;
};

const TableList: React.FC<IframeProps> = () => {
  const prefix = APP_BASE_API[REACT_APP_ENV] || '';
  const src = `${prefix}/druid/login.html`;
  return (
    <div>
      <Iframe src={src} />
    </div>
  );
};

export default connect()(TableList);
