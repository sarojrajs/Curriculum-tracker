import React from 'react'
import './Item.css'
const Item = (props) => {
    const updateText=(e)=>{
        props.updateText(props.index,e.target.value)
    }
    const styles={
        marginLeft:`${props.details.marginLeft}px`,
    }
    const textStyles={
        fontSize:`${props.details.size}px`,
        fontWeight:`${props.details.weight}`,
        color:`${props.details.color}`
    }
   
    return (
        <div className='item'>
            <div className='item-left' style={styles}>

            </div>
            <div className='item-right'>
               
                        <input className='inp' type='text' style={textStyles} value={props.details.text} onChange={updateText}/>
                    
               
                
            </div>
        </div>
    )
}

export default Item
