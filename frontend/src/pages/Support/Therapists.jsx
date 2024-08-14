/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import potat from "../../assets/potat.jpg"
import chat from '../../assets/chat.png'

const Therapists = ({joinChat}) => {
    const [therapistList, setTherapistList] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/therapists")
        .then(res=> res.json())
        .then(res => {
            console.log(res.data);
            setTherapistList(res.data)
        })
    }, [])

    return (
        <div className="h-[680px] overflow-y-auto overflow-x-hidden bg-neutral">
          <h2 className='m-2 p-4 font-bold bg-gradient-to-r from-primary via-secondary to-accent text-[25px] text-neutral rounded-lg'>Available therapists:</h2>
          {therapistList.map((therapist) => {
            
              return (
                <div key={therapist.id} className="m-2 pl-4 bg-base-100 border border-info rounded-lg">
                    <div className="flex items-center justify-between rounded-lg">
                        <div className="flex items-center">
                        <img className="w-10 h-10 rounded-full ring-2 ring-neutral" src={potat} alt="Rounded avatar" />
                        <p  className="p-2 m-4 font-medium text-[20px]">
                            {therapist.username}
                        </p>
                        </div>
                        <button className="btn btn-primary ml-auto mr-3" title="Chat" onClick={() => joinChat(therapist, true)} >
                        <img src={chat} className="w-6 h-6" alt="Chat" />
                        </button>
                    </div>
                    <div className="flex pb-3 flex-wrap">
                        {therapist.categories.map((category, index) => (
                        <span
                            key={index}
                            className={`bg-${category.color}-100 text-${category.color}-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-${category.color}-400 border border-${category.color}-400`}
                        >
                            {category.category_name}
                        </span>
                        ))}
                    </div>
                </div>

              );
            
          })}
        </div>
    )
}

export default Therapists;