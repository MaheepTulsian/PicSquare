import React, { useState } from "react";
import CreateForm from './CreateForm';
import CreateAI from './CreateAI';

const Create = () => {
    const [activeTab, setActiveTab] = useState('tab1');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="container p-6 relative">
            <div className="w-full mx-auto">
                <div className="flex border border-gray-200 rounded-full bg-gray-800 sticky top-6">
                    <button
                        className={`${activeTab === 'tab1'
                                ? 'w-1/2 bg-black'
                                : 'w-1/2 hover:bg-gray-900'
                            } py-2 px-4 font-semibold text-white rounded-s-full focus:outline-none`}
                        onClick={() => handleTabChange('tab1')}
                    >
                        Upload your Art's Image
                    </button>
                    <button
                        className={`${activeTab === 'tab2'
                                ? 'w-1/2 bg-black'
                                : 'w-1/2 hover:bg-gray-900'
                            } py-2 px-4 font-semibold text-white rounded-e-full focus:outline-none`}
                        onClick={() => handleTabChange('tab2')}
                    >
                        Use AI to generate Image
                    </button>
                </div>
                <div className="mt-2 p-4 rounded-b">
                    {activeTab === 'tab1' ? <CreateForm /> : <CreateAI />}
                </div>
            </div>
        </div>
    );
};

export default Create;
