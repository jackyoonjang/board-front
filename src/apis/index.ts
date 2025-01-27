import axios from "axios";
import { SignInRequestDto } from "./request/auth";
import SignUpRequestDto from './request/auth/sign-up.request.dto';
import { ResponseDto, SignInResponseDto } from "./response";
import { SignUpResponseDto } from "./response/auth";
import { GetSignInUserResponseDto, GetUserResponseDto, PatchNicknameResponseDto, PatchProfileImageResponseDto } from "./response/user";
import { PatchBoardRequestDto, PostBoardRequestDto, PostCommentRequestDto } from "./request/board";
import { PostBoardResponseDto, GetBoardResponseDto, IncreaseViewCountReponseDto, GetFavoriteListResponseDto, GetCommentListResponseDto, PutFavoriteResponseDto, PostCommentResponseDto, DeleteBoardResponseDto, PatchBoardResponseDto, GetLatestBoardListResponseDto, GetTop3BoardListResponseDto, GetSearchBoardListResponseDto, GetUserBoardListResponseDto } from "./response/board";
import { GetPopularListResponseDto, GetRelationListResponseDto } from "./response/search";
import { PatchNicknameRequestDto, PatchProfileImageRequestDto } from "./request/user";

const DOMAIN = 'http://13.124.182.162:4000';

const API_DOMAIN = `${DOMAIN}/api/v1`;

const authorization = (accessToken : string) => {return { headers: {Authorization: `Bearer ${accessToken}` } }}

const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;

