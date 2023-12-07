import { useState, useRef } from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, useForm} from '@inertiajs/react'
import addingredient from './AddIngredient.jsx';
import selectingredient from './SelectIngredient.jsx';

const Create = (props) => {
    
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]');
    
    const {data, setData, post} = useForm({
        title:"",
        photograph:"",
        type_id:1,
        mainfood_id:1,
        dish_id:1,
        way_of_making:"",
        comment:"",
        ingredient_id:[],
        quantity:[],
        user_id:props.auth.user.id,
    })

    
    const selectboxdata = (ingredientdata, quantitydata) => {
        setData("ingedient_id",[...data, ingredientdata])
        setData("quantity",[...data, quantitydata])
    }
    
    const options = ;
    
    const [count, setCount] = useState(5);
    
     const handleSendPosts = (e) => {
        e.preventDefault();
        post("/create");
    };
    
    const pushingredient = () => {
        console.log(count)
        const items = [];
        console.log(count)
        for (let i = 0; i < count; i++) {
            items.push(
            <div>
                <select onChange={(e) =>console.log(e.target.value)}>
                {props.ingredient.map((ct)=>
                <option value={ct.id}>{ct.name}</option>)
                }
                </select>
                <p>×</p>
                <input type="number" onChange={(e) => console.log(e.target.value)}/>
            </div>
            
            )
        }
        return <ul>{items}</ul>;
    }
    
    return(
        <Authenticated auth={props.auth} header={
          <h2 className="font-semibold　text-xl text-gray-900 leading-tight">
            create
          </h2> 
        }>
        <form onSubmit={handleSendPosts}>
        <input type="hidden" name="_token" value={csrf_token.content}/>
            <div className="p-12">
                <div className="flex flex-row">
                    <input type="text" placeholder="タイトル" onChange={(e) => setData("title", e.target.value)}/>
                    <span className="text-red-600">{props.errors.title}</span>
                    <div className="flex flex-row my-5">
                        <button type="submit" className="p-1 bg-purple-300 hover:bg-purple-400 rounded-md">保存</button>
                    </div>
                </div>
                
                <div>
                  <h2>カテゴリー</h2>
                  <div className="flex flex-row my-5">
                    <select onChange={e => setData("type_id", e.target.value)}>
                    {props.type.map((type) => (
                            <option value={type.id}>{type.name}</option>
                        ))}
                    </select>
                    
                    <select onChange={e => setData("dish_id", e.target.value)}>
                    {props.dish.map((dish) => (
                            <option value={dish.id}>{dish.name}</option>
                        ))}
                    </select>
                    
                    <select onChange={e => setData("mainfood_id", e.target.value)}>
                    {props.mainfood.map((mainfood) => (
                            <option value={mainfood.id}>{mainfood.name}</option>
                        ))}
                    </select>
                  </div>
                </div>
                
                <div className="box-border h-30 w-100 p-4 border-2 border-gray-900">
                    <h2>材料</h2>
                    <div>
                    {pushingredient()}
                    
                        <input type="button" onClick={() => setCount(count+1)} value="食材を追加する" className="p-1 bg-purple-300 hover:bg-purple-400 rounded-md"/>
                    </div>
               </div>
                
                <div className="box-border h-30 w-100 p-4 border-2 border-gray-900">
                    <h2>調理工程</h2>
                    <div>
                    <textarea placeholder="調理工程" onChange={(e) => setData("way_of_making", e.target.value)}/>
                    </div>
                </div>
                
                <div className="box-border h-30 w-100 p-4 border-2 border-gray-900">
                    <h2>コメント</h2>
                    <div>
                    <textarea placeholder="コメント" onChange={(e) => setData("comment", e.target.value)}/>
                    </div>
                </div>
                
            </div>
            
        </form>
        </Authenticated>
        );
}
export default Create;