import { useState, useRef } from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, useForm} from '@inertiajs/react'

function Setmenuadd(props){
    const { mymenus } = props;
    
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]');
    const {data, setData, post} = useForm({
        title:"",
        mymenuList:[],
        user_id:props.auth.user.id,
    });
    
    const handleSendPosts = (e) => {
        e.preventDefault();
        post("/setmenuadd");
    };
    
    const removemenu = (menuindex) =>{
        let beforemenu = data.mymenuList;
        let filtermenu = beforemenu.filter((menu,index) =>(index !== menuindex));
        setData("mymenuList", filtermenu);
    };
    
    const addmenu = (mymenu) =>{
        const beforemenu = data.mymenuList;
        beforemenu.push(mymenu);
        setData("mymenuList", beforemenu);
    }
    
    return(
        <div>
            <div className="p-12">
                <h1>SETMENU登録</h1>
                <hr class="h-px my-8 bg-gray-900 border-0 dark:bg-gray-900"></hr>
                <div className="flex flex-row justify-center space-x-10 box-border h-30 w-100 p-4 border-2 border-gray-900" >
                    <Link href={`/home`}>ホーム</Link>
                    <Link href={`/post`}>MY献立一覧</Link>
                    <Link href={`/addposts`}>登録食材の追加</Link>
                </div>
                <hr class="h-px my-8 bg-gray-900 border-0 dark:bg-gray-900"></hr>
            </div>
            
            <form onSubmit={handleSendPosts}>
                <div>
                    <input type="hidden" name="_token" value={csrf_token.content}/>
                    <div className="p-6">
                        <div className="flex flex-row">
                            <input type="text" placeholder="タイトル" onChange={(e) => setData("title", e.target.value)}/>
                            <span className="text-red-600">{props.errors.title}</span>
                            <div className="flex flex-row my-5">
                                <button type="submit" className="p-1 bg-purple-300 hover:bg-purple-400 rounded-md">保存</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </form>
            
            <div className="box-border h-30 w-6/12 p-6 border-2 border-gray-900">
            <h2>含めるメニュー</h2>
                { data.mymenuList.map((menu,index) => (
                    <div key={menu.id} className="box-border h-30 w-100 p-4 border-2 border-gray-900">
                        <h2>
                            {menu.title}
                            <img src={ menu.photograph } className = "w-10/12"/>
                        </h2>
                        <input type="button" value="削除"onClick={() => removemenu(index)}/>
                    </div>
                ))}
            </div>
            
            
            
             <div className="p-12">
                { mymenus.map((mymenu) => (
                    <div key={mymenu.id} className="box-border h-30 w-6/12 p-4 border-2 border-gray-900">
                        <div>
                            <h2>
                                { mymenu.title }
                            </h2>
                             <input type="button" value="登録" onClick={()=>{
                             {addmenu(mymenu)}
                             }     
                            }/>
                        </div>
                        <img src={ mymenu.photograph } className = "w-10/12"/>
                    </div>
                ))}
            </div>
        </div>
        );
}
export default Setmenuadd;