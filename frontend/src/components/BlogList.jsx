import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ShowBlogs from './ShowBlogs';
import Search from './Search';
import toast from 'react-hot-toast';
const BlogList = () => {
    const [list,setList]=useState([]);
    const [loading,setLoading]=useState(true);
    const [errMsg,setErrMsg]=useState('');
    const getBlogs= async(query)=>{
        try{
            const res=await axios.get(`/api/blog/${query}`);
            if(res.status===200){
                setLoading(false);
                if(res.data.length===0){
                    setErrMsg('No blogs found...')
                }
                else{
                    setErrMsg('');
                    setList(res.data);
                }
            }
        }
        catch(err){
            toast.error(err.response.data.message);
        }
    }
    useEffect(()=>{
        getBlogs('');
    },[])

    if(loading){
        return <h1 className='text-center font-semibold text-3xl'>Loading....</h1>
    }
    
    return <div className='w-full'>
        <Search getBlogs={getBlogs}/>
        {errMsg?
        <div className='w-full'>
            <h2 className='text-center text-2xl font-semibold mt-14 w-full'>{errMsg}</h2>
        </div>
        :<div className='mt-6'>
        {list.map((elem)=>{
            return <ShowBlogs elem={elem} key={elem._id}/>
        })}
        </div>}
    </div>
}

export default BlogList