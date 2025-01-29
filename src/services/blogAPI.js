import axios from 'axios';

export const fetchPosts = async (page, size, tag = "", query = "", category = "") => {
    let url = `/blog?page=${page}&size=${size}`;

    // 카테고리, 태그, 검색어가 있을 경우 쿼리 파라미터 추가
    if (tag) url += `&tag=${tag}`;
    if (query) url += `&query=${query}`;
    if (category) url += `&category=${category}`;

    const response = await axios(url);

    if (!response.ok) {
        throw new Error("게시물 데이터를 가져오는 데 실패했습니다.");
    }

    return response.json();
};

export const fetchPostDetail = async (boardId) => {
    const response = await axios(`/board/view/${boardId}`);
    if (!response.ok) {
        throw new Error("게시물 상세 데이터를 가져오는 데 실패했습니다.");
    }
    return response.json();
};

export const fetchAdjacentPosts = async (boardId) => {
    const response = await axios(`/board/adjacent/${boardId}`);
    if (!response.ok) {
        throw new Error("이전/다음 글 데이터를 가져오는 데 실패했습니다.");
    }
    return response.json();
};


export const writePost = async (formData) => {
    try {
        const response = await axios.post("/api/blog/save", formData, {
            headers: {
                "Content-Type": "application/json",  // JSON 형식으로 전송
            }
        });

        return response.data;  // 서버 응답 반환
    } catch (error) {
        throw new Error("글 등록 실패: " + error.message);
    }
};


export const searchPosts = async (searchQuery, tag) => {
    const response = await axios(`/api/blog/search?search=${searchQuery}&tag=${tag}`);
    if (!response.ok) {
        throw new Error("검색 결과를 가져오는 데 실패했습니다.");
    }
    return response.json();
};

export const updatePost = async (formData) => {
    try {
        const response = await axios.post("/api/blog/update", formData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        throw new Error("글 수정 실패: " + error.message);
    }
};


export const deletePost = async (boardId) => {
    try {
        const response = await axios.post(`/api/blog/delete`, boardId, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response;
    } catch (error) {
        throw new Error("글 삭제 실패: " + error.message);
    }
};
