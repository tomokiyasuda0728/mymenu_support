import React from "react";
import { useState } from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from '@inertiajs/react'
import { getDate, getMonth, getYear } from 'date-fns'


function Autodetail(props){
    const { mymenus } = props;
    const [startdate, setStartdata] = useState();
    const [enddate, setEnddata] = useState();
    const [genrematch, setGenrematch] = useState(false);
    const [menuspace, setMenuspace] = useState(30);
    
    const selectdate ={
        
        
    }
    
    
    const datenum =  (enddate) - (startdate);
    
    
    return(
        <Authenticated auth={props.auth} header={
          <h2 className="font-semibold　text-xl text-gray-900 leading-tight">
            autodetail
          </h2> 
        }>
            <div className="p-12">
                <h1>献立登録</h1>
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
                    <input type="number" value="30" onChange={(e) => setMenuspace(e.target.value)}/>
                </div>
            </div>
            
            <button className="p-1 bg-purple-300 hover:bg-purple-400 rounded-md">
                献立を作成する
            </button>
            
            {console.log(startdate)}
            {console.log(enddate)}
            {console.log(genrematch)}
            {console.log(menuspace)}
            {console.log(enddateyear)}
            {console.log(enddatemonth)}
            {console.log(enddatedate)}
            
        </Authenticated>
        );
}
export default Autodetail;