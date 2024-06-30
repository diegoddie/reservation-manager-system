import { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface CreateUserModalProps {
  onClose: () => void;
}

export default function CreateUserModal({ onClose }: CreateUserModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
        setIsLoading(true);
        const response = await axios.post('/api/users', { name, email });
        if (response.status === 201) {
            setIsLoading(false)
            onClose();
            toast.success('User created successfully!');
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Failed to create user';
        toast.error(errorMessage);
        setError(errorMessage)
        console.error('Failed to create user', error);
        setIsLoading(false)
    }
  };

  return (
    <>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-2">
            <div className="relative bg-white p-8 rounded-lg shadow-lg w-full md:w-1/2">
                <button 
                    className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                    onClick={onClose}
                >
                    <X size={28} />
                </button>
                <h2 className="text-3xl font-bold mb-4">Create User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder='e.g. John'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input w-full bg-gray-100"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder='e.g. john@doe.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input w-full bg-gray-100"
                            required
                        />
                    </div>
                    {isLoading ? (
                        <div className='flex justify-center'>
                            <span className="loading loading-spinner loading-xl"></span>
                        </div> 
                        ) : (
                            <div className="flex justify-end">
                                <button type="button" className="btn bg-gray-100 hover:bg-gray-300 mr-2 text-black" onClick={onClose}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn bg-purple-500 hover:bg-purple-700 text-white">
                                    Create
                                </button>
                            </div>
                        )
                    }
                    {error && <div className="text-red-500 mt-4 flex justify-end">{error}</div>}
                </form>
            </div>
        </div>
    </>
  );
}
