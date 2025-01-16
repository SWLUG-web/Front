import React from "react";
import { writePost, updatePost } from "../../services/blogAPI"; // blogAPI.js에서 import
import "../../styles/BlogWrite.css";
import {useLocation, useNavigate} from "react-router-dom";
import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react';
import UploadAdapter from './UploadAdapter';

function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new UploadAdapter(loader)
    }
}

const LICENSE_KEY = 
    'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NjgyNjIzOTksImp0aSI6ImQxMWFlMjhjLTRhNGEtNGQ4MC1hNTBmLTA3MTI5NmI5YjE4ZCIsImxpY2Vuc2VkSG9zdHMiOlsiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJ1c2FnZUVuZHBvaW50IjoiaHR0cHM6Ly9wcm94eS1ldmVudC5ja2VkaXRvci5jb20iLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIl0sImxpY2Vuc2VUeXBlIjoiZGV2ZWxvcG1lbnQiLCJmZWF0dXJlcyI6WyJEUlVQIl0sInZjIjoiZGMyZWIzYjUifQ.bGfz0zMJry9GHH6ANiZ8qqhYMFF94RHXyA0e9FVZLeMYpS1c02VFc4zm-KRJdYR7dgFnuGAvj8VvP9uPoV-Glw';

    const BlogWrite = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const postToEdit = location.state?.post || null; // 수정할 게시물 정보
    const isMyPageEdit = location.state?.isMyPageEdit || false;  // 마이페이지에서 수정 여부

    // 상태 초기화
    const [posts, setPosts] = useState([]);

	// 태그 중복 입력
	const [tags, setTags] = useState([]);
	const MAX_TAGS = 10; // 최대 10개 태그 제한

    const [title, setTitle] = useState(postToEdit?.title || "");
    const [contents, setContents] = useState(postToEdit?.contents || "");
    const [tag, setTag] = useState(postToEdit?.tag || "");
    const [category, setCategory] = useState(postToEdit?.category || "");
    const [image, setImage] = useState(null);
    
	// 태그 추가 로직
	const handleTagInput = (e) => {
		if ((e.key === 'Enter' || e.key === ',') && e.target.value.trim() !== '') {
			e.preventDefault(); // 기본 동작 방지
			const newTag = e.target.value.trim();
			if (tags.length >= MAX_TAGS) {
				return;
			}
			if (!tags.includes(newTag)) { // 중복 방지
				setTags((prevTags) => [...prevTags, newTag]);
			}
			e.target.value = ''; // 입력 필드 초기화
		}
	};

	// 태그 삭제 로직
	const handleTagRemove = (tagToRemove) => {
		setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
	};

    // 게시글 목록을 서버에서 가져오는 함수
    const fetchPosts = async (url = "/api/blog") => {
        try {
            const response = await fetch(url); // 서버에서 데이터 요청
            if (!response.ok) {
                throw new Error("게시글 데이터를 가져오지 못했습니다.");
            }
            const data = await response.json();
            setPosts(data); // 게시글 데이터 상태 갱신
        } catch (error) {
            console.error("게시글 목록을 가져오는 중 오류 발생:", error);
        }
    };

    useEffect(() => {
        // 컴포넌트가 마운트될 때 게시글 목록을 가져옴
        fetchPosts();
    }, []);

    // 폼 제출 핸들러
    const handleSubmit = async () => {
        if (!category) {
            alert("게시판을 선택해주세요."); // 카테고리가 선택되지 않으면 알림 표시
            return;
        }

        try {
            if (postToEdit) {
                // 수정 요청
                await updatePost({
                    boardId: postToEdit.boardId,
                    category,
                    title,
                    contents,
                    tag,
                    createAt: new Date().toISOString(),
                    image,
                });
                alert("게시물이 수정되었습니다.");
            } else {
                // 등록 요청
                const formData = new FormData();
                formData.append("category", category);
                formData.append("title", title);
                formData.append("contents", contents);
                formData.append("tag", tags.join(','));
                formData.append("roleType", "USER");
                formData.append("createAt", new Date().toISOString());
                if (image) formData.append("image", image);

                const response = await writePost(formData);
                const responseData = await response.json();

                if (responseData.redirect) {
                    // 새 데이터 가져오기
                    await fetchPosts(responseData.redirect);
                }
                alert("게시물이 등록되었습니다.");
            }

            // 페이지 이동
            navigate(isMyPageEdit ? "/mypage" : "/blog");
        } catch (error) {
            console.error("글 등록/수정 실패:", error);
            alert("글 등록/수정에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const editorContainerRef = useRef(null);
	const editorRef = useRef(null);
	const [isLayoutReady, setIsLayoutReady] = useState(false);
	const cloud = useCKEditorCloud({ version: '44.1.0', translations: ['ko'] });

	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);

	const { ClassicEditor, editorConfig } = useMemo(() => {
		if (cloud.status !== 'success' || !isLayoutReady) {
			return {};
		}

		const {
			ClassicEditor,
			Autoformat,
			AutoImage,
			Autosave,
			BlockQuote,
			Bold,
			CloudServices,
			Code,
			Essentials,
			FontBackgroundColor,
			FontColor,
			FontFamily,
			FontSize,
			Heading,
			ImageBlock,
			ImageCaption,
			ImageInline,
			ImageInsert,
			ImageInsertViaUrl,
			ImageResize,
			ImageStyle,
			ImageTextAlternative,
			ImageToolbar,
			ImageUpload,
			Indent,
			IndentBlock,
			Italic,
			Link,
			LinkImage,
			List,
			ListProperties,
			MediaEmbed,
			Paragraph,
			PasteFromOffice,
			SimpleUploadAdapter,
			Strikethrough,
			Table,
			TableCaption,
			TableCellProperties,
			TableColumnResize,
			TableProperties,
			TableToolbar,
			TextTransformation,
			TodoList,
			Underline
		} = cloud.CKEditor;

		return {
			ClassicEditor,
			editorConfig: {
				toolbar: {
					items: [
						'heading',
						'|',
						'fontSize',
						'fontFamily',
						'fontColor',
						'fontBackgroundColor',
						'|',
						'bold',
						'italic',
						'underline',
						'strikethrough',
						'code',
						'|',
						'link',
						'insertImage',
						'mediaEmbed',
						'insertTable',
						'blockQuote',
						'|',
						'bulletedList',
						'numberedList',
						'todoList',
						'outdent',
						'indent'
					],
					shouldNotGroupWhenFull: false
				},
				plugins: [
					Autoformat,
					AutoImage,
					Autosave,
					BlockQuote,
					Bold,
					CloudServices,
					Code,
					Essentials,
					FontBackgroundColor,
					FontColor,
					FontFamily,
					FontSize,
					Heading,
					ImageBlock,
					ImageCaption,
					ImageInline,
					ImageInsert,
					ImageInsertViaUrl,
					ImageResize,
					ImageStyle,
					ImageTextAlternative,
					ImageToolbar,
					ImageUpload,
					Indent,
					IndentBlock,
					Italic,
					Link,
					LinkImage,
					List,
					ListProperties,
					MediaEmbed,
					Paragraph,
					PasteFromOffice,
					SimpleUploadAdapter,
					Strikethrough,
					Table,
					TableCaption,
					TableCellProperties,
					TableColumnResize,
					TableProperties,
					TableToolbar,
					TextTransformation,
					TodoList,
					Underline,
                    MyCustomUploadAdapterPlugin
				],
				fontFamily: {
					supportAllValues: true
				},
				fontSize: {
					options: [10, 12, 14, 'default', 18, 20, 22],
					supportAllValues: true
				},
				heading: {
					options: [
						{
							model: 'paragraph',
							title: 'Paragraph',
							class: 'ck-heading_paragraph'
						},
						{
							model: 'heading1',
							view: 'h1',
							title: 'Heading 1',
							class: 'ck-heading_heading1'
						},
						{
							model: 'heading2',
							view: 'h2',
							title: 'Heading 2',
							class: 'ck-heading_heading2'
						},
						{
							model: 'heading3',
							view: 'h3',
							title: 'Heading 3',
							class: 'ck-heading_heading3'
						},
						{
							model: 'heading4',
							view: 'h4',
							title: 'Heading 4',
							class: 'ck-heading_heading4'
						},
						{
							model: 'heading5',
							view: 'h5',
							title: 'Heading 5',
							class: 'ck-heading_heading5'
						},
						{
							model: 'heading6',
							view: 'h6',
							title: 'Heading 6',
							class: 'ck-heading_heading6'
						}
					]
				},
				image: {
					toolbar: [
						'toggleImageCaption',
						'imageTextAlternative',
						'|',
						'imageStyle:inline',
						'imageStyle:wrapText',
						'imageStyle:breakText',
						'|',
						'resizeImage'
					]
				},
				initialData:
                    '',
                licenseKey: LICENSE_KEY,
				link: {
					addTargetToExternalLinks: true,
					defaultProtocol: 'https://',
					decorators: {
						toggleDownloadable: {
							mode: 'manual',
							label: 'Downloadable',
							attributes: {
								download: 'file'
							}
						}
					}
				},
				list: {
					properties: {
						styles: true,
						startIndex: true,
						reversed: true
					}
				},
                simpleUpload: {
                    uploadUrl: 'http://localhost:8000/image/upload',
                },
				placeholder: '내용을 입력하세요',
				table: {
					contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
				}
			}
		};
	}, [cloud, isLayoutReady]);

    // CKEditor의 내용이 변경될 때 호출되는 함수
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setContents(data);
    };

    return (
        <div className="blog-write">
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="category-select"
            >
                <option value="" disabled hidden>
                    게시판 선택
                </option>
                <option value="1">후기</option>
                <option value="2">활동</option>
                <option value="3">정보</option>
                <option value="4">성과물</option>
            </select>
            <input
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="title-input"
            />
            <div className="main-container">
                <div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
                    <div className="editor-container__editor">
                        <div ref={editorRef}>
                            {ClassicEditor && editorConfig && (
                                <CKEditor 
                                    editor={ClassicEditor} 
                                    config={editorConfig}
                                    data={contents} // 초기 데이터 설정
                                    onChange={handleEditorChange} // 변경 이벤트 처리
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
			<div className="tag-input">
				<div className="tag-list">
					{tags.map((tag, index) => (
						<span key={index} className="tag">
							#{tag}
							<button className="remove-tag-button" onClick={() => handleTagRemove(tag)}>
								×
							</button>
						</span>
					))}
					{tags.length < MAX_TAGS && ( // 조건부 렌더링
						<input
							type="text"
							placeholder="#태그 입력"
							onKeyDown={handleTagInput}
							className="tag-input-field"
						/>
					)}
				</div>
			</div>
            <div className="buttons-container">
                <button className="submit-button" onClick={handleSubmit}>
                    {postToEdit 
                        ? (isMyPageEdit ? "수정 완료" : "수정 완료") 
                        : "완료"}
                </button>
            </div>
        </div>
    );
};

export default BlogWrite;
