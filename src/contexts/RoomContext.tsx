import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RoomContextType {
    roomId: number | null;
    setRoomId: (id: number) => void;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const RoomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [roomId, setRoomId] = useState<number | null>(null);

    return (
        <RoomContext.Provider value={{ roomId, setRoomId }}>
            {children}
        </RoomContext.Provider>
    );
};

export const useRoom = () => {
    const context = useContext(RoomContext);
    if (!context) {
        throw new Error('useRoom must be used within a RoomProvider');
    }
    return context;
};