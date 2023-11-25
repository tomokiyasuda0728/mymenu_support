import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Fragment, useState} from 'react';
import ReactDOM from 'react-dom';

function Home(props){
    const [year, setYear] = useState(new Date().getFullYear())
    const [month, setMonth] = useState(new Date().getMonth()+1)
    const last = new Date(year,month,0).getDate()
    const prevlast = new Date(year,month-1,0).getDate()
    const calendar = createCalendar(year, month)
    
    const onClick = n => () =>{
        const nextMonth = month + n
        if (12 < nextMonth){
            setMonth(1)
            setYear(year + 1)
        }else if(nextMonth < 1){
            setMonth(12)
            setYear(year - 1)
        }else{
            setMonth(nextMonth)
        }
    }




    return(
        <Authenticated auth={props.auth} header={
          <h2 className="font-semibold　text-xl text-gray-900 leading-tight">
            home
          </h2> 
        }>
        <div className="p-12">
        <h1>MY 献立サポート</h1>
        <div>
        <hr class="h-px my-8 bg-gray-900 border-0 dark:bg-gray-900"></hr>
        <div className="flex flex-row justify-center space-x-10 box-border h-30 w-100 p-4 border-2 border-gray-900" >
            <div>自動献立表</div>
            <div></div>
            <div>献立一覧</div>
        </div>
        </div>
        </div>
         <Fragment>
            <div className="box-border h-5 w-80 p-7 border-2 border-gray-900">
                <h2>{`${year}年${month}月`}</h2>
                <div className="flex flex-row my-5">
                    <button onClick={onClick(-1)} className="box-border h-5 w-80 p-7 border-2 border-gray-900">先月</button>
                    <button onClick={onClick(1)} className="box-border h-3 w-80 p-7 border-2 border-gray-900">今月</button>
                </div>
            </div>
            <table className="items-center my-20 box-border h-50 w-300 p-4 border-2 border-gray-900">
                <thead>
                    <tr>
                        <th>日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th>土</th>
                    </tr>
                </thead>
                <tbody>
                    {calendar.map((week,i) => (
                        <tr key={week.join('')}>
                            {week.map((day,j) => (
                                <td key={`${i}${j}`} id={day} >
                                    <div>
                                        <div className="text-center box-border h-5 w-100 p-4 border-gray-900">
                                            {day > last ? null : day <= 0 ? null : day}
                                        </div>
                                        <div className="text-center box-border h-5 w-100 p-4 border-gray-900">
                                        </div>
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
        
        <div>
            <h2>お知らせ</h2>
            <div className ="box-border h-50 w-100 p-4 border-2 border-gray-900">
                <div className="information-area">
                </div>            
            </div>
        </div>
        
        </Authenticated>
        );
}

function createCalendar(year,month){
    const first = new Date(year,month - 1,1).getDay()

    return [0,1,2,3,4,5].map((weekIndex) => {
        return [0,1,2,3,4,5,6].map((dayIndex) => {
            const day = dayIndex + 1 + weekIndex * 7
            return day - first 
        })
    })
}


export default Home;