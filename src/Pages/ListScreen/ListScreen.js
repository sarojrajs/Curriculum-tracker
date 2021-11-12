import React, { useEffect, useState } from 'react'
import './ListScreen.css'
import {BsArrowsMove, BsFillTrashFill, BsPencil, BsPlusCircle} from 'react-icons/bs'
import {AiFillSave, AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'
import {TiTickOutline} from 'react-icons/ti'
import { ListItem } from '../../models/list'
import Popup from '../../components/Popup/Popup'
import { DragDropContext,Draggable,Droppable } from 'react-beautiful-dnd';
import Item from '../../components/item/Item'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router'

const ListScreen = () => {
    const [projectName,setProjectName]=useState('')
    const [listItems,setListItems]=useState([])
    const colors=['#4287f5','#808080','#808080e6','#808080cc','#808080b3','#80808099','#80808080']
    const [size,setSize]=useState(24)
    const [weight,setWeight]=useState(900)
    const [marginLeft,setMarginLeft]=useState(20)
    const [showPopup,setShowPopup]=useState({
        show:false,
        message:'',
        error:false
    })
    const [edit,setEdit]=useState(false)
    const {id}=useParams()
    const history=useNavigate()
    
    useEffect(()=>{
        if(id){
            const curriculum=JSON.parse(localStorage.getItem('curriculum'))
            console.log(curriculum)
            for(let i=0;i<curriculum.length;i++){
                if(curriculum[i].id===id){
                    setProjectName(curriculum[i].name)
                    setListItems(curriculum[i].data)
                }
            }
            setEdit(false)
            
        }else{
            setEdit(true)
        }
    },[id])
    
    const invokeErrorPopup=(show,message,error)=>{
        setShowPopup(prevState=>{
            return {
                ...prevState,
                show:show,
                message:message,
                error:error
            }
        })
        const timer=setTimeout(()=>{
            setShowPopup(prevState=>{
                return{
                    ...prevState,
                    show:!show
                }
            })
            clearTimeout(timer)
        },2000)
    }

    const createNewList=()=>{
        let valid=true
        if(listItems.length>0){
            listItems.forEach((item)=>{
                if(item.text===''){
                    invokeErrorPopup(true,'Standard Text should not be Empty',true)
                    valid=false
                }
            })
            
        }
        if(valid){
            const listItem=new ListItem(uuidv4(),size,colors[marginLeft/20],weight,marginLeft)
            setListItems([...listItems,listItem])
        }
    }
    const updateText=(index,value)=>{
        setListItems((prevState)=>prevState.map((state,i)=>i===index?{
            ...state,
            text:value,
        }:state))
    }
    const indent=(index)=>()=>{
        if(marginLeft===120){
           invokeErrorPopup(true,'Maximum Indentation',true)
            return
        }
        setListItems((prevState)=>prevState.map((state,i)=>i===index?{
            ...state,
            marginLeft:marginLeft+20,
            size:size-2,
            weight:weight-100,
            color: colors[(marginLeft+20)/20]
        }:state))
        setMarginLeft(prevState=>prevState+20)
        setSize(prevState=>prevState-2)
        setWeight(prevState=>prevState-100)
    }
    const outdent=(index)=>()=>{
        if(marginLeft===0){
            invokeErrorPopup(true,'Maximum Outdentation',true)
            return
        }
        setListItems((prevState)=>prevState.map((state,i)=>i===index?{
            ...state,
            marginLeft:marginLeft-20,
            size:size-2,
            weight:weight+100,
            color: colors[(marginLeft-20)/20]
        }:state))
        setMarginLeft(prevState=>prevState-20)
        setSize(prevState=>prevState+2)
        setWeight(prevState=>prevState+100)
    }
    const deleteNode=(index)=>()=>{
        console.log(index)
        const comparingValue=listItems[index].marginLeft
        const list=[...listItems]
        const newList=[]
        let indexFound=false
        let greaterValueFound=false
        for(let i=0;i<list.length;i++){
            if(i<index){
                newList.push(list[i])
                continue
            }
            if(greaterValueFound){
                newList.push(list[i])
                continue
            }
            if(i===index){
                indexFound=true
                continue
            }else{
                if(!(list[i].marginLeft>comparingValue)){
                    greaterValueFound=true
                    newList.push(list[i])
                }
            }
        }
        const lastItem=newList[newList.length-1]
        if(newList.length===0){
            setMarginLeft(20)
            setSize(24)
            setWeight(900)
            setListItems([])
        }else{
            setMarginLeft(lastItem.marginLeft)
            setSize(lastItem.size)
            setWeight(lastItem.weight)
            setListItems([...newList])
        }
    }

    const handleDragEnd=(result)=>{
        if (!result.destination) return;
        const items = Array.from(listItems);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setListItems(items)
    }
    const acceptProjectName=()=>{
        if(projectName===''){
            invokeErrorPopup(true,'Curriculum Name should not be empty',true)
            return
        }
        setEdit(false)
    }

    const editCurriculumName=()=>{
        setEdit(true)
    }
    const saveProject=()=>{
        const curriculum=localStorage.getItem('curriculum')
        let projectDetails=JSON.parse(curriculum)
        if(projectName===''){
            invokeErrorPopup(true,'Curriculum Name should not be empty',true)
        }
        

        if(id){
            projectDetails=projectDetails.map((project)=>project.id===id?{
                ...project,
                data:listItems
            }:project)
        }else{
            const project={
                id:uuidv4(),
                name:projectName,
                data:listItems
            }
            projectDetails.push(project)
        }
        localStorage.setItem('curriculum',JSON.stringify(projectDetails))
        history('/')
    }
    

    return (
        <>
            <div className='list-screen center'>
                <div className='lg-width-container'>
                    <div className='list-screen-top-top'>
                        {
                            edit ?(
                                <div className='title-box'>
                                    <input className='inp-visible' type='text' placeholder='Curiculum Name' value={projectName} onChange={(e)=>{setProjectName(e.target.value)}}/>
                                    {
                                       !id && <TiTickOutline onClick={acceptProjectName}/>
                                    }
                                </div>
                            ):(
                                <div className='title-box'>
                                    <h1 className='text-medium-gray'>{projectName}</h1>
                                    {
                                       !id && <BsPencil onClick={editCurriculumName}/>
                                    }
                                </div>    
                            )
                        }
                        
                    </div>
                <div className='list-screen-top'>
                        <div className='list-screen-top-left'>
                            <h2 className='text-small-gray-dark'>Actions</h2>
                            <p className='text-small-gray-light'>Move, Ident, Outdent, Delete</p>
                        </div>
                        <div className='list-screen-top-right move-right'>
                            <h2 className='text-small-gray-dark'>Standard</h2>
                            <p className='text-small-gray-light'>The text of the standard</p>
                        </div>
                </div>
                
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId='listScreenMiddle'>
                        {
                            (provided)=>(
                                <div className='listScreenMiddle' {...provided.droppableProps} ref={provided.innerRef}>
                                {
                                    listItems.map((item,index)=>{
                                        return (<Draggable key={item.id} draggableId={item.id} index={index}>
                                            {
                                                (provided)=>(
                                                    <div className='list' ref={provided.innerRef}  {...provided.draggableProps}  >
                                                        <div className='list-left' >
                                                            <div {...provided.dragHandleProps}>
                                                                <BsArrowsMove title='Move'/>
                                                            </div>
                                                            <AiOutlineArrowLeft title='Outdent' onClick={outdent(index)}/>
                                                            <AiOutlineArrowRight title='Indent' onClick={indent(index)}/>
                                                            <BsFillTrashFill title='Delete' onClick={deleteNode(index)}/>
                                                        </div>
                                                        <div className='list-right'>
                                                            <Item details={item} updateText={updateText} index={index}/>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </Draggable>)
                                    })
                                }
                                {provided.placeholder}
                                </div>
                            )
                        }
                        
                    </Droppable>
                </DragDropContext>
                <div className='list-screen-footer'>
                    <button className='btn primary center' onClick={saveProject}><AiFillSave/> Save</button>
                    <button onClick={createNewList} className='btn primary center'><BsPlusCircle/> Add Standard</button>
                </div>
                </div>
            </div>
            {
                showPopup.show && <Popup details={showPopup}/>
            }
        </>
    )
}

export default ListScreen
