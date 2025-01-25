export default interface Board {
    boardNumber : number;
    title : string;
    content : string;
    boardImageList : string[];
    wrtieDateTime : string; 
    wrtierEmail : string;
    writerNickname : string;
    writerProfileImage : string | null;
}