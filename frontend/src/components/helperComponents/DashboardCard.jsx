import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardCard = ({ title, description, srcImg, targetUrl }) => {

    const navigate = useNavigate();
    const handleBtn = () => {
        navigate(targetUrl, {replace : false});
    }

	return (
		<div className="card bg-base-100 image-full w-96 shadow-xl">
			<figure>
				<img src={srcImg} alt="Shoes" />
			</figure>
			<div className="card-body ">
				<h2 className="card-title text-white">{title}</h2>
				<p className="font-md text-white">{description}</p>
				<div className="card-actions justify-end">
					<button onClick={handleBtn}
                    className="btn btn-primary">TRY NOW</button>
				</div>
			</div>
		</div>
	);
};

export default DashboardCard;
