import { createContext, useContext, useEffect, useState } from "react"
import * as tf from '@tensorflow/tfjs'
import * as toxicity from '@tensorflow-models/toxicity'

const ModelContext = createContext()

export const ModelProvider = ({children}) => {
    const [model, setModel] = useState({});
    const threshold = 0.8
    useEffect(() => {
        toxicity.load(threshold).then(loadedModel => {
            setModel(loadedModel);
        });
    }, [])

    return (
        <ModelContext.Provider value={model}>
            {children}
        </ModelContext.Provider>
    )
}

export const useToxicityModel = () => {
    return useContext(ModelContext);
}

export const getToxicityPredictions = async (model, sentences) => {
    let pred = await model.classify(sentences);
    let issues = []
    pred.forEach(obj => {

      console.log(obj.label + ' : ' + obj.results[0].match);

      if(obj.results[0].match !== false){
        issues.push(obj.label.toUpperCase());
      }
    })
    return issues;
  };





