import { useState, useEffect } from 'react';

export default function useTestHook(value) {
    const [data, setData] = useState(value);

    return data;
}
