import React, { useEffect, useState } from 'react'
import { BsFillTrashFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import './StartScreen.css'
const StartScreen = () => {
    const [projects,setProjects]=useState([])
    useEffect(()=>{
        const curriculum=localStorage.getItem('curriculum')
        if(curriculum===null){
            localStorage.setItem('curriculum',JSON.stringify([]))
            setProjects([])
        }else{
            setProjects(JSON.parse(curriculum))
        }
    },[])

    const deleteProject=(id)=>()=>{
        const curriculum=JSON.parse(localStorage.getItem('curriculum'))
        let updatedCurriculum=[]
        curriculum.forEach((project)=>{
            if(project.id!==id){
                updatedCurriculum.push(project)
            }
        })
        setProjects([...updatedCurriculum])
        localStorage.setItem('curriculum',JSON.stringify(updatedCurriculum))
    }
    return (
        <div className='start-screen'>
            <div className='start-screen-title'>
                <h1 className='text-title'>Curiculum Authoring App</h1>
            </div>
            <div className='cover center'>
                <div className='start-screen-box container'>
                    <div className='new-project'>
                        <Link to='/new'>
                            <button className='btn primary'>New Project</button>
                        </Link> 
                    </div>
                    <hr></hr>
                    <div className='load-project'>
                        <h2>Load Project</h2>
                        {
                           projects.length===0?(
                                <span>No Projects are present</span>
                            ):(
                                projects.map((project,index)=>{
                                    
                                    return( 
                                    <div className='project-lists'>
                                    <Link to={`/${project.id}`} key={index}>{project.name}</Link>
                                    <BsFillTrashFill onClick={deleteProject(project.id)}/>
                                    </div>
                                    )
                                })
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StartScreen
