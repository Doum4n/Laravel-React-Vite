import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import 'react-quill/dist/quill.snow.css';
import { useRef } from 'react';
import Editor from './Editor';
import { useEffect } from 'react';
import Quill from 'quill/dist/quill.js';
const Delta = Quill.import('delta');

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [url, setUrl] = useState();

  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);

  const [htmlContent, setHtmlContent] = useState('');

  const quillRef = useRef(); // Khởi tạo ref để tham chiếu đến phần tử DOM

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Lấy file đã chọn
    setSelectedFile(file); // Cập nhật file đã chọn

    // Tự động gửi file ngay khi được chọn
    if (file) {
      handleSubmit(file);
    }
  };

  const handleGetHTML = (html) => {
    setHtmlContent(html); // Cập nhật nội dung HTML
  };

  const handleSubmit = (file) => {
    const formData = new FormData();
    formData.append('image', file);

    fetch('http://0.0.0.0/image/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setUrl(data.path);
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

    // Khởi tạo Quill khi component được mount
    // const quill = new Quill(quillRef.current, {
    //   modules: {
    //     toolbar: [
    //       [{ header: [1, 2, false] }],
    //       ['bold', 'italic', 'underline', 'color'],
    //       ['image', 'code-block', 'video'],
    //     ],
    //   },
    //   placeholder: 'Compose an epic...',
    //   theme: 'bubble', // hoặc 'bubble'
    // });

    // // Dọn dẹp khi component unmount
    // return () => {
    //   quill.enable(false); // Vô hiệu hóa Quill khi component unmount
    // };


  return (
    <Container className='mt-3'>
      <Form>
        <Form.Control type='text' placeholder='Title' className='mb-3' />
        <Form.Control type="file" onChange={handleFileChange} className='mb-3'/>
        {url && <img src={`http://0.0.0.0/storage/${url}`} alt="Uploaded" className='mb-3' />}
        <Editor
        ref={quillRef}
        readOnly={readOnly}
        defaultValue={""}
        onSelectionChange={setRange}
        onTextChange={handleGetHTML}
      />
        <Button>POST</Button>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />      </Form>
    </Container>
  );
};

export default UploadFile;
