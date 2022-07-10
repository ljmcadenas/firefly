export interface MessageBanner {
	title: string;
	body: string;
	okAction?: Pick<MessageBannerAction, 'label'>;
	cancelAction?: Pick<MessageBannerAction, 'label'>;
}

export interface MessageBannerWithCallback extends MessageBanner {
	okAction: MessageBannerAction;
	cancelAction: MessageBannerAction;
}

interface MessageBannerAction {
	label?: string;
	callback: () => void;
}
