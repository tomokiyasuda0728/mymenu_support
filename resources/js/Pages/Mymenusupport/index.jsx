import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, router, useForm } from '@inertiajs/react'

function Index(props){
    const { mymenus } = props;
    
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]');
    
    const {data, setData, put} = useForm({
        id:mymenus.id,
        date:mymenus.dates,
        user_id:props.auth.user.id
    });
    
    const handleSendPosts = (e) => {
        e.preventDefault();
        put(`/bandatestore/${mymenus.id}`);
    };
    
    const handleDeletePost = (id) => {
        router.delete(`/post/${id}`, {
            onBefore: () => confirm("本当に削除しますか？"),
        })
    }
    
    const bandate = new Date(2022, 1 - 1, 1);
    
    const bandateset = () =>{
        if (data.date - bandate != 0){
            setData("date", bandate)
        }
    }
    
    const datereset = () =>{
        if (data.date != null){
            setData("date", null)
        }
    }
    
    const datedisplay = () =>{
        if (mymenus.dates != null && new Date(mymenus.dates)-bandate != 0){
        return(
            <h2 className="box-border h-30 w-100 p-4 border-2 border-gray-900">
                {new Date(mymenus.dates).toLocaleDateString()}
            </h2>
        )}else if(new Date(mymenus.dates)-bandate == 0){
            return(
                <h2 className="box-border h-30 w-100 p-4 border-2 border-gray-900">
                自動献立の対象外
                </h2>
            )
        }
    }
    
    const datebanswich = () =>{
        if(new Date(mymenus.dates)-bandate != 0){
            return(
            <div>
            {bandateset()}
            <button type="submit" 
            className="p-1 bg-purple-300 hover:bg-purple-400 rounded-md"
            >自動献立の対象から外す</button>    
            </div>
            )
        }else if(new Date(mymenus.dates)-bandate == 0){
            return(
            <div>
            {datereset()}
            <button type="submit" 
            className="p-1 bg-purple-300 hover:bg-purple-400 rounded-md"
            >自動献立の対象に戻す</button>    
            </div>
            )
        }
    }
    
    return(
        <div>
            <div className="p-12">
                <form onSubmit={handleSendPosts}>
                <div>
                    <input type="hidden" name="_token" value={csrf_token.content}/>
                </div>
                <div>
                    <h1>{mymenus.title}</h1>
                    <div className="flex flex-row my-5 justify-center space-x-10 box-border h-30 w-100 p-4 border-2 border-gray-900">
                        <Link href={`/post/${mymenus.id}/edit`}>編集</Link>
                        <div>
                            <input type="button" value="削除" 
                            onClick={() => handleDeletePost(mymenus.id)}
                            className="p-1 bg-purple-300 hover:bg-purple-400 rounded-md"/>
                        </div>
                        {datebanswich()}
                        <div>
                          {datedisplay()}
                        </div>
                    </div>
                </div>
                </form>
                
                <div>
                    <img src={ mymenus.photograph }/>
                </div>
                
                <div>
                  <h2>カテゴリー</h2>
                  <div className="flex flex-row my-5">
                     <h2 className="box-border h-30 w-100 p-4 border-2 border-gray-900">{mymenus.type.name}</h2>
                     <h2 className="box-border h-30 w-100 p-4 border-2 border-gray-900">{mymenus.dish.name}</h2>
                     <h2 className="box-border h-30 w-100 p-4 border-2 border-gray-900">{mymenus.mainfood.name}</h2>
                  </div>
                </div>
                
                <div className="box-border h-30 w-100 p-4 border-2 border-gray-900">
                    <h2>材料</h2>
                    { mymenus.ingredients.map((ingredient) => (
                        <div key={ingredient.id}>
                            <h2 className="box-border h-30 w-100 p-4 border-2 border-gray-900">
                            {ingredient.name}×{ingredient.pivot.quantity}
                            </h2>
                        </div>
                    ))}
                </div>
                
                <div className="box-border h-30 w-100 p-4 border-2 border-gray-900">
                    <h2>調理工程</h2>
                    <div>
                    {mymenus.way_of_making}
                    </div>
                </div>
                
                <div className="box-border h-30 w-100 p-4 border-2 border-gray-900">
                    <h2>コメント</h2>
                    <div>
                    {mymenus.comment}
                    </div>
                </div>
                
            </div>
            </div>
        );
}
export default Index;