import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, router } from '@inertiajs/react'


function Setindex(props){
    const { setmenus } = props;
    
    const handleDeletePost = (id) => {
        router.delete(`/setmenupost/${id}`, {
            onBefore: () => confirm("本当に削除しますか？"),
        })
    }
    
    return(
        <Authenticated auth={props.auth} header={
          <h2 className="font-semibold　text-xl text-gray-900 leading-tight">
            setindex
          </h2> 
        }>
            <div className="p-12">
                <div className="flex flex-row">
                    <h1>{setmenus.title}</h1>
                    <div className="flex flex-row my-5">
                        <Link href={`/setmenupost/${setmenus.id}/edit`}>編集</Link>
                        <div>
                            <input type="button" value="削除" onClick={() => handleDeletePost(setmenus.id)}/>
                        </div>
                        <button className="menuIsolate">自動献立の対象から外す</button>
                    </div>
                </div>
                
                <div className="box-border h-30 w-100 p-4 border-2 border-gray-900">
                    <h2>含まれるメニュー</h2>
                    { setmenus.mymenus.map((mymenu) => (
                        <div key={mymenu.id}>
                            <h2 className="box-border h-30 w-100 p-4 border-2 border-gray-900">
                            <Link href={`/post/${mymenu.id}`}>{ mymenu.title }</Link>
                            <img src={ mymenu.photograph }/>
                            </h2>
                        </div>
                    ))}
                </div>
                
            </div>
            
        </Authenticated>
        );
}
export default Setindex;