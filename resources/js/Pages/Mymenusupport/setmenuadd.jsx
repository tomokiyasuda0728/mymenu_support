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
        <Authenticated auth={props.auth} header={
          <h2 className="font-semibold　text-xl text-gray-900 leading-tight">
            setmenuadd
          </h2> 
        }>
            <div className="p-12 flex flex-row">
                <h1>SETMENU登録</h1>
            </div>
            
            <form onSubmit={handleSendPosts}>
                <div>
                    <input type="hidden" name="_token" value={csrf_token.content}/>
                    <div className="p-12">
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
            
            <div className="box-border h-30 w-100 p-4 border-2 border-gray-900">
                    { data.mymenuList.map((menu,index) => (
                                <div key={menu.id}>
                                    <h2 className="box-border h-30 w-100 p-4 border-2 border-gray-900">
                                    {menu.title}
                                    <img src={ menu.photograph }/>
                                    </h2>
                                    <input type="button" value="削除"onClick={() => removemenu(index)}/>
                                </div>
                    ))}
            </div>
            
            
            
             <div className="p-12">
                { mymenus.map((mymenu) => (
                    <div key={mymenu.id}>
                        <div>
                            <h2>
                                { mymenu.title }
                            </h2>
                             <input type="button" value="登録" onClick={()=>{
                             {addmenu(mymenu)}
                             }     
                            }/>
                        </div>
                        <img src={ mymenu.photograph }/>
                    </div>
                ))}
            </div>
            
        </Authenticated>
        );
}
export default Setmenuadd;