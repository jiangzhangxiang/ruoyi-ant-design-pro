import { connect } from 'umi';
import React from 'react';
type IframeProps = {
  src: string;
};
const Iframe: React.FC<IframeProps> = (props) => {
  const { src } = props;
  return (
    <div style={{ height: `${document.documentElement.clientHeight - 100}px` }}>
      <iframe style={{ width: '100%', height: '100%', border: 0 }} scrolling="auto" src={src} />
    </div>
  );
};

export default connect()(Iframe);
