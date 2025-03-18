"use client";
import React, { useState,useEffect } from 'react';
import http from './services/httpService';
import Navbar from "./navbar";
import Image from "next/image";
import './globals.css';
import Container from './container';

export default function Home() {
  const [data, setData] = useState(null);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, settitle] = useState('');
  const [desc, setdesc] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
   fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await http.get('/todos');
      console.log(response.data)
      setData(response.data.todos);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const {currentTarget:input}=e;
    input.name==='title'?settitle(input.value):setdesc(input.value);

  };

    const postData=async (url,obj)=>{
        let response=await http.post(url,obj);
        settitle('');
        setdesc('');
        setId('');
        fetchData();
    }
    const putData=async (url,obj)=>{
        let response=await http.put(url,obj);
        setEdit(false);
        settitle('');
        setdesc('');
        setId('');
        fetchData();

    }
    const handleSubmit=(e)=>
    {   e.preventDefault();
        edit?putData(`/todos/${id}`,{title,desc})
        :postData("/todos",{title,desc});
    }

    const handleContainer=(data)=>{
      setEdit(true);
      settitle(data.title);
      setdesc(data.desc);
      setId(data._id);
    }
    const handleDelete=async (id)=>{
      let response=await http.deleteApi(`/todos/${id}`);
      settitle('');
      setdesc('');
      setId('');
      fetchData();
    }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return (
    <div>
      <Navbar/>
      <div className="w-[1125px] h-[1823px] mt-[59px] ml-[114px] gap-[72px] flex">
        <div className="w-[401px] h-[1823px] gap-[16px]">
          <div className="row ">
            <div className="col-6">
              <button className="w-[100px] h-[48px] gap-[8px] rounded-[8px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] btn btn-dark" onClick={handleSubmit} disabled={title===''||desc===''} > 
                <div className="row">
                  <div className="col-6">
                    <Image 
                      src="/Addotes.png" 
                      alt="Addotes" 
                      width={20} 
                      height={20} 
                    />
                  </div>
                  <div className="col-4 p-0">
                    <span className="w-[40px] h-[21px] font-poppins font-medium text-sm leading-none tracking-normal align-middle" >
                      TODO
                    </span>
                  </div>
                </div>
              </button>
            </div>
            <div className="col-6"> 
              <button className="btn btn-light w-[56px] h-[48px] gap-[8px] rounded-[8px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] float-right">
                <Image
                  src="/Vector.png"
                  alt="Vector"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
          <div className="container w-[401px] h-[1759px] gap-[15px] mt-2">
            {data.map(st=>{
              return <Container data={st} handleContainer={handleContainer}/>})}
          </div>
        </div>
        <div className="w-[652px] h-[736px] gap-4 pt-[35px] pr-[42px] pb-[35px] pl-[42px] border bg-white">
          <div className="w-[545px] h-[54px] flex items-center justify-between ">
            <div className="w-[521px] h-[54px] float-left font-poppins font-semibold text-[36px] leading-none tracking-[0.02em]">
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleInputChange}
              className="ml-0 mt-1 block w-full  py-2 outline-none border border-white rounded-md"
              placeholder="Add Title"
            />
            </div>
            <div className="w-[20px] h-[20px] float-right" onClick={()=>handleDelete(id)}>
              <Image
                  src="/Glyph_undefined.png" 
                  alt="Glyph_undefined" 
                  width={20} 
                  height={20} 
                />
            </div>
          </div>
          <div className="w-[561px] h-[49px] top-[105px] left-[42px] rounded-tl-[20px] rounded-tr-[20px] border-b-2 flex items-center">
            <Image
                className="w-[10px] h-[14px] mr-5"
                src="/B.png" 
                alt="B" 
                width={10} 
                height={14} 
            />
            <Image
                className="w-[10px] h-[14px] mr-5"
                src="/vector_1.png" 
                alt="vector_1" 
                width={10} 
                height={14} 
            />
            <Image
                className="w-[10px] h-[14px] mr-5"
                src="/vector_2.png" 
                alt="vector_2" 
                width={10} 
                height={14} 
            />
            <Image
                className="w-[10px] h-[14px] mr-5"
                src="/vector_3.png" 
                alt="vector_3" 
                width={10} 
                height={14} 
            />
            <Image
                className="w-[10px] h-[14px] mr-5"
                src="/vector_4.png" 
                alt="vector_4" 
                width={10} 
                height={14} 
            />
            <Image
                className="w-[10px] h-[14px] mr-5"
                src="/vector_5.png" 
                alt="vector_5" 
                width={10} 
                height={14} 
            />
            <Image
                className="w-[10px] h-[14px] mr-5"
                src="/vector_6.png" 
                alt="vector_6" 
                width={10} 
                height={14} 
            />
            <Image
                className="w-[10px] h-[14px] mr-5"
                src="/vector_7.png" 
                alt="vector_7" 
                width={10} 
                height={14} 
            />
            <Image
                className="w-[10px] h-[14px] mr-5"
                src="/vector_8.png" 
                alt="vector_8" 
                width={10} 
                height={14} 
            />
            <Image
                className="w-[10px] h-[14px] mr-5"
                src="/vector_9.png" 
                alt="vector_9" 
                width={10} 
                height={14} 
            />
          </div>
          <div className="w-[561px] h-[49px] top-[105px] left-[42px] rounded-tl-[20px] rounded-tr-[20px] static">
          <textarea
            name="desc"
            value={desc}
            onChange={handleInputChange}
            className="mt-1 block w-full py-2 outline-none resize-y border border-white rounded-md  focus:border-blue-500"
            placeholder="Type something..."
            rows={3}
          />
          </div>
        </div>
      </div>
    </div>
  );
}


