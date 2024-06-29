import React, { useState } from "react";
import DummyImage from './../../assets/dummy-image.webp';
import useImageStore from './../../store/store.js';

const TextToImage = () => {
    const [text, setText] = useState("");
    const [imageURL, setImageURL] = useState(null);
    const [loading, setLoading] = useState(false);

    const { setDisplayImage } = useImageStore(
        (state) => ({ 
            setDisplayImage: state.setDisplayImage 
        })
    );

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const generateImage = async () => {
        setLoading(true);

        const apiPath = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image";
        const apiKey = "sk-7XJ8GMCEwvBkh3r9nVBTSFL4mspNBH1Ok39lprKsiBvDK2gq";

        const requestOptions = {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                steps: 40,
                width: 1024,
                height: 1024,
                seed: 0,
                cfg_scale: 5,
                samples: 1,
                text_prompts: [
                    {
                        text: text,
                        weight: 1,
                    },
                ],
            }),
        };

        try {
            const response = await fetch(apiPath, requestOptions);
            if (!response.ok) {
                throw new Error('Failed to generate image');
            }
            const data = await response.json();
            const generatedImageURL = `data:image/png;base64,${data.artifacts[0].base64}`;
            setImageURL(generatedImageURL);
        } catch (error) {
            console.error("Error generating image:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async () => {
        if (imageURL) {
            try {
                const formData = new FormData();
                formData.append('image', imageURL);

                const res = await fetch('https://pic-square-backend-6k6ybz7b5-maheeps-projects.vercel.app/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!res.ok) {
                    throw new Error('Failed to upload image to Cloudinary');
                }

                const data = await res.json();
                console.log(data.data.url);
                setDisplayImage(data.data.url);
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };

    return (
        <div className="container p-6 relative">
            <div className="w-full mx-auto">
                <div className="mt-2 p-4 rounded-b">
                    <div className="w-full px-6">
                        <input
                            type="text"
                            placeholder="An Abstract painting of a woman using Acrylic colours."
                            className="w-full p-2 border border-gray-300 rounded-md outline-none"
                            value={text}
                            onChange={handleTextChange}
                        />
                        <div className="w-full flex justify-end">
                            <button
                                className="mt-4 p-2 bg-indigo-600 font-semibold text-white rounded-md"
                                onClick={generateImage}
                                disabled={loading}
                            >
                                {loading ? "Generating..." : "Generate Image"}
                            </button>
                        </div>
                        {loading &&
                            <div className="mt-2 flex justify-center">
                                <div className="w-6 h-6 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
                            </div>
                        }
                        {imageURL ? (
                            <div className="mt-4">
                                <img src={imageURL} alt="Generated" className="w-1/3 mx-auto rounded-md" />
                                <div className="w-full flex justify-end">
                                    <button
                                        className="mt-2 p-2 bg-indigo-600 font-semibold text-white rounded-md"
                                        onClick={handleUpload}
                                    >
                                        Upload Image as Art
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="mt-4">
                                <img
                                    src={DummyImage}
                                    alt="dummyimage"
                                    className="w-1/3 mx-auto rounded-md"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TextToImage;
