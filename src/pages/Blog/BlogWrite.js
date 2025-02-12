import React from "react";
import { writePost, updatePost } from "../../services/blogAPI";
import "../../styles/BlogWrite.css";
import {useLocation, useNavigate} from "react-router-dom";
import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react';
import UploadAdapter from './UploadAdapter';
import {useSelector} from "react-redux";


const LICENSE_KEY = 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NjgyNjIzOTksImp0aSI6ImQxMWFlMjhjLTRhNGEtNGQ4MC1hNTBmLTA3MTI5NmI5YjE4ZCIsImxpY2Vuc2VkSG9zdHMiOlsiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJ1c2FnZUVuZHBvaW50IjoiaHR0cHM6Ly9wcm94eS1ldmVudC5ja2VkaXRvci5jb20iLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIl0sImxpY2Vuc2VUeXBlIjoiZGV2ZWxvcG1lbnQiLCJmZWF0dXJlcyI6WyJEUlVQIl0sInZjIjoiZGMyZWIzYjUifQ.bGfz0zMJry9GHH6ANiZ8qqhYMFF94RHXyA0e9FVZLeMYpS1c02VFc4zm-KRJdYR7dgFnuGAvj8VvP9uPoV-Glw';

//확인
const BlogWrite = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const postToEdit = location.state?.post || null;
	const isMyPageEdit = location.state?.isMyPageEdit || false;
	const userRole = localStorage.getItem("userRole");
	const { isAuthenticated } = useSelector(state => state.auth);
	const allowedRoles = ["ROLE_USER", "ROLE_ADMIN"];

	useEffect(() => {
		if (!isAuthenticated || !allowedRoles.includes(userRole)) {
			alert("접근 권한이 없습니다.");
			navigate('/blog');
			return;
		}
	}, [isAuthenticated, userRole, navigate]);

	const [tags, setTags] = useState(postToEdit?.tag || []);
	const [uploadedImages, setUploadedImages] = useState(postToEdit?.image || []);
	const MAX_TAGS = 10;

	const [title, setTitle] = useState(postToEdit?.title || "");
	const [contents, setContents] = useState(postToEdit?.contents || "");
	const [image, setImage] = useState(null);


	function MyCustomUploadAdapterPlugin(editor) {
		editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
			return new UploadAdapter(loader, (imageUrl) => {
				setUploadedImages(prev => {
					if (!prev.includes(imageUrl)) {
						return [...prev, imageUrl];
					}
					return prev;
				});
			});
		}
	}

	// boardType 설정 로직 수정
	const boardType = useMemo(() => {
		if (location.state?.boardType) {
			return location.state.boardType;
		}
		if (location.pathname.includes("/notice")) {
			return "notice";
		} else if (location.pathname.includes("/board")) {
			return "blog";
		}
		return "";
	}, [location.pathname, location.state?.boardType]);


	// 카테고리 초기값 설정 수정
	const [category, setCategory] = useState(
		postToEdit?.category || ""
	);

	// 게시판 옵션 수정 - 값과 텍스트를 명확히 구분
	const boardOptions = useMemo(() => {
		if (boardType === "notice") {
			return [<option value="0" key="0">공지사항</option>];
		}
		if (boardType === "blog") {
			return [
				<option value="1" key="1">성과</option>,
				<option value="2" key="2">정보</option>,
				<option value="3" key="3">후기</option>,
				<option value="4" key="4">활동</option>
			];
		}
		return [];
	}, [boardType]);


	const handleTagInput = (e) => {
		if ((e.key === 'Enter' || e.key === ',') && e.target.value.trim() !== '') {
			e.preventDefault();
			const newTag = e.target.value.trim();
			if (tags.length >= MAX_TAGS) {
				return;
			}
			if (!tags.includes(newTag)) {
				setTags((prevTags) => [...prevTags, newTag]);
			}
			e.target.value = '';
		}
	};

	const handleTagRemove = (tagToRemove) => {
		setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
	};

	// handleSubmit 함수 수정
	const handleSubmit = async () => {
		if (!category) {
			alert("게시판을 선택해주세요.");
			return;
		}

		try {
			const postData = {
				boardCategory: category,
				boardTitle: title,
				boardContent: contents,
				tag: tags,
			};

			if (postToEdit) {
				await updatePost({
					id: postToEdit.id,
					...postData,
					imageUrls: uploadedImages
				}, image);
				alert("게시물이 수정되었습니다.");
			} else {
				await writePost(postData, image);
				alert("게시물이 등록되었습니다.");
			}

			navigate(isMyPageEdit ? `/users/mypage` : `/${boardType}`);
			window.scrollTo(0, 0);
			window.location.reload();
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
				// BlogWrite.js의 editorConfig 내 image 설정을 다음과 같이 수정

				image: {
					resizeOptions: [
						{
							name: 'resizeImage:original',
							value: null,
							label: '원본 크기'
						},
						{
							name: 'resizeImage:50',
							value: '50',
							label: '50%'
						},
						{
							name: 'resizeImage:75',
							value: '75',
							label: '75%'
						}
					],
					resizeUnit: '%',
					toolbar: [
						'imageStyle:inline',
						'imageStyle:block',
						'imageStyle:side',
						'|',
						'toggleImageCaption',
						'imageTextAlternative',
						'resizeImage'
					],
					styles: {
						options: [
							'inline',
							'block',
							'side'
						]
					}
				},
				initialData: '',
				licenseKey: LICENSE_KEY,
				link: {
					addTargetToExternalLinks: true,
					defaultProtocol: 'https://'
				},
				simpleUpload: {
					uploadUrl: '/api/blog/upload-image',
				},
				placeholder: '내용을 입력하세요',
				table: {
					contentToolbar: [
						'tableColumn',
						'tableRow',
						'mergeTableCells',
						'tableProperties',
						'tableCellProperties'
					]
				}
			}
		};
	}, [cloud, isLayoutReady]);

	const handleEditorChange = (event, editor) => {
		const data = editor.getData();
		setContents(data);

		// 에디터 내용에서 이미지 URL 추출
		const parser = new DOMParser();
		const doc = parser.parseFromString(data, 'text/html');
		const images = Array.from(doc.querySelectorAll('img'));
		const currentImageUrls = images
			.map(img => img.getAttribute('src'))
			.filter(src => src && src.startsWith('/api/blog/images/'));

		setUploadedImages(currentImageUrls);
	};

	return (
		<div className="blog-write">
			<select
				value={category}
				onChange={(e) => setCategory(e.target.value)}
				className="category-select"
			>
				<option value="" disabled>게시판 선택</option>
				{boardOptions}
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
									data={contents}
									onChange={handleEditorChange}
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
					{tags.length < MAX_TAGS && (
						<input
							type="text"
							placeholder="#태그 입력"
							onKeyDown={handleTagInput}
							className="tag-input-field"/>
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