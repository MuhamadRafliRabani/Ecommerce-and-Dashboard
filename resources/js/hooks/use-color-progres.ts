import { useEffect, useState } from 'react';

type colorProgres = '#ffffff' | '#000000';

export const useColorProgres = () => {
    const [color, setColor] = useState<colorProgres>();

    useEffect(() => {
        localStorage.setItem('color', color || '#ffffff');
    }, [color, setColor]);

    return { color, setColor };
};
