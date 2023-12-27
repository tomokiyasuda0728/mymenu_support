import React from "react";
import { useState } from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, useForm } from '@inertiajs/react';


const Automenuset = (props) => {
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]');
    
    const {data, setData, post} = useForm({
        datemymenu:[],
        user_id:props.auth.user.id,
    });
    
    const handleSendPosts = (e) => {
        e.preventDefault();
        post("/automenustore");
    };
    
    const [startdate, setStartdata] = useState();
    const [enddate, setEnddata] = useState();
    const [genrematch, setGenrematch] = useState(false);
    const [menuspace, setMenuspace] = useState(30);
    const [exchange, setExchange] = useState(true);
    const [menuchange, setMenuchange] = useState(true);
    const [genrealert, setGenrealert] = useState(false);
    const [confirm, setConfirm] = useState(false);
    
    const startdatenum = new Date(startdate);
    const enddatenum = new Date(enddate);
    
    const datenum =  (enddatenum) - (startdatenum);
    const datenumday = parseInt(datenum / 1000 / 60 / 60 / 24, 10);
    
    
    
    const passmenu = [];
    const datemymenupush = [];
    let genretype = "";
    let genredish = "";
    let genremainfood = "";
    const bandate = new Date(2022, 1 - 1, 1);
  
    const datepush = () =>{
        if(!confirm){
            props.mymenus.forEach(function($mymenu){
                datemymenupush.push({
                    menutype:"mymenu",
                    id:$mymenu.id,
                    title:$mymenu.title,
                    photograph:$mymenu.photograph,
                    typeid:$mymenu.type_id,
                    dishid:$mymenu.dish_id,
                    mainfoodid:$mymenu.mainfood_id,
                    way_of_making:$mymenu.way_of_making,
                    comment:$mymenu.comment,
                    date:$mymenu.dates,
                    stoper:"",
                });
            });
            props.setmenus.forEach(function($setmenu){
                datemymenupush.push({
                    menutype:"setmenu",
                    id:$setmenu.id,
                    title:$setmenu.title,
                    photograph:"",
                    typeid:"",
                    dishid:"",
                    mainfoodid:"",
                    way_of_making:"",
                    comment:"",
                    date:$setmenu.dates,
                    stoper:"",
                });
            });
        }
    };
    
    const diffcheck = (menudate,passcount) =>{
        console.log(passcount);
        if(menudate != null){
                let datediffcheck = (new Date(passcount).getTime())-(new Date(menudate).getTime());
                return(datediffcheck);
            }else{
                let datediffcheck = (new Date(passcount).getTime());
                return(datediffcheck);
            }
    };
    
    const choicemenu = () =>{
        let randomindextest;
        let count = 0;
        if (genrematch){
            for(let i=0; i<=datemymenupush.length; i++){
                randomindextest = Math.floor(Math.random() * datemymenupush.length);
                let menutest = datemymenupush[randomindextest];
                if(genrealert != false
                ||menutest.typeid != genretype 
                && menutest.dishid != genredish 
                && menutest.mainfoodid != genremainfood){
                    break;
                }else if(count<10){
                    count = count+1;
                }else{
                    setGenrealert(true);
                    break;
                }
            }
        }else{
            randomindextest = Math.floor(Math.random() * datemymenupush.length);
        }
        return randomindextest;
    };
    
    const randdate = (passdatelist, index) =>{
        for(let i=0; i<datemymenupush.length; i++){
            let passcount = passdatelist[index];
            let randomindex = choicemenu();
            let menu = datemymenupush[randomindex];
            let datediff = diffcheck(menu.date, passcount);
            let datediffnum = parseInt(datediff / 1000 / 60 / 60 / 24, 10);
            if(menuspace < datediffnum && menu.date != bandate && menu.stoper != true){
                passmenu.push({
                    menutype:menu.menutype,
                    id:menu.id,
                    title:menu.title,
                    photograph:menu.photograph,
                    typeid:menu.typeid,
                    dishid:menu.dishid,
                    mainfoodid:menu.mainfoodid,
                    way_of_making:menu.way_of_making,
                    comment:menu.comment,
                    date:new Date(passdatelist[index]),
                });
                menu.stoper = true;
                if(menu.typeid != genretype){
                    genretype = menu.typeid;
                }
                if(menu.dishid != genredish){
                    genredish = menu.dishid;
                }
                if(menu.mainfoodid != genremainfood){
                    genremainfood = menu.mainfoodid;
                }
                break;
            }else{
                datemymenupush.splice(randomindex, 1);
            }
        }
    };
    
    const datesetting = () =>{
        if(!confirm){
            let passdatelist = [startdatenum];
             for(let i=0; i<=datenumday; i++){
                 if(i!=0){
                    passdatelist.push(startdatenum.setDate(startdatenum.getDate() + 1));
                 }
                randdate(passdatelist, i); 
             }
            
            if(menuchange){
                {setMenuchange(false)}
            }
        }
    };
    
    const genrefailed = () =>{
        if(genrealert){
            return(
                <h2>ジャンルに偏りがあるため被りを回避できませんでした</h2>
            );
        }
    };
    
    const confirmswitch = () =>{
    if(!confirm){    
        return(
        
            <div className="flex flex-row my-5">
            <input type="button" onClick={() => {
                {startdatenum.setDate(startdatenum.getDate() - datenumday)}
                {datemymenupush.splice(0, datemymenupush.length)}
                {passmenu.splice(0, passmenu.length)}
                setGenrealert(false);
                setMenuchange(true);//再レンダリングするため
                }}
                value="献立を作り直す"
                className="p-1 bg-purple-300 hover:bg-purple-400 rounded-md"
            />
            <input type="button" onClick={() => {
                setConfirm(true);
                setGenrealert(false);
                setData("datemymenu", passmenu);
                }}
                value="献立を確定する"
                className="p-1 bg-purple-300 hover:bg-purple-400 rounded-md"
            />
            </div>
    )}else{
        return(
            <div>
                <div>
                <button type="submit" 
                className="p-1 bg-purple-300 hover:bg-purple-400 rounded-md">
                保存</button>
                </div>
                <div>
                <Link href={`/automenuset`}>戻る</Link>
                </div>
            </div>
    )}
    };
    
    const switchsetting = () =>{
    if(exchange){
        return(
        <div>
            <div className="flex flex-row my-5">
                <h2>期間</h2>
                <input type="date" className="start" onChange={(e) => setStartdata(e.target.value)}/>
                <p>から</p>
                <input type="date" className="end" onChange={(e) => setEnddata(e.target.value)}/>
            </div>
            <div className="flex flex-row my-5">
                <h2>ジャンル被り</h2>
                <input id="match1" type="radio" name="contact" value="true" onChange={() =>setGenrematch(true)}/>
                <label for="match1">あり</label>
                <input id="match2" type="radio" name="contact" value="false" onChange={() =>setGenrematch(false)}/>
                <label for="match2">なし</label>
            </div>
            <div>
                <h2>同じ献立の期間をあける</h2>
                <input type="number" value={menuspace} onChange={(e) => setMenuspace(e.target.value)}/>
            </div>
            <button onClick={() => setExchange(false)} className="p-1 bg-purple-300 hover:bg-purple-400 rounded-md">
            献立を作成する
            </button>
        </div>
        );
    }else{
        return(
        <form onSubmit={handleSendPosts}>
            <div>
            {datepush()}
            {datesetting()}
            {console.log(data)}
                <div>
                    <input type="hidden" name="_token" value={csrf_token.content}/>
                </div>
                <div>
                {genrefailed()}
                </div>
                <div>
                {confirmswitch()}
                </div>
                <div>
                { passmenu.map((passmenuone, index) => (
                    <div key={passmenuone.date}>
                        <h2>
                            {(passmenuone.date.toLocaleDateString())}
                        </h2>
                        <h1 className="box-border h-30 w-100 p-4 border-2 border-gray-900">
                            {passmenuone.title}
                        </h1>
                    </div>
                    ))}
                </div>
            </div>
        </form>
        );
    }
    };
    
    return(
        <Authenticated auth={props.auth} header={
          <h2 className="font-semibold　text-xl text-gray-900 leading-tight">
            autodetail
          </h2> 
        }>
            <div className="p-12">
                <h1>自動献立登録</h1>
                <div className="flex flex-row my-5">
                    <Link href={`/home`}>ホーム</Link>
                    <Link href={`/datemenupost`}>日割献立表</Link>
                </div>
            </div>
            <div>
              {switchsetting()}  
            </div>
            
        </Authenticated>
        );
};
export default Automenuset;