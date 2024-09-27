import React from "react";
import news1 from "../assets/news/news1.jpg";
import news2 from "../assets/news/news2.jpeg";
import news3 from "../assets/news/news3.jpeg"
import sc from "../assets/science.png"


const News = () => {
  return (
    <div className="container mx-auto">
  <div className="flex mb-6">
    <img 
      src={sc} 
      alt="ข่าวสาร" 
      className="w-10 h-10 object-cover rounded-full mr-2"
    />
    <h1 className="font-bold text-3xl">ข่าวสาร</h1>
  </div>

  {/* Main Layout */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
    {/* Left column: Big news item */}
    <div className="lg:col-span-2 ">
      <div className="card bg-base-100 shadow-xl transition-transform duration-500 hover:scale-95">
        <figure className="overflow-hidden">
          <img
            src={news1}
            alt="Main News"
            className="w-full h-96 object-cover"
          />
        </figure>
        <div className="p-4">
          <h2 className="text-xl font-bold">
            ขอแสดงความยินดีกับนักศึกษาที่ได้รับรางวัล
          </h2>
          <p>รายละเอียดของข่าวสารในส่วนนี้...</p>
          <div className="mt-4">
            <span>27 ส.ค. 2567 • 47 views</span>
          </div>
        </div>
      </div>
    </div>

    {/* Right column: Smaller news items */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
      <div className="card card-compact bg-base-100 shadow-xl transition-transform duration-500 hover:scale-95">
        <figure className="overflow-hidden">
          <img
            src={news2}
            alt="News Item 2"
            className="w-full h-32 object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">รายชื่อนักศึกษาที่แจ้งสอบซ่อม</h2>
          <p>รายละเอียดของข่าวสารในส่วนนี้...</p>
          <div className="card-actions justify-end">
            <span>07 ส.ค. 2567 • 102 views</span>
          </div>
        </div>
      </div>

      <div className="card card-compact bg-base-100 shadow-xl transition-transform duration-500 hover:scale-95">
        <figure className="overflow-hidden">
          <img
            src={news3}
            alt="News Item 3"
            className="w-full h-32 object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">ตารางสอบกลางภาค ปี 1/2567</h2>
          <p>รายละเอียดของข่าวสารในส่วนนี้...</p>
          <div className="card-actions justify-end">
            <span>31 ก.ค. 2567 • 138 views</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


  );
};

export default News;
