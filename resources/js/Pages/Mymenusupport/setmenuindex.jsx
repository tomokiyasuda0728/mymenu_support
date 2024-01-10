import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, router, useForm} from '@inertiajs/react'

function Setindex(props){
    const { setmenus } = props;
    
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]');
    
    const {data, setData, put} = useForm({
        id:setmenus.id,
        date:setmenus.dates,
        user_id:props.auth.user.id
    });
    
    const handleSendPosts = (e) => {
        e.preventDefault();
        put(`/setmenu/bandatestore/${setmenus.id}`);
    };
    
    const handleDeletePost = (id) => {
        router.delete(`/setmenupost/${id}`, {
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
        if (setmenus.dates != null && new Date(setmenus.dates)-bandate != 0){
        return(
            <h2 className="box-border h-30 w-100 p-4 border-2 border-gray-900">
                {new Date(setmenus.dates).toLocaleDateString()}
            </h2>
        )}else if(new Date(setmenus.dates)-bandate == 0){
            return(
                <h2 className="box-border h-30 w-100 p-4 border-2 border-gray-900">
                自動献立の対象外
                </h2>
            )
        }
    }
    
    const datebanswich = () =>{
        if(new Date(setmenus.dates)-bandate != 0){
            return(
            <div>
            {bandateset()}
            <button type="submit" 
            className="p-1 bg-purple-300 hover:bg-purple-400 rounded-md"
            >自動献立の対象から外す</button>    
            </div>
            )
        }else if(new Date(setmenus.dates)-bandate == 0){
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
                <div className="flex flex-row my-5 justify-center space-x-10 box-border h-30 w-100 p-4 border-2 border-gray-900">
                    <Link href={`/home`}>ホーム</Link>
                    <Link href={`/setmenupost`}>セットメニュー一覧</Link>
                    <Link href={`/setmenupost/${setmenus.id}/edit`}>編集</Link>
                </div>
                <div>
                    <h1>{setmenus.title}</h1>
                    <div className = "flex flex-row">
                        <div>
                            <input type="button" value="削除" 
                            onClick={() => handleDeletePost(setmenus.id)}
                            className="p-1 bg-purple-300 hover:bg-purple-400 rounded-md"/>
                        </div>
                        {datebanswich()}
                        <div>
                            {datedisplay()}
                        </div>
                    </div>
                </div>
                </form>
                
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
        </div>
        );
}
export default Setindex;