// 로그인 요청(요청내용)
export const signInRequest = async (requestBody: SignInRequestDto) => {
    const result = await axios.post(SIGN_IN_URL(), requestBody)
        .then(response => {
            const responseBody: SignInResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if(!error.response.data) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
        return result;
}


// 회원가입 요청(요청내용)
export const signUpRequest = async (requestBody: SignUpRequestDto) => {
    const result = await axios.post(SIGN_UP_URL(), requestBody)
        .then(response => {
            const responseBody: SignUpResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if(!error.response.data) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
        return result;
}

const GET_BOARD_URL = (boardNumber: number | string ) => `${API_DOMAIN}/board/${boardNumber}`;
const GET_LATEST_BOARD_LIST_URL = () => `${API_DOMAIN}/board/latest-list`;
const GET_TOP_3_BOARD_LIST_URL = () => `${API_DOMAIN}/board/top-3`;
const GET_SEARCH_BOARD_LIST_URL = (searchWord: string, preSearchWord: string | null) => `${API_DOMAIN}/board/search-list/${searchWord}${preSearchWord ? '/' + preSearchWord : ''}`;
const GET_USER_BOARD_LIST_URL = (email: string) => `${API_DOMAIN}/board/user-board-list/${email}`;
const INCREASE_VIEW_COUNT_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}/increase-view-count`;
const GET_FAVORITE_LIST_URL = (boardNumber: number | string ) => `${API_DOMAIN}/board/${boardNumber}/favorite-list`;
const GET_COMMENT_LIST_URL = (boardNumber: number | string ) => `${API_DOMAIN}/board/${boardNumber}/comment-list`;
const POST_BOARD_URL = () => `${API_DOMAIN}/board`;
const POST_COMMENT_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}/comment`;
const PATCH_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}`; 
const PUT_FAVORITE_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}/favorite`; 
const DELETE_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}`;

// 게시물 가져오기 요청(게시물id)
export const getBoardRequest = async (boardNumber : number | string) => {
    const result = await axios.get(GET_BOARD_URL(boardNumber))
        .then(response => {
            const responseBody : GetBoardResponseDto = response.data;
            return responseBody;
        }).catch((error) => {
            if(!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

// 최신 게시물 요청
export const getLatestBoardListRequest = async () => {
    const result = await axios.get(GET_LATEST_BOARD_LIST_URL())
        .then((response) => {
            const responseBody : GetLatestBoardListResponseDto = response.data;
            return responseBody;
        }).catch((error) => {
            if(!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
}

// TOP3 게시물 요청
export const getTop3BoardListRequest = async () => {
    const result = await axios.get(GET_TOP_3_BOARD_LIST_URL())
        .then((response) => {
            const responseBody : GetTop3BoardListResponseDto = response.data;
            return responseBody;
        }).catch((error) => {
            if(!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
}

// 검색어로 게시물 조회
export const getSearchBoardListRequest = async (searchWord: string, preSearchWord: string | null) => {
    const result = await axios.get(GET_SEARCH_BOARD_LIST_URL(searchWord, preSearchWord))
    .then((response) => {
        const responseBody : GetSearchBoardListResponseDto = response.data;
        return responseBody;
    }).catch((error) => {
        if(!error.response) return null;
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
    });
return result;
}

// 로그인한 사용자가 작성한 게시글 불러오기
export const getUserBoardListRequest = async (email : string) => {
    const result = await axios.get(GET_USER_BOARD_LIST_URL(email))
    .then((response) => {
        const responseBody : GetUserBoardListResponseDto = response.data;
        return responseBody;
    }).catch((error) => {
        if(!error.response) return null;
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
    });
    return result;
}

// 조회수 증가 요청(path가 감지될 경우만)(게시물id)
export const increaseViewCountRequest = async (boardNumber: number | string) => {
    const result = await axios.get(INCREASE_VIEW_COUNT_URL(boardNumber))
        .then((response) => {
            const responseBody : IncreaseViewCountReponseDto = response.data;
            return responseBody;
        }).catch((error) => {
            if(!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
        return result;
}

// 좋아요 누른 사람들 리스트(게시물id)
export const getFavoriteListReqeust = async (boardNumber: number | string) => {
    const result = await axios.get(GET_FAVORITE_LIST_URL(boardNumber))
        .then((response) => {
            const responseBody: GetFavoriteListResponseDto = response.data;
            return responseBody;
        }).catch((error) => {
            if(!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
}

// 댓글 쓴 사람들 요청(게시물id)
export const getCommentListRequest = async (boardNumber:number | string) =>{
    const result = await axios.get(GET_COMMENT_LIST_URL(boardNumber))
        .then((response) => {
            const responseBody : GetCommentListResponseDto = response.data;
            return responseBody;
        }).catch((error) => {
            if(!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
        return result;
}


// 게시물 등록 요청(요청내용, 인증)
export const postBoardRequest = async (requestBody: PostBoardRequestDto, accessToken: string) => {
    const result = await axios.post(POST_BOARD_URL(), requestBody, authorization(accessToken))
        .then((response) => {
            const responseBody : PostBoardResponseDto = response.data;
            return responseBody;
        }).catch((error) => {
            if(!error.response) return null;
            const responseBody : ResponseDto = error.response.data;
            return responseBody
        });
    return result;
}

// 댓글 작성(게시물id, 요청내용, 인증)
export const postCommentRequest = async (boardNumber: number | string, requestBody : PostCommentRequestDto, accessToken: string) => {
    const result = await axios.post(POST_COMMENT_URL(boardNumber), requestBody, authorization(accessToken))
        .then((response) => {
            const responseBody : PostCommentResponseDto = response.data;
            return responseBody;
        }).catch((error) => {
            if(!error.response) return null;
            const responseBody : ResponseDto = error.response.data;
            return responseBody
        });
    return result;
}

// 게시물 수정
export const patchBoardRequest = async (boardNumber: number | string, requestBody: PatchBoardRequestDto, accessToken: string) => {
    const result = await axios.patch(PATCH_BOARD_URL(boardNumber), requestBody, authorization(accessToken))
        .then((response) => {
            const responseBody : PatchBoardResponseDto = response.data;
            return responseBody;
        }).catch((error) => {
            if(!error.response) return null;
            const responseBody : ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
}

// 좋아요 전송(게시물id, 인증)
export const putFavoriteRequest = async (boardNumber: number | string, accessToken: string) => {
    const result = await axios.put(PUT_FAVORITE_URL(boardNumber), {}, authorization(accessToken))
        .then((response) => {
            const responseBody : PutFavoriteResponseDto = response.data;
            return responseBody;
        }).catch((error) => {
            if(!error.response) return null;
            const responseBody : ResponseDto = error.response.data;
            return responseBody
        });
        return result;
}

// 게시물 삭제 요청(게시물id, 인증)
export const deleteBoardRequest = async (boardNumber: number | string, accessToken: string) => {
    const result = await axios.delete(DELETE_BOARD_URL(boardNumber), authorization(accessToken))
        .then((response) => {
            const responseBody : DeleteBoardResponseDto = response.data;
            return responseBody;
        }).catch((error) => {
            if(!error.response) return null;
            const responseBody : ResponseDto = error.response.data;
            return responseBody;
        });
    return result;

}

const GET_POPULAR_LIST_URL = () => `${API_DOMAIN}/search/popular-list`;
const GET_RELATION_LIST_URL = (searchWord: string) => `${API_DOMAIN}/search/${searchWord}/relation-list`;

// 인기 게시물 요청
export const getPopularListRequest = async () => {
    const result = await axios.get(GET_POPULAR_LIST_URL())
        .then((response) => {
            const responseBody : GetPopularListResponseDto = response.data;
            return responseBody;
        }).catch((error) => {
            if(!error.response) return null;
            const responseBody : ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
}

export const getRelationListRequest = async (searchWord: string) => {
    const result = await axios.get(GET_RELATION_LIST_URL(searchWord))
        .then((response) => {
            const responseBody : GetRelationListResponseDto = response.data;
            return responseBody;
        }).catch((error) => {
            if(!error.response) return null;
            const responseBody : ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
}

const GET_USER_URL = (email: string) => `${API_DOMAIN}/user/${email}`;
const GET_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;
const PATCH_NICKNAME_URL = () => `${API_DOMAIN}/user/nickname`;
const PATCH_PROFILE_IMAGE_URL = () => `${API_DOMAIN}/user/profile-image`;

// 마이페이지
export const getUserRequest = async (email:string) => {
    const result = await axios.get(GET_USER_URL(email))
        .then((response) => {
            const responseBody : GetUserResponseDto = response.data;
            return responseBody;
        }).catch((error) => {
            if(!error.response) return null;
            const responseBody : ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
}


// 로그인한 정보로 회원 정보 가져오기 요청(인증)
export const getSignInUserRequest = async (accessToken: string) => {
    const result = await axios.get(GET_SIGN_IN_USER_URL(),authorization(accessToken))
        .then((response) => {
            const responseBody : GetSignInUserResponseDto = response.data;
            return responseBody;
        }).catch((error) => {
            if(!error.response) return null;
            const responseBody : ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
}

// 이름 수정 요청
export const patchNicknameRequest = async (requestBody : PatchNicknameRequestDto, accessToken: string) => {
    const result = await axios.patch(PATCH_NICKNAME_URL(),requestBody,authorization(accessToken))
        .then((response) => {
            const responseBody : PatchNicknameResponseDto = response.data;
            return responseBody;
        }).catch((error) => {
            if(!error.response) return null;
            const responseBody : ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
}

// 프로필 이미지 수정 요청
export const patchProfileImageRequest = async (requestBody : PatchProfileImageRequestDto, accessToken: string) => {
    const result = await axios.patch(PATCH_PROFILE_IMAGE_URL(),requestBody,authorization(accessToken))
        .then((response) => {
            const responseBody : PatchProfileImageResponseDto = response.data;
            return responseBody;
        }).catch((error) => {
            if(!error.response) return null;
            const responseBody : ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
}

const FILE_DOMAIN = `${DOMAIN}/file`;

const FILE_UPLOAD_URL = () => `${FILE_DOMAIN}/upload`;

const mutipartFormDate = { headers : {'Content-Type':'mutipart/form-data'}}
// 파일 업로드 요청(데이터형식)
export const fileUploadRequest = async (data: FormData) => {
    const result = await axios.post(FILE_UPLOAD_URL(), data, mutipartFormDate)
        .then(response => {
            const responseBody : string = response.data;
            return responseBody;
        })
        .catch(error => {
            return null;
        })

    return result;

}