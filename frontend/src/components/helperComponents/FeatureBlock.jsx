/* eslint-disable react/prop-types */
import "daisyui/dist/full.css";

const FeatureBlock = ({ title, description, imageUrl }) => {
	return (
		<div className="flex flex-col md:flex-row min-h-full bg-base-200">
			<div className="md:w-1/2 p-8 flex items-center">
				<div>
					<h1 className="text-4xl font-bold text-primary mb-4">
						{title}
					</h1>
					<p className="text-lg text-secondary">{description}</p>
				</div>
			</div>
			<div className="md:w-1/2 flex items-center justify-center bg-gray-200">
				<img src={imageUrl} alt={title} className="max-w-full h-auto max-h-96"/>
			</div>
		</div>
	);
};

export default FeatureBlock;
