const Loading = () => {
    return (
        <div className="flex justify-center items-center">
        <div className="spinner-border animate-spin inline-block w-24 h-24 mt-20 border-4 rounded-full" role="status">
            <span className="visually-hidden">..</span>
        </div>
        </div>
    );
};

export default Loading;