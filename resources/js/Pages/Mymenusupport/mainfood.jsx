import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from '@inertiajs/react'


function Mainfood(props){
    const { mainfoods } = props;
  
    
    return(
        <Authenticated auth={props.auth} header={
          <h2 className="font-semibold　text-xl text-gray-900 leading-tight">
            post
          </h2> 
        }>
            <div className="p-12 flex flex-row">
                <h1>MY献立登録一覧</h1>
                <div className="flex flex-row my-5">
                    <button className="menuadd">新規登録</button>
                    <button className="setmenuadd">セットメニュー作成</button>
                </div>
                 <div>
                    <hr class="h-px my-8 bg-gray-900 border-0 dark:bg-gray-900"></hr>
                    <div className="flex flex-row justify-center space-x-10 box-border h-30 w-100 p-4 border-2 border-gray-900" >
                       <Link href={`/dish/2`}>主菜</Link>
                        <Link href={`/dish/3`}>副菜</Link>
                        <Link href={`/type/2`}>和食</Link>
                        <Link href={`/type/3`}>洋食</Link>
                        <Link href={`/type/4`}>中華</Link>
                        <Link href={`/mainfood/2`}>牛肉</Link>
                        <Link href={`/mainfood/3`}>豚肉</Link>
                        <Link href={`/mainfood/4`}>鶏肉</Link>
                        <Link href={`/mainfood/5`}>魚</Link>
                        <Link href={`/post`}>全て</Link>
                    </div>
                </div>
            </div>
             <div className="p-12">
                { mainfoods.mymenus.map((mymenu) => (
                <div key={mymenu.id}>
                    <h2>{mymenu.title}</h2>
                    <img src={ mymenu.photograph }/>
                </div>
                ))}
            </div>
            
        </Authenticated>
        );
}
export default Mainfood;