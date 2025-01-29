import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createNotice, updateNotice } from '../../services/noticeAPI';
import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react';
import UploadAdapter from '../Blog/UploadAdapter';
import "../../styles/NoticeWrite.css";


function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new UploadAdapter(loader);
    };
}

const LICENSE_KEY = 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NjgyNjIzOTksImp0aSI6ImQxMWFlMjhjLTRhNGEtNGQ4MC1hNTBmLTA3MTI5NmI5YjE4ZCIsImxpY2Vuc2VkSG9zdHMiOlsiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJ1c2FnZUVuZHBvaW50IjoiaHR0cHM6Ly9wcm94eS1ldmVudC5ja2VkaXRvci5jb20iLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIl0sImxpY2Vuc2VUeXBlIjoiZGV2ZWxvcG1lbnQiLCJmZWF0dXJlcyI6WyJEUlVQIl0sInZjIjoiZGMyZWIzYjUifQ.bGfz0zMJry9GHH6ANiZ8qqhYMFF94RHXyA0e9FVZLeMYpS1c02VFc4zm-KRJdYR7dgFnuGAvj8VvP9uPoV-Glw';

const NoticeWrite = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const noticeToEdit = location.state?.notice || null;

    const [title, setTitle] = useState(noticeToEdit?.noticeTitle || '');
    const [contents, setContents] = useState(noticeToEdit?.noticeContents || '');
    const [images, setImages] = useState(noticeToEdit?.imageUrl || []);
    const [isLayoutReady, setIsLayoutReady] = useState(false);

    const editorContainerRef = useRef(null);
    const editorRef = useRef(null);
    const cloud = useCKEditorCloud({ version: '44.1.0', translations: ['ko'] });

    useEffect(() => {
        setIsLayoutReady(true);
        return () => setIsLayoutReady(false);
    }, []);

    const handleSubmit = async () => {
        if (!title.trim()) {
            alert('제목을 입력해주세요.');
            return;
        }

        if (!contents.trim()) {
            alert('내용을 입력해주세요.');
            return;
        }

        try {
            if (noticeToEdit) {
                // 수정 요청
                await updateNotice({
                    id: noticeToEdit.id,
                    noticeTitle: title,
                    noticeContents: contents,
                    imageUrl: images
                });
                alert('공지사항이 수정되었습니다.');
            } else {
                // 등록 요청
                await createNotice({
                    noticeTitle: title,
                    noticeContents: contents,
                    imageUrl: images
                });
                alert('공지사항이 등록되었습니다.');
            }

            navigate('/notice');
            window.scrollTo(0, 0);
        } catch (error) {
            console.error('공지사항 저장 실패:', error);
            alert(error.message);
        }
    };

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setContents(data);

        // 이미지 URL 추출 및 저장
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = data;
        const imageElements = tempDiv.getElementsByTagName('img');
        const imageUrls = Array.from(imageElements).map(img => img.src);
        setImages(imageUrls);
    };

    const { ClassicEditor, editorConfig } = React.useMemo(() => {
        if (cloud.status !== 'success' || !isLayoutReady) {
            return {};
        }

        const {
            ClassicEditor,
            Autoformat,
            AutoImage,
            BlockQuote,
            Bold,
            CloudServices,
            Essentials,
            Heading,
            Image,
            ImageCaption,
            ImageStyle,
            ImageToolbar,
            ImageUpload,
            Indent,
            Link,
            List,
            MediaEmbed,
            Paragraph,
            PasteFromOffice,
            Table,
            TableToolbar,
            TextTransformation,
        } = cloud.CKEditor;

        return {
            ClassicEditor,
            editorConfig: {
                plugins: [
                    Autoformat,
                    AutoImage,
                    BlockQuote,
                    Bold,
                    CloudServices,
                    Essentials,
                    Heading,
                    Image,
                    ImageCaption,
                    ImageStyle,
                    ImageToolbar,
                    ImageUpload,
                    Indent,
                    Link,
                    List,
                    MediaEmbed,
                    Paragraph,
                    PasteFromOffice,
                    Table,
                    TableToolbar,
                    TextTransformation,
                    MyCustomUploadAdapterPlugin
                ],
                toolbar: {
                    items: [
                        'heading',
                        '|',
                        'bold',
                        'link',
                        'insertImage',
                        'insertTable',
                        'bulletedList',
                        'numberedList',
                        '|',
                        'outdent',
                        'indent',
                        '|',
                        'undo',
                        'redo'
                    ]
                },
                image: {
                    toolbar: [
                        'imageStyle:inline',
                        'imageStyle:block',
                        'imageStyle:side',
                        '|',
                        'toggleImageCaption',
                        'imageTextAlternative'
                    ]
                },
                table: {
                    contentToolbar: [
                        'tableColumn',
                        'tableRow',
                        'mergeTableCells'
                    ]
                },
                licenseKey: LICENSE_KEY,
            }
        };
    }, [cloud, isLayoutReady]);

    return (
        <div className="notice-write">
            <input
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="title-input"
            />
            <div className="editor-container">
                <div ref={editorContainerRef}>
                    <div ref={editorRef}>
                        {ClassicEditor && editorConfig && (
                            <CKEditor
                                editor={ClassicEditor}
                                config={editorConfig}
                                data={contents}
                                onChange={handleEditorChange}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="buttons-container">
                <button className="cancel-button" onClick={() => navigate('/notice')}>
                    취소
                </button>
                <button className="submit-button" onClick={handleSubmit}>
                    {noticeToEdit ? '수정' : '등록'}
                </button>
            </div>
        </div>
    );
};

export default NoticeWrite;