import React from "react";
import { useState } from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, useForm } from '@inertiajs/react';


const datemenupost = (props) => {
    
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]');
    
    const {data, setData, put} = useForm({
        fullmymenu:props.mymenus,
        fullsetmenu:props.setmenus,
        user_id:props.auth.user.id,
    });
    
    const handleSendPosts = (e) => {
        e.preventDefault();
        put("/editdatestore");
    };
    
    const [menuchange, setMenuchange] = useState();
    const [oldmenuid, setOldmenuid] = useState();
    const [oldmenutype, setOldmenutype] = useState();
    const [newmenu, setNewmenu] = useState("");
    const [newmenutype, setNewmenutype] = useState("");
    const [confirm, setConfirm] = useState(false);
    const [edit, setEdit] = useState(false);
    
    let datemymenupush = []; 
    
    const datepush = () =>{
        datemymenupush.splice(0, datemymenupush.length)
        data.fullmymenu.forEach(function($mymenu){
            if($mymenu.dates != null){
            datemymenupush.push({
                date:new Date($mymenu.dates),
                id:$mymenu.id,
                title:$mymenu.title,
                photograph:$mymenu.photograph,
                menutype:"mymenu",
            });
        }});
        data.fullsetmenu.forEach(function($setmenu){
            if($setmenu.dates != null){
            datemymenupush.push({
                date:new Date($setmenu.dates),
                id:$setmenu.id,
                title:$setmenu.title,
                photograph:"",
                menutype:"setmenu",
            });
        }});
    };
    
    const datemenudesc = () =>{
        datemymenupush.sort((a, b) => a.date - b.date)
    };
    
    const menulink = (menutype, id, title) =>{
        if(menutype == "mymenu"){
            return(
            <Link href={`/post/${id}`}>{title}</Link>
        )}
        if(menutype == "setmenu"){
            return(
            <Link href={`/setmenupost/${id}`}>{title}</Link>
        )}
    };
    
    let newmymenu = [];
    let newsetmenu = [];
    
    const olddelete = (menu) =>{
        if(menu == "mymenu"){
          data.fullmymenu.forEach(function($mymenu){
              if (oldmenutype == "mymenu" && $mymenu.id == oldmenuid){
                  $mymenu.dates = null
              }
              newmymenu.push($mymenu)
          })
        }
        if(menu == "setmenu"){
          data.fullsetmenu.forEach(function($setmenu){
              if (oldmenutype == "setmenu" && $setmenu.id == oldmenuid){
                  $setmenu.dates = null
              }
              newsetmenu.push($setmenu)
          })
        }
    }
    
    const newdatepush = (menu) =>{
        if(menu == "mymenu"){
            if (newmenutype == "mymenu"){
                newmymenu.forEach(function($newmymenu, index){
                    if ($newmymenu.title == newmenu.title)
                    $newmymenu.dates = menuchange
                })
            }
        }
        if(menu == "setmenu"){
            if (newmenutype == "setmenu"){
                newsetmenu.forEach(function($newsetmenu, index){
                    if ($newsetmenu.title == newmenu.title)
                    $newsetmenu.dates = menuchange
                })
            }
        }
    }
    
    const datemodificationmenu = (mymenuid) =>{
        {olddelete("mymenu")}
        {newdatepush("mymenu")}
        if(oldmenutype=="mymenu" || newmenutype == "mymenu"){
            setData("fullmymenu", newmymenu)
        }
    }
    
    const datemodificationsetmenu = () =>{
        {olddelete("setmenu")}
        {newdatepush("setmenu")}
        if(oldmenutype=="setmenu" || newmenutype == "setmenu"){
            setData("fullsetmenu", newsetmenu)
        }
    }
    
    const updatealert = () =>{
        let time = Date.now();
        let today = new Date(time)
        let yesterday = (today.getDate() - 1);
        let menuday = new Date(newmenu.dates)
        let menudayform = (menuday.toLocaleDateString())
        if ( menuday >= yesterday){
            return(
            <h2>
               この献立を選択すると{menudayform}の献立が消えてしまいます
            </h2>
            )
        }
    }
    
    const editstatus = () =>{
        if (edit){
            return(
            <button type="submit" 
                className="p-1 bg-purple-300 hover:bg-purple-400 rounded-md">
            編集を保存する</button>
            )
        }
    }
    
    const changemenuswich = () =>{
        if (menuchange == null){
        return(
        <div>
        <div>
            {datepush()}
            {datemenudesc()}
        </div>
        <div>
        { datemymenupush.map((passmenuone) => (
            <div key={passmenuone.date}>
                <h2>
                    {(passmenuone.date.toLocaleDateString())}
                </h2>
                <h1 className="box-border h-30 w-100 p-4 border-2 border-gray-900">
                    {menulink(passmenuone.menutype, passmenuone.id, passmenuone.title)}
                </h1>
                <div>
                    <img src={ passmenuone.photograph }/>
                </div>
                <div>
                <input type="button" onClick={() => {
                    setMenuchange(passmenuone.date);
                    setOldmenuid(passmenuone.id);
                    setOldmenutype(passmenuone.menutype);
                    setEdit(true);
                    }}
                    value="献立の日程を削除 or 献立を変更する"
                />
                </div>
            </div>
        ))}
            <div>
                {editstatus()}
                </div>
            </div>
        </div>
        )}else{
            if(!confirm){
            return(
            <div>
                {console.log(data)}
                <h1>変更する新しい献立を選択してください</h1>
                <input type="button" onClick={() => {
                    {datemodificationmenu()}
                    {datemodificationsetmenu()}
                    setMenuchange();
                }}
                    value="この献立の日程を削除"
                />
                <div className="p-12">
                { props.mymenus.map((mymenu) => (
                    <div key={mymenu.id}>
                        <div className="flex flex-row my-5">
                            <h2>
                               {mymenu.title}
                            </h2>
                            <input type="button" onClick={() => {
                                setNewmenu(mymenu);
                                setNewmenutype("mymenu");
                                setConfirm(true);
                            }}
                                value="この献立を選択する"
                            />
                        </div>
                        <img src={ mymenu.photograph }/>
                    </div>
                ))}
                </div>
                <div className="p-12">
                { props.setmenus.map((setmenu) => (
                    <div key={setmenu.id}>
                        <div className="flex flex-row my-5">
                            <h2>
                               {setmenu.title}
                            </h2>
                            <input type="button" onClick={() => {
                                setNewmenu(setmenu);
                                setNewmenutype("setmenu");
                                setConfirm(true);
                                }}
                                value="この献立を選択する"
                            />
                        </div>
                    </div>
                ))}
                </div>
            </div>
            )}else{
            return(
            <div>
                <h1>
                    献立を{newmenu.title}に変更します
                </h1>
                <div>
                {updatealert()}
                </div>
                <input type="button" onClick={() => {
                    {datemodificationmenu()}
                    {datemodificationsetmenu()}
                    setMenuchange();
                    setConfirm(false);
                    }}
                    value="確定"
                />
                <input type="button" onClick={() => {
                    setConfirm(false);
                    }}
                    value="戻る"
                />
            </div>
            )
            }
        }
    }
    
    return(
        <Authenticated auth={props.auth} header={
          <h2 className="font-semibold　text-xl text-gray-900 leading-tight">
            datepost
          </h2> 
        }>
        
        <form onSubmit={handleSendPosts}>
            <div>
                <h1>日割献立表</h1>
                <div className="flex flex-row my-5">
                    <Link href={`/home`}>ホーム</Link>
                    <Link href={`/automenuset`}>自動献立日割</Link>
                </div>
                <div>
                    <input type="hidden" name="_token" value={csrf_token.content}/>
                </div>
                <hr class="h-px my-8 bg-gray-900 border-0 dark:bg-gray-900"></hr>
                <div>
                {changemenuswich()}
                </div>
            </div>
        </form>
        </Authenticated>
    );
}
export default datemenupost;