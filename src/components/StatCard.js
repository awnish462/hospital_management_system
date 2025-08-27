import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const StatCard = ({ icon, title, value, change, isPositive, color }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center transition-transform transform hover:scale-105">
            <div className={`text-3xl p-4 rounded-full border-2 ${color}`}>
                {icon}
            </div>
            <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-500">{title}</h3>
                <p className="text-3xl font-bold text-gray-800">{value}</p>
                <div className={`flex items-center text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {isPositive ? <FaArrowUp className="mr-1"/> : <FaArrowDown className="mr-1"/>}
                    {change}% {isPositive ? 'Increased' : 'Decreased'}
                </div>
            </div>
        </div>
    );
};
export default StatCard;