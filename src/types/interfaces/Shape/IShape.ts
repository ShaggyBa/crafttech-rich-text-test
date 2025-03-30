type TShapeStyle = {
	fill: string;
	stroke: string;
	strokeWidth: number;
	type: string;
}

export interface IShape {
	id: string;
	width: number;
	height: number;
	x: number;
	y: number;
	html: string;
	text: string;
	style: TShapeStyle
}
