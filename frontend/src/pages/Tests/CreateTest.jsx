import { useState } from "react";
import { MdLibraryAdd } from "react-icons/md";
// import { AuthContext } from "../../context/AuthProvider";
// import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";

const CreateTest = () => {
  const [questions, setQuestions] = useState([]);
  // const {user} = useContext(AuthContext);
  const course = useLoaderData();
  console.log(course);

  const [type, setType] = useState("");

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    // Use FormData to get form data
    const formData = new FormData(form);
    // Retrieve values from formData
    const question = formData.get("question");
    const category = formData.get("category");
    console.log(question, category);
    let Obj;
    if(type === 'Compulsory') {
        Obj = {
            question: question,
            category: category,
          };
    }else {
        Obj = {
            question: question,
            category: type,
          };
    }
   

    setQuestions([...questions, Obj]);
    console.log(questions);
  };
  console.log(questions);

  const handleSubmitQuiz = async (e) => {
    e.preventDefault();
    //calling the form with event.target
    const form = e.target;
    // Use FormData to get form data
    const formData = new FormData(form);

    console.log("Questions sent successfully");

    let serializedArray = JSON.stringify(questions);
    const title = formData.get("title");
    const time = formData.get("time");
    // const suggestion_low = formData.get("suggestion_low");
    // const suggestion_medium = formData.get("suggestion_medium");
    // const suggestion_high = formData.get("suggestion_high");

    formData.append("questions", serializedArray);
    // formData.append('creator_id', user?.teacher_id);
    // formData.append('course_id', course?.course_id);

    console.log("quiz submitted");
    console.log(time, title, formData);
    console.log(formData.get("questions"));

    try {
      const response = await fetch("http://localhost:3000/tests/create-test", {
        method: "POST",
        // body: formData,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questions: questions,
          time: time,
          title: title,
          type : type
        //   suggestion_low: suggestion_low,
        //   suggestion_medium: suggestion_medium,
        //   suggestion_high: suggestion_high,
        }),
      });

      if (!response.ok) {
        throw new Error("Error sending questions to server");
      }

      console.log("Questions sent successfully");
      // Clear the questions array after sending to server
      setQuestions([]);
    } catch (error) {
      console.error("Error sending questions to server:", error);
    }
  };

  return (
    <div className="p-4 w-[90%] m-auto mt-5 bg-base-200 rounded-xl">
      <h1 className="text-3xl mb-3 text-primary bg-base-50 py-2 text-center">
        Create new Test
      </h1>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <form onSubmit={handleSubmitQuiz} className="border-3 p-8">
        <label className="input input-bordered border border-white flex items-center gap-2 my-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>

          <input
            type="text"
            name="title"
            className="grow"
            placeholder="Title for this test"
          />
        </label>
        <div className="grid grid-cols-2 items-center gap-5">
          <label className="input input-bordered border border-white flex items-center gap-2 my-2 col-span-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>

            <input
              type="text"
              name="time"
              className="grow"
              placeholder="Approximete time for this test"
            />
          </label>
          <select
            onChange={handleTypeChange}
            name="type"
            className="select select-bordered w-full"
          >
            <option disabled selected>
              Select a type?
            </option>
            <option>Compulsory</option>
            <option>adhd</option>
            <option>depression</option>
            <option>anxiety</option>
            <option>stress</option>
          </select>
        </div>
        <div className="p-3 border border-white rounded-xl mt-4">
          <textarea
            type="text"
            name="suggestion_low"
            className="textarea textarea-primary w-full my-2"
            placeholder="Suggestion Low"
          ></textarea>
          <textarea
            type="text"
            name="suggestion_medium"
            className="textarea textarea-primary w-full my-2"
            placeholder="Suggestion-medium"
          ></textarea>
          <textarea
            type="text"
            name="suggestion_high"
            className="textarea textarea-primary w-full my-2"
            placeholder="Suggestion-high"
          ></textarea>
        </div>

        {/* <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
            <input type="text" name="lesson_id" className="grow" placeholder="Enter suggestions Medium" />
            </label>
            <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
            <input type="text" name="lesson_id" className="grow" placeholder="Enter suggestions High" />
            </label> */}

        {/*
                    displaying questions  
             */}
        {questions.length > 0 && (
          <div className="mt-4 bg-base-300 rounded-2xl p-6 mb-2">
            <h2 className="text-2xl font-semibold mb-2">Current Questions:</h2>
            <ul>
              {questions.map((q, index) => (
                <div key={index} className="my-3 rounded-xl">
                  <div className="flex items-center justify-between text-2xl border-l border-white p-2 shadow-lg">
                    <h3 className="text-white">{q.question}</h3>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        )}
        <button type="submit" className="btn btn-primary w-full mt-2">
          Create Quiz
        </button>
      </form>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form onSubmit={handleSubmit} className="border-3 p-8">
            <h1 className="flex items-center gap-3 text-4xl font-semibold text-primary mb-5">
              <MdLibraryAdd />
              New Question
            </h1>
            {/* name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-primary ">
                  Enter the question?
                </span>
                <span className="label-text-alt"></span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                name="question"
                placeholder="Enter the question here"
                required
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-primary ">
                  Enter the question?
                </span>
                <span className="label-text-alt"></span>
              </label>
              <select
                name="category"
                className="select select-bordered w-full"
                disabled={type !== "Compulsory"}
              >
                <option disabled selected>
                  Select a type?
                </option>
                <option>adhd</option>
                <option>anxiety</option>
                <option>depression</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full inline-block px-6 py-2 border-2 mt-5 border-primary text-xl text-primary font-medium leading-normal uppercase rounded hover:bg-primary hover:text-white  focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            >
              ADD QUESTION
            </button>

            {/* <button type="submit" className="btn btn-primary">Primary</button> */}
          </form>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn btn-primary rounded-full absolute top-5 right-5">
                <span> X </span>
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <button
        onClick={() => document.getElementById("my_modal_4").showModal()}
        className="btn btn-primary w-full"
      >
        Add question
      </button>
      {/* <button className="btn w-full mt-2" onClick={sendQuestionsToServer}>Create Quiz</button> */}
    </div>
  );
};

export default CreateTest;
