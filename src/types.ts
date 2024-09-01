export type Chat = {
	chatId: string;
	lastMessageAt: string;
	chatType: string;
	participants: string[];
	groupName?: string;
};
export type FriendRequest = {
	to: string;
	requestId: string;
	timeStamp: string;
};
export type ReceivedFriendRequest = {
	from: string;
	requestId: string;
	timeStamp: string;
};
