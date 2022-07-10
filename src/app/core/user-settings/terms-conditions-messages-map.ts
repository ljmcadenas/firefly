import { TermsConditionsMessage } from './models/terms-conditions-message.interface';

export const TERMS_CONDITIONS_MESSAGES_MAP: {
	[key: string]: TermsConditionsMessage;
} = {
	trackData: {
		title: 'Welcome!',
		body: 'Before you get to carried away, do you agree to us collecting anonimized statistics about your usage of our app?',
	},
	extra: {
		title: 'Extra!',
		body: 'How does it look?',
	},
};
