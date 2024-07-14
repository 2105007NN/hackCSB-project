/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const TakeTest = () => {
    const {user} = useContext(AuthContext);
    const data = useLoaderData().data;
    const test = data.test[0];
    const questions = data.questions;
    const options = data.options;
    console.log(test.id);
    const [answers, setAnswers] = useState([]);
    const [count, setCount] = useState(0);
    console.log(count);
    const handleOptionClick = (questionId, selectedOption) => {
        setCount(prevCount => prevCount + 1);
        let Obj = {
            question_id : questionId,
            option_id : selectedOption
        }
        setAnswers(prevAnswers => [...prevAnswers, Obj]);
        console.log(answers);
    };
    console.log(answers);


    const handleSubmit = async()=> {  
        fetch(`http://localhost:3000/tests/take-test`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                answers: answers,
                user_id : user?.id,
                test_id : test?.id
            }),
          })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Network response was not ok.');
          })
          .then(data => {
            console.log('Answers uploaded successfully:', data);
            window.location = `/result/${test.id}/${user?.id}`
          })
          .catch(error => {
            console.error('Error uploading result:', error);
          });
    }


    if(questions.length === count) {
        console.log('test completed');
        handleSubmit();
    }


    return (
        <div className="max-w-screen-xl m-auto">
            <div className="text-4xl text-center p-5">{test?.title}</div>
            <div className="my-60"></div>  
            <div className="bg-base-300 p-12 rounded-2xl">

                
            <progress className="progress progress-error bg-neutral" value={count*10} max={questions.length * 10}></progress>

<div className="carousel w-full bg-info rounded-2xl">
    {questions.map((question, index) => (
        <div
            key={question.id}
            id={`slide${index + 1}`}
            className="carousel-item relative w-full"
        >
            <div className="p-4 m-auto py-20">
                <h3 className="text-2xl m-auto text-center text-white font-semibold">{question.question}</h3>
                <div className="flex gap-20 items-center mt-10">
                    {options
                        .map(option => (
                            <a key={option.id} href={`#slide${index === questions.length - 1 ? 1 : index + 2}`}>
                                <button
                                    className="btn btn-lg btn-secondary text-xl text-white"
                                    onClick={()=>handleOptionClick(question?.id, option.id)}
                                >
                                    {option.name}
                                </button>
                            </a>
                        ))}
                </div>
            </div>
        </div>
    ))}
</div>
            </div>
            

            <div className="my-60"></div>
        </div>
    );
};

export default TakeTest;
