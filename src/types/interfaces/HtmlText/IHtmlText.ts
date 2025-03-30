export interface IHtmlText {
	html: string;
	id: string;
	width?: number;
	height?: number;
	isEditing: boolean
	setValue: React.Dispatch<React.SetStateAction<string>>;
	onCallbackHandler: React.EffectCallback;
}