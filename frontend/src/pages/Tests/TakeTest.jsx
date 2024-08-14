/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const TakeTest = () => {
    const {user} = useContext(AuthContext);
    const data = useLoaderData().data;
    const test = data.test[0];
    console.log(test);
    const questions = data.questions;
    const options = data.options;
    console.log(test.id);
    const [answers, setAnswers] = useState([]);
    const [count, setCount] = useState(0);
    console.log(count);
    const handleOptionClick = (e,questionId, selectedOption) => {
        // e.preventDefault();
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
    const handleCompulsorySubmit = async()=> { 
        console.log('compulsory submitted'); 
        fetch(`http://localhost:3000/tests/take-compulsory-test`, {
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
            window.location = `/client/dashboard`
          })
          .catch(error => {
            console.error('Error uploading result:', error);
          });
    }
    console.log(test?.type);
    if(questions.length === count) {
        if(test?.type !== 'compulsory') {
            console.log('test completed');
            handleSubmit();
        }else {
            handleCompulsorySubmit();
        }    
    }
    

    return (
        <div className=" m-auto h-screen">
            <section className="py-24 bg-primary text-center text-white m-auto">
                <h3 className="text-5xl font-semibold text-center text-white">Take our quick {test?.title}</h3>
                <h4 className="text-xl max-w-2xl mx-auto mt-4">The questions are based on an evidence-based screening tool but are indicative only and do not form a formal diagnosis</h4>
            </section>
            {/* <div className="my-60"></div>   */}
            <div className="bg-base-300 p-12 rounded-2xl max-w-screen-xl mx-auto my-10">

                
            <progress className="progress progress-error bg-neutral" value={count*10} max={questions.length * 10}></progress>

<div className="carousel w-full rounded-2xl">
    {questions.map((question, index) => (
        <div
            key={question.id}
            id={`slide${index + 1}`}
            className="carousel-item relative w-full"
        >
            <div className="p-4 m-auto py-20">
                <h2 className="text-3xl text-center text-white font-semibold mb-4">Question - {count + 1}</h2>
                <div className="divider"></div>
                <h3 className="text-xl m-auto text-center text-white font-medium">
                    {question.question}
                </h3>
                <div className="flex gap-20 items-center mt-10">
                    {options
                        .map(option => (
                            <a key={option.id} href={`#slide${index === questions.length - 1 ? 1 : index + 2}`}>
                                <button
                                    className="btn btn-lg btn-secondary text-xl text-white"
                                    onClick={(e)=>handleOptionClick(e, question?.id, option.id)}
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
