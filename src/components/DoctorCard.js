import { FaUserMd, FaStethoscope } from 'react-icons/fa';
import Button from './Button';

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
      <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
        <FaUserMd className="text-5xl text-blue-500" />
      </div>
      <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
      <div className="flex items-center text-gray-600 my-2">
        <FaStethoscope className="mr-2 text-blue-500" />
        <span>{doctor.specialization}</span>
      </div>
      {/* Safely check if availability exists before trying to join it */}
      {doctor.availability && doctor.availability.length > 0 && (
          <p className="text-gray-500 text-sm mb-4">
            Available: {doctor.availability.join(', ')}
          </p>
      )}
      <Button onClick={() => alert(`Viewing schedule for ${doctor.name}`)}>
        View Schedule
      </Button>
    </div>
  );
};

export default DoctorCard;