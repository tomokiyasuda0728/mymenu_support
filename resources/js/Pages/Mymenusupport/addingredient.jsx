import { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';


const Addingredient = (props) => {
    
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]');
    const {data, setData, post} = useForm({
            ingredient:props.ingredients,
            name:"",
            postingredient:[],
    });
    
        const handleSendIngredients = (e) => {
            e.preventDefault();
            post("/addposts");
        };
    
    const addingredient = (ingredientname) =>{
        const beforeingredient = data.ingredient;
        const idcount = beforeingredient.length+1;
        beforeingredient.push({
            id:idcount,
            name:ingredientname
            });
        
        
        setData("ingredient", beforeingredient);
        
        const newingredient = data.postingredient;
        newingredient.push({
            id:idcount,
            name:ingredientname
        });
        
        setData("ingredient", newingredient);
        
        if(!data.name == ""){
        setData("name","");
        }
    };
      
    return (
         <div>
            <form onSubmit={handleSendIngredients}>
                <div>
                    <input type="hidden" name="_token" value={csrf_token.content}/>
                    <h1>食材の追加</h1>
                    <div className="flex flex-row justify-center space-x-10 box-border h-30 w-100 p-4 border-2 border-gray-900" >
                        <Link href={`/post`}>MY献立一覧</Link>
                        <Link href={`/create`}>献立の新規登録</Link>
                        <Link href={`/setmenupost`}>セットメニュー一覧</Link>
                        <Link href={`/setmenuadd`}>セットメニュー作成</Link>
                    </div>
                    <div className="flex flex-row my-5">
                        <button type="submit" 
                        className="p-1 bg-purple-300 hover:bg-purple-400 rounded-md">リストを保存</button>
                    </div>
                    
                    <div className="flex flex-row my-5">
                        <input type="text" placeholder="リストにない献立をここに入力してください" 
                        value={data.name} onChange={(e) => setData("name",e.target.value)}/>
                        <input type="button" value="登録" onClick={()=>{
                             {addingredient(data.name)}
                             }     
                            }/>
                    </div>
                    
                    <div className="box-border h-30 w-100 p-4 border-2 border-gray-900">
                     <h2>献立リスト</h2>
                    { data.ingredient.map((ingredient) => (
                        <div key={ingredient.id}>
                            <h2 className="box-border h-30 w-100 p-4 border-2 border-gray-900">
                            { ingredient.name }
                            </h2>
                        </div>
                    ))}
                    </div>
                </div>
            </form>            
        </div>
    )
}

export default Addingredient;