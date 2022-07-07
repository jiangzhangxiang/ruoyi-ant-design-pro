// 在ts 文件 渲染 Modal.error 的 content
export default (text: string) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    ></div>
  );
};
