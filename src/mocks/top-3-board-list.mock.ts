import { BoardListItem } from "types/interface";

const top3BoardListMock : BoardListItem[] = [
    {
        "boardNumber" : 1,
        "title" : "취업하고 싶어요...",
        "content" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem ipsum dolor sit. Volutpat odio facilisis mauris sit amet massa. Commodo odio aenean sed adipiscing diam donec adipiscing tristique. Mi eget mauris pharetra et. Non tellus orci ac auctor augue. Elit at imperdiet dui accumsan sit. Ornare arcu dui vivamus arcu felis. Egestas integer eget aliquet nibh praesent. In hac habitasse platea dictumst quisque sagittis purus. Pulvinar elementum integer enim neque volutpat ac.",
        "boardTitleImage" : "https://images.unsplash.com/photo-1548387834-7bf05019e89b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fCVFQyU4MiVBQyVFQyU5RCVCNCVFQiVCMiU4NCVFRCU4RSU5MSVFRCU4MSVBQ3xlbnwwfHwwfHx8MA%3D%3D",
        "favoriteCount" : 0,
        "commentCount" : 0,
        "viewCount" : 0,
        "writeDatetime" : "2025.01.11. 10:46:00",
        "writeNickname" : "윈터러버",
        "writeProfileImage" : "data:image/jpeg;base64,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"
    },
    {
        "boardNumber" : 2,
        "title" : "이런저런 이야기...",
        "content" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem ipsum dolor sit. Volutpat odio facilisis mauris sit amet massa. Commodo odio aenean sed adipiscing diam donec adipiscing tristique. Mi eget mauris pharetra et. Non tellus orci ac auctor augue. Elit at imperdiet dui accumsan sit. Ornare arcu dui vivamus arcu felis. Egestas integer eget aliquet nibh praesent. In hac habitasse platea dictumst quisque sagittis purus. Pulvinar elementum integer enim neque volutpat ac.",
        "boardTitleImage" : null,
        "favoriteCount" : 0,
        "commentCount" : 0,
        "viewCount" : 0,
        "writeDatetime" : "2025.01.11. 10:46:00",
        "writeNickname" : "ESFJ",
        "writeProfileImage" : null
    },
    {
        "boardNumber" : 3,
        "title" : "오늘도 코딩중...",
        "content" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem ipsum dolor sit. Volutpat odio facilisis mauris sit amet massa. Commodo odio aenean sed adipiscing diam donec adipiscing tristique. Mi eget mauris pharetra et. Non tellus orci ac auctor augue. Elit at imperdiet dui accumsan sit. Ornare arcu dui vivamus arcu felis. Egestas integer eget aliquet nibh praesent. In hac habitasse platea dictumst quisque sagittis purus. Pulvinar elementum integer enim neque volutpat ac.",
        "boardTitleImage" : null,
        "favoriteCount" : 0,
        "commentCount" : 0,
        "viewCount" : 0,
        "writeDatetime" : "2025.01.11. 10:46:00",
        "writeNickname" : "INTJ",
        "writeProfileImage" : null
    }
]
export default top3BoardListMock;