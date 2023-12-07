import { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';


export default function addingredient(props) {
  const {newfooddata, setNewfooddata, post} = useForm({
        ingredient:"",
    })

    const handleSendIngredients = (e) => {
        e.preventDefault();
        post("/addposts");
    }
  
  return (
     <div>
        <form>
           <div className="flex flex-row my-5">
              <input type="text" placeholder="リストにない献立はここに入力してください" onChange={(e) => setNewfooddata("ingredient",e.target.value)}/>
              <button type="submit" onclick={()=>{handleSendIngredients}} className="p-1 bg-purple-300 hover:bg-purple-400 rounded-md">リストに追加</button>
            </div>
        </form>            
    </div>
    )
}