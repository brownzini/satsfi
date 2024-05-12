import React from 'react';

interface Props {
    audio_name: string;
    handleSetAudioName: (fileName:string) => void;
    setControlAudio: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AudioUploader({ 
    audio_name, 
    handleSetAudioName,
    setControlAudio, 
}:Props) {
    
    const handleFileChange = (event:any) => {
        const file = event.target.files[0];

        if (!file) {
            return;
        }

        handleSetAudioName(file.name);
        setControlAudio(false);
    };

    return (
        <div>
            {(audio_name === '') && <input 
                                       type="file" 
                                       accept="audio/*" 
                                       onChange={handleFileChange}
                                    />  
            }
        </div>
    );
}
