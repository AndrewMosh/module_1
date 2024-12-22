import './Document.scss'


export const Document = ({ id }: { id: string }) => {
	console.log(id);
	return (
		<div className="document">
			<h1>Document</h1>
		</div>
	);
};