import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, router } from '@inertiajs/react'


function Index(props){
    const { mymenus } = props;
    
    const handleDeletePost = (id) => {
        router.delete(`/post/${id}`, {
            onBefore: () => confirm("本当に削除しますか？"),
        })
    }
    
    return(
        <Authenticated auth={props.auth} header={
          <h2 className="font-semibold　text-xl text-gray-900 leading-tight">
            index
          </h2> 
        }>
            <div className="p-12">
                <div className="flex flex-row">
                    <h1>{mymenus.title}</h1>
                    <div className="flex flex-row my-5">
                        <Link href={`/post/${mymenus.id}/edit`}>編集</Link>
                        <div>
                            <input type="button" value="削除" onClick={() => handleDeletePost(mymenus.id)}/>
                        </div>
                        <button className="menuIsolate">自動献立の対象から外す</button>
                    </div>
                </div>
                
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
            
        </Authenticated>
        );
}
export default Index;