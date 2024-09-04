export type User = { name: string; userName: string; numberOfFriends: number };

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

export type Message = {
	messageId: string;
	sender: string;
	receiver: string;
	message: string;
	timestamp: Date;
};
