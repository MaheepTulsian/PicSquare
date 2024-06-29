import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaFileDownload } from "react-icons/fa";
import { BiSolidPurchaseTag } from "react-icons/bi";

const ArtDescription = () => {
    const [purchased, setPurchased] = useState(false);

    const handlePurchase = () => {
        //fetch the add to purchase api
        const purchaseArt = async () => {
            try {
                const response = await fetch('https://pic-square-backend-6k6ybz7b5-maheeps-projects.vercel.app//api/addPurchase', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({ art_id: id }),
                });
                if (!response.ok) {
                    if (response.status === 401) {
                        console.log('User not logged in');
                        // window.location.href = '/login';
                        return;
                    } else if (response.status === 402) {
                        setPurchased(true);
                        console.log('art already purchased');
                        return;
                    } else {
                        throw new Error('HTTP error: ' + response.status);
                    }
                }
                setPurchased(true);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        purchaseArt();
    };
    
    useEffect(() => {
        fetchArt();
    }, []);

    const handleDownload = async (url, title) => {
        try {
            // Fetch the image data
            const response = await fetch(url);
            const blob = await response.blob();
    
            // Create a blob object and initiate download
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `${title}.jpg`; // Set the downloaded file name to the title
            document.body.appendChild(link);
            link.click();
    
            // Clean up
            window.URL.revokeObjectURL(blobUrl);
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };
        
    const [art, setArt] = useState([]);
    const { id } = useParams();

    const fetchArt = async () => {
        try {
            const response = await fetch('https://pic-square-backend-6k6ybz7b5-maheeps-projects.vercel.app//api/getUserArt', {
                credentials: 'include'
            });

            if (!response.ok) {
                if (response.status === 401) {
                    console.log('User not logged in');
                    // window.location.href = '/login';
                    return;
                } else {
                    throw new Error('HTTP error: ' + response.status);
                }
            }
            const data = await response.json();
            // console.log(data);
            setArt(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchArt();
    }, []);

    const artDetails = art.find(item => item._id === id);

    if (!artDetails) {
        return <div>Loading...</div>;
    }

    const price = parseFloat(artDetails.price);

    return (
        <div className="w-full h-full flex items-center justify-center flex-col ">
            <div className="max-w-lg">
                <div className='w-64 h-64'>
                    <img className="w-full rounded-lg" src={artDetails.image_url} alt={artDetails.title} />
                </div>
                <div className="p-6">
                    <h2 className="font-bold text-xl mb-2">{artDetails.title}</h2>
                    <div className="flex items-center mb-4">
                        <img className="w-10 h-10 rounded-full mr-4" src={artDetails.author_avatar} alt={artDetails.author_first_name} />
                        <div>
                            <p className="text-white text-base">{artDetails.author_first_name} {artDetails.author_last_name}</p>
                            <p className="text-white text-sm">{artDetails.createdAt}</p>
                        </div>
                    </div>
                    <p className="text-white text-base mb-4">{artDetails.description}</p>
                    <div className="flex justify-between items-center">
                        <p className="text-white text-lg font-semibold">${price}</p>
                        {!purchased ? (
                            <button
                                className="bg-blue-500 hover:bg-blue-700 flex-center text-white font-bold py-2 px-4 rounded"
                                onClick={handlePurchase}
                            >
                                <BiSolidPurchaseTag className="mr-2 mt-1" />
                                Purchase
                            </button>
                        ) : (
                            <button
                                className="bg-green-500 hover:bg-green-700 flex-center text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleDownload(artDetails.image_url, artDetails.title)}
                            >
                                <FaFileDownload className="mr-2" />
                                Download
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtDescription;
