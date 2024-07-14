import { useEffect, useState } from "react";
import TestCard from "../../components/ui/TestCard";

const Tests = () => {
  const [tests, setTests] = useState([]);

  // Load tests here
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch('http://localhost:3000/tests/get-tests');
        const data = await response.json();
        setTests(data.data); // Assuming the data contains the tests in data.data
      } catch (err) {
        console.log(err);
      }
    };

    fetchTests();
  }, []);

  console.log(tests);

  return (
    <div className="max-w-screen-xl grid grid-cols-3 m-auto my-10 mb-20">
      {tests?.map((test) => (
        <TestCard key={test.id} test={test}></TestCard>// Assuming each test has a unique id
      ))}
    </div>
  );
};

export default Tests;