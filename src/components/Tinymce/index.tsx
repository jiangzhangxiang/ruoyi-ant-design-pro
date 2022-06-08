import type { FC } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { upload } from '@/services/api';

type UploadProps = {
  value?: any;
  onChangeValue: (e?: any) => void;
};

const Tinymce: FC<UploadProps> = (params) => {
  const { value, onChangeValue } = params;
  const editorObj = {
    height: '300px',
    width: '100%',
    language: 'zh_CN',
    plugins: [
      'advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount',
    ],
    toolbar: [
      'searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample',
      'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen',
    ],
    relative_urls: false,
    remove_script_host: false,
    file_picker_types: 'image',
    image_advtab: true,
    image_uploadtab: true,
    content_style: 'img {max-width:100% !important }',
    paste_data_images: true,
    tabfocus_elements: ':prev,:next',
    // 上传方法
    images_upload_handler: (blobInfo: any, success: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(blobInfo.blob());
      reader.onload = () => {
        const file = blobInfo.blob();
        const formData = new FormData();
        formData.append('file', file);
        upload(formData).then((res) => {
          success(res.url);
          if (res.code === 200) {
            success(res.url);
          } else {
            success('');
          }
        });
      };
    },
  };
  return (
    <Editor
      inline={false}
      apiKey="llb7n6taqcdnexwe5zy8yn5pybzam9nxzczofzrbd23wdtx4" // https://www.tiny.cloud/my-account/dashboard/
      initialValue={value}
      init={{ ...editorObj }}
      onEditorChange={(e) => {
        onChangeValue(e);
      }}
    />
  );
};

export default Tinymce;
