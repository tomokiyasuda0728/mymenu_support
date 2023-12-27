import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from '@inertiajs/react'


function Setmenupost(props){
    const { setmenus } = props;
    
    return(
        <Authenticated auth={props.auth} header={
          <h2 className="font-semibold　text-xl text-gray-900 leading-tight">
            setmenupost
          </h2> 
        }>
            <div className="p-12 flex flex-row">
                <h1>セットメニュー一覧</h1>
                <div className="flex flex-row my-5">
                    <Link href={`/setmenuadd`}>セットメニュ新規登録</Link>
                    <Link href={`/post`}>Mymenu一覧</Link>
                </div>
            </div>
            <div className="p-12">
                { setmenus.map((setmenu) => (
                    <div key={setmenu.id}>
                        <h2>
                            <Link href={`/setmenupost/${setmenu.id}`}>{ setmenu.title }</Link>
                        </h2>
                    </div>
                ))}
            </div>
            
        </Authenticated>
        );
}
export default Setmenupost;