import { useLoaderData } from "react-router-dom";

const TakeTest = () => {
    const data = useLoaderData().data;
    const test = data.test[0];
    const questions = data.questions;
    const options = data.options;

    console.log('test', test, 'questions' , questions, 'options', options);

    return (
        <div>
            <p>hello</p>
            <h1>{test?.title}</h1>
        </div>
    );
};

export default TakeTest;