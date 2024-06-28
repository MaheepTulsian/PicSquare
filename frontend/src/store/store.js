// store.js
import { create } from 'zustand';


const useImageStore = create((set) => ({
    // default image as a img url
    displayImage: "https://tinyurl.com/u9649zju",
    setDisplayImage: (img) => set({ displayImage: img }),
}));

export default useImageStore;