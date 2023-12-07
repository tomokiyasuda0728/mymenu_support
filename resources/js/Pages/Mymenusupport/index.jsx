import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from '@inertiajs/react'


function Index(props){
    const { mymenus } = props;
    
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
                        <button className="menuEdit">編集</button>
                        <button className="menuDelete">削除</button>
                        <button className="menuIsolate">自動献立の対象から外す</button>
                    </div>
                </div>
                
                <div>
                    <img src='./menu_images/{mymenu.title}.png'/>
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
                            {ingredient.name}×{ingredient.pivot.quantiny}
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