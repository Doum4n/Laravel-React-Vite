import React, { forwardRef, useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import CSS phù hợp cho theme 'snow'
// Editor is an uncontrolled React component

const Editor = forwardRef(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    const [selectedFile, setSelectedFile] = useState(null);

    const [htmlContent, setHtmlContent] = useState('');

    const imageHandler = async () => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();

      const sentFile = (file) => {
        const formData = new FormData();
        formData.append('image', file);
    
        fetch('http://0.0.0.0/image/upload', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };
    
      input.onchange = async () => {
        if (input !== null && input.files !== null) {
          const file = input.files[0];
          setSelectedFile(file);
          if (file) {
            sentFile(file);
          }
          
          const reader = new FileReader();
          
          reader.onload = (e) => {
            const imgUrl = e.target.result;

            const range = ref.current.getSelection();
            ref.current.insertEmbed(range.index, 'image', imgUrl); 
          };
    
          reader.readAsDataURL(file); // Đọc tệp ảnh dưới dạng Data URL
        }
      };
    };
    


    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      ref.current?.enable(!readOnly);
    }, [ref, readOnly]);

    useEffect(() => {
      const container = containerRef.current;
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement('div'),
      );
      const quill = new Quill(editorContainer, {
        modules: {
          toolbar: {
            container: [
                [{ 'header': [1,2,3,4,5,6,false] }, { 'font': [] }],
                [{ size: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' },
                { 'indent': '-1' }, { 'indent': '+1' }],
                ['link', 'image', 'video'],
                ['clean'],
                [{ 'align': [] }],
            ],
            'handlers': {
               image: imageHandler
            }
          },
        },
        formats: ['header', 'bold', 'italic', 'underline', 'color', 'image', 'code-block', 'video',],
        placeholder: 'Compose an epic...',
        theme: 'snow', // hoặc 'bubble'
      });

      ref.current = quill;

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);

        const html = quill.root.innerHTML;
        setHtmlContent(html);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        ref.current = null;
        container.innerHTML = '';
      };
    }, [ref]);

    return (
      <div>
        <div ref={containerRef}></div>
        {htmlContent}
      </div>
    );
  },
);

Editor.displayName = 'Editor';

export default Editor;