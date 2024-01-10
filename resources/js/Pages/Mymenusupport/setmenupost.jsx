import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from '@inertiajs/react'


function Setmenupost(props){
    const { setmenus } = props;
    
    return(
        <div>
            <div className="p-12">
                <h1>セットメニュー一覧</h1>
                <div className="flex flex-row my-5 justify-center space-x-10 box-border h-30 w-100 p-4 border-2 border-gray-900">
                    <Link href={`/home`}>ホーム</Link>
                    <Link href={`/setmenuadd`}>セットメニュー新規登録</Link>
                    <Link href={`/post`}>Mymenu一覧</Link>
                </div>
            </div>
            <div className="p-12">
                { setmenus.map((setmenu) => (
                    <div key={setmenu.id} className="space-x-10 box-border h-30 w-8/12 p-4 border-2 border-gray-900">
                        <h2>
                            <Link href={`/setmenupost/${setmenu.id}`}>{ setmenu.title }</Link>
                        </h2>
                    </div>
                ))}
            </div>
        </div>
        );
}
export default Setmenupost;