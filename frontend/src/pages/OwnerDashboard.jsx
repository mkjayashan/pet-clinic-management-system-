import { useEffect, useState } from "react";
import api from "../api/api";
import DashboardLayout from "../layouts/DashboardLayout";

export default function OwnerDashboard() {

  const [questions, setQuestions] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
  });


  const load = async () => {
    const res = await api.get("/my-questions");
    setQuestions(res.data);
  };


  useEffect(() => {
    const role = localStorage.getItem("role");

    if(role !== "owner"){
      window.location.href="/login";
      return;
    }

    load();

  },[]);



  const submitQuestion = async () => {

    await api.post("/question", form);

    setForm({
      title:"",
      description:"",
      category:""
    });

    load();
  };



  return (

    <DashboardLayout>


      <div className="min-h-screen bg-gray-100 p-6">


        {/* HEADER */}

        <div className="
          bg-white
          shadow-xl
          rounded-2xl
          p-6
          mb-6
          border
        ">


          <h1 className="
            text-3xl
            font-bold
            text-blue-600
          ">
            🐶 Owner Dashboard
          </h1>


          <p className="text-gray-500 mt-2">
            Ask questions and communicate with pet clinics
          </p>


        </div>





        {/* QUESTION FORM */}


        <div className="
          bg-white
          shadow-xl
          rounded-2xl
          p-6
          mb-6
        ">


          <h2 className="
            text-xl
            font-bold
            mb-4
          ">
            ✏️ Ask a Question
          </h2>



          <div className="grid gap-4">


            <input
            className="
            border
            p-3
            rounded-xl
            focus:ring-2
            focus:ring-blue-400
            outline-none
            "
            placeholder="Question title"
            value={form.title}
            onChange={(e)=>
              setForm({...form,title:e.target.value})
            }
            />



            <textarea

            className="
            border
            p-3
            rounded-xl
            focus:ring-2
            focus:ring-blue-400
            outline-none
            "

            placeholder="Describe your problem"

            value={form.description}

            onChange={(e)=>
              setForm({...form,description:e.target.value})
            }

            />



            <input

            className="
            border
            p-3
            rounded-xl
            focus:ring-2
            focus:ring-blue-400
            outline-none
            "

            placeholder="Category"

            value={form.category}

            onChange={(e)=>
              setForm({...form,category:e.target.value})
            }

            />




            <button

            onClick={submitQuestion}

            className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-3
            rounded-xl
            font-semibold
            "

            >

            Submit Question

            </button>



          </div>


        </div>





        {/* QUESTIONS */}


        <div>

        <h2 className="
          text-xl
          font-bold
          mb-4
        ">
          📌 My Questions
        </h2>



        <div className="grid gap-5">


        {
        questions.map((q)=>(

        <div

        key={q.id}

        className="
        bg-white
        rounded-2xl
        shadow-lg
        p-6
        border-l-4
        border-blue-500
        hover:shadow-xl
        transition
        ">


          <h3 className="
          text-xl
          font-bold
          text-gray-800
          ">

          {q.title}

          </h3>



          <p className="text-gray-600 mt-2">

          {q.description}

          </p>



          <span className="
          inline-block
          mt-3
          bg-blue-100
          text-blue-700
          px-3
          py-1
          rounded-full
          text-sm
          ">

          {q.category}

          </span>




          <div className="mt-5">


          <h4 className="
          font-bold
          text-green-600
          ">

          Answers

          </h4>



          {
          q.answers?.length > 0 ?

          q.answers.map(a=>(

          <div

          key={a.id}

          className="
          bg-green-50
          mt-2
          p-3
          rounded-xl
          "

          >

          🐾 {a.answer}

          </div>

          ))

          :

          <p className="
          text-red-500
          text-sm
          mt-2
          ">

          No answers yet

          </p>

          }


          </div>



        </div>


        ))

        }


        </div>

        </div>




      </div>


    </DashboardLayout>

  );

}