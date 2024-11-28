export const fetchPosts = async (page, size) => {
    const response = await fetch(`/blog?page=${page}&size=${size}`);
    if (!response.ok) {
        throw new Error("게시물 데이터를 가져오는 데 실패했습니다.");
    }
    return response.json();
};

export const fetchPostDetail = async (boardId) => {
    const response = await fetch(`/board/view/${boardId}`);
    if (!response.ok) {
        throw new Error("게시물 상세 데이터를 가져오는 데 실패했습니다.");
    }
    return response.json();
};

export const writePost = async (formData) => {
    const response = await fetch("/board/save", {
        method: "POST",
        body: formData, // FormData 객체 전달
    });

    if (!response.ok) {
        throw new Error("글 등록 실패");
    }

    return response.json();
};


export const searchPosts = async (searchQuery, tag) => {
    const response = await fetch(`/board/search?search=${searchQuery}&tag=${tag}`);
    if (!response.ok) {
        throw new Error("검색 결과를 가져오는 데 실패했습니다.");
    }
    return response.json();
};

export const updatePost = async (post) => {
    const response = await fetch("/board/write", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    });

    if (!response.ok) {
        throw new Error("게시물 수정 실패");
    }

    return response.json();
};

export const deletePost = async (boardId) => {
    const response = await fetch(`/board/delete`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ boardId }),
    });

    if (!response.ok) {
        throw new Error("게시물 삭제 실패");
    }

    return response.json();
};
