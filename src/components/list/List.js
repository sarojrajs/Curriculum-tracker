import React from 'react'
import {BsArrowsMove,BsFillTrashFill} from 'react-icons/bs'
import {AiOutlineArrowLeft,AiOutlineArrowRight} from 'react-icons/ai'
import Item from '../item/Item'
import './List.css'
const List = (props) => {
    const indentAction=()=>{
        props.indent(props.index)
    }
    const outdentAction=()=>{
        props.outdent(props.index)
    }
    const deleteAction=()=>{
        props.delete(props.index)
    }
    return (
        <div className='list'>
            <div className='list-left'>
                <BsArrowsMove title='Move'/>
                <AiOutlineArrowLeft title='Outdent' onClick={outdentAction}/>
                <AiOutlineArrowRight title='Indent' onClick={indentAction}/>
                <BsFillTrashFill title='Delete' onClick={deleteAction}/>
            </div>
            <div className='list-right'>
                <Item details={props.details} updateText={props.updateText} index={props.index}/>
            </div>
        </div>
    )
}

export default List
