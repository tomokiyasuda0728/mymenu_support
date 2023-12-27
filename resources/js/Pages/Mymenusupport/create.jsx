import { useState, useRef } from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, useForm} from '@inertiajs/react'

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
        ingredient_quantity:[],
        user_id:props.auth.user.id,
    })
    
    const [count, setCount] = useState(5);
    
    const handleSendPosts = (e) => {
        e.preventDefault();
        post("/create");
    };
    
    const [ingredientedit, setIngredientedit] = useState(true);
    
    const list = props.ingredient;
   
    const ingredients = [];
        
    const isIngredientRegisterd = (index) => {
        for(let i=0; i<ingredients.length; i++){
            if(ingredients[i].index == index)  
            return true
        }
        return false
    }

    const getIngredientByIndex = (index) => {
        let ingredient = null;
        for(let i=0; i<ingredients.length; i++){
            if(ingredients[i]["index"] === index) {
                ingredient = ingredients[i];
                break;
            }
        }
        return ingredient
    }

    const handleIngredientName = (index, e) => {
        let text = e.target.selectedOptions[0].text;
        let indexid = e.target.value;
        let result = isIngredientRegisterd(index);
        if (!result) {
            ingredients.push({
                index:index,
                id:indexid,
                name:text
            });
        }else{
            ingredients[index]["id"] = indexid;
            ingredients[index]["name"] = text;
        }
    
    }

    const handleIngredientQuantity = (index,e) => {
        let quantity = e.target.value;
        let ingredient = getIngredientByIndex(index);
        if (ingredient === null) return
        ingredient['quantity'] = quantity;
    }

    const renderOptions = () => {
        let elems = [];
        for (let i = 0; i < count; i++) {
            elems.push(
            <div>
                <select onChange={(e) =>handleIngredientName(i,e)}>
                <option value="" defaultValue>選択してください</option>
                {
                list.map((ct)=>
                    <option value={ct.id}>{ct.name}</option>
                )
                }
                </select>
                <p>×</p>
                <input 
                type="number" 
                min={0}
                onChange={(e) => 
                    handleIngredientQuantity(
                        i,
                        e
                    )}
                />
            </div>

            )
        }
        return <ul>{elems}</ul>;
    }
    
    const switchingredient = () =>{
        if(ingredientedit){
            return(
                <div>
                    <div className="flex flex-row">
                        <Link href={`/addposts`}>材料の種類を追加する</Link>
                        <input type="button" onClick={() => {
                            setData("ingredient_quantity",ingredients);
                            setIngredientedit(false);
                        }} value="食材を確定する" 
                        className="p-1 bg-purple-300 hover:bg-purple-400 rounded-md"/>
                    </div>
                    {renderOptions()}
                    <input type="button" onClick={() => setCount(count+1)} 
                    value="食材の枠を追加する" 
                    className="p-1 bg-purple-300 hover:bg-purple-400 rounded-md"/>
                </div>
        )}else{
            return(
                <div>
                    {console.log(data)}
                    <div>
                        <input type="button" onClick={() =>  setIngredientedit(true)} 
                        value="食材を入れなおす" 
                        className="p-1 bg-purple-300 hover:bg-purple-400 rounded-md"/>
                    </div>
                    <div className="box-border h-30 w-100 p-4 border-2 border-gray-900">
                        { data.ingredient_quantity.map((ingredient) => (
                                    <div key={ingredient.id}>
                                        <h2 className="box-border h-30 w-100 p-4 border-2 border-gray-900">
                                        {ingredient.name}×{ingredient.quantity}
                                        </h2>
                                    </div>
                        ))}
                    </div>
                </div>
    )}
    }
    
    return(
        <Authenticated auth={props.auth} header={
          <h2 className="font-semibold　text-xl text-gray-900 leading-tight">
            create
          </h2> 
        }>
        <form onSubmit={handleSendPosts}>
            <div>
                <input type="hidden" name="_token" value={csrf_token.content}/>
                <div className="p-12">
                    <div className="flex flex-row">
                        <input type="text" placeholder="タイトル" onChange={(e) => setData("title", e.target.value)}/>
                        <span className="text-red-600">{props.errors.title}</span>
                        <Link href={`/addposts`}>登録食材の追加</Link>
                        <div className="flex flex-row my-5">
                        <button type="submit" className="p-1 bg-purple-300 hover:bg-purple-400 rounded-md">保存</button>
                        </div>
                    </div>
                    
                    <div>
                        <input type="file" className="image" onChange={(e) => setData("photograph", e.target.files[0])}/>
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
                            {switchingredient()}
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
            </div>
        </form>
        </Authenticated>
        );
}
export default Create;