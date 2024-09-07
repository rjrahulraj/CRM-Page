import { useEffect, useState } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement, BarController } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement, BarController);

const WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAY = ['10AM', '12AM', '2PM', '4PM', '6PM'];
const MONTH = ['3 AUG', '6 AUG', '9 AUG', '12 AUG', '15 AUG', '18 AUG', '21 AUG', '24 AUG', '27 AUG'];

const StatsPage = () => {
  const [timeFilter, setTimeFilter] = useState('week');
  const [user, setUser] = useState([]);

  const fetchUser = async () => {
    let res = await fetch('https://jsonplaceholder.typicode.com/users');
    let data = await res.json();
    setUser(data);
  };

  function filter1() {
    if (timeFilter === 'week') return WEEK;
    else if (timeFilter === 'month') return MONTH;
    else return DAY;
  }

  function filter2() {
    if (timeFilter === 'week') {
      let data = [];
      for (let i = 0; i < 7; i++) {
        data.push(Math.floor(Math.random() * (220 - 50 + 1)) + 50);
      }
      return data;
    } else if (timeFilter === 'month') {
      let data = [];
      for (let i = 0; i < 9; i++) {
        data.push(Math.floor(Math.random() * (220 - 50 + 1)) + 50);
      }
      return data;
    } else {
      let data = [];
      for (let i = 0; i < 5; i++) {
        data.push(Math.floor(Math.random() * (220 - 50 + 1)) + 50);
      }
      return data;
    }
  }

  function getRandomHexColor() {
    const randomColor = Math.floor(Math.random() * 0xFFFFFF).toString(16);
    return `#${randomColor.padStart(6, '0')}`;
  }

  function filter3() {
    if (timeFilter === 'week') {
      let data = [];
      for (let i = 0; i < 7; i++) {
        data.push(getRandomHexColor());
      }
      return data;
    } else if (timeFilter === 'month') {
      let data = [];
      for (let i = 0; i < 9; i++) {
        data.push(getRandomHexColor());
      }
      return data;
    } else {
      let data = [];
      for (let i = 0; i < 5; i++) {
        data.push(getRandomHexColor());
      }
      return data;
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const lineData = {
    labels: filter1(),
    datasets: [
      {
        label: 'Sales',
        data: filter2(),
        fill: false,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const pieData = {
    labels: filter1(),
    datasets: [
      {
        data: filter2(),
        backgroundColor: filter3(),
      },
    ],
  };

  const barData = {
    labels: filter1(),
    datasets: [
      {
        label: 'Sales',
        data: filter2(),
        backgroundColor: filter3(),
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 1,
      },
    ],
  };

  const handleTimeFilterChange = (e) => {
    setTimeFilter(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center bg-white p-4 shadow-md mb-6">
        <div className="flex gap-5">
          <h1 className="text-xl font-bold">CRM Dashboard</h1>
        </div>
        <select
          className="font-xl p-2 border rounded-md"
          value={timeFilter}
          onChange={handleTimeFilterChange}
        >
          <option value="day">1 Day</option>
          <option value="week">1 Week</option>
          <option value="month">1 Month</option>
        </select>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Cards */}
        <StatCard title="Total Users" value="10,000" />
        <StatCard title="New Users" value={Math.floor(Math.random() * 150)} />
        <StatCard title="Active Users" value={Math.floor(Math.random() * 50)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Line Chart */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Sales Over Time (Line Chart)</h2>
          <Line data={lineData} />
        </div>


         {/* Bar Chart */}
         <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Sales Over Time (Bar Chart)</h2>
          <Bar data={barData} />
        </div>


        {/* Pie Chart */}
        <div className="bg-white p-4  shadow-md rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Sales Distribution (Pie Chart)</h2>
          <Pie data={pieData} />
        </div>
        
       
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white shadow-md rounded-lg p-4">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-2xl mt-2">{value}</p>
  </div>
);

export default StatsPage;
