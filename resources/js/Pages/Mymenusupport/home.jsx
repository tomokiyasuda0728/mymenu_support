import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import axios from "axios";
import FullCalendar, { EventInput }  from '@fullcalendar/react';
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import { format } from 'date-fns'
import { Link } from '@inertiajs/react'


function Home(props){
     const { events } = props

    return(
    <div>
        <div className="p-12">
            <h1>MY 献立サポート</h1>
            <div>
                <hr class="h-px my-8 bg-gray-900 border-0 dark:bg-gray-900"></hr>
                <div className="flex flex-row justify-center space-x-10 box-border h-30 w-100 p-4 border-2 border-gray-900" >
                    <Link href={`/automenuset`}>自動献立日割</Link>
                    <Link href={`/datemenupost`}>日割献立表</Link>
                    <Link href={`/post`}>MY献立一覧</Link>
                    <Link href={`/create`}>献立の新規登録</Link>
                    <Link href={`/setmenupost`}>セットメニュー一覧</Link>
                    <Link href={`/setmenuadd`}>セットメニュー作成</Link>
                    <Link href={`/addposts`}>登録食材の追加</Link>
                </div>
            </div>
        </div>
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView= "dayGridMonth"
                headerToolbar={{
                start: "prev,next today",
                center: "title",
                end: "dayGridMonth"}}
                />
        </div>
            <h2>お知らせ</h2>
            <div className ="box-border h-50 w-100 p-4 border-2 border-gray-900">
                <div className="information-area">
                </div>            
            </div>
    </div>
    );
}

export default Home;