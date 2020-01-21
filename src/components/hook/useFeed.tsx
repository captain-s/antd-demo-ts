import { useState, useEffect } from 'react';
import { zhLastFeedApi, Feed } from './api/api';

export default function useFeed() {
    const [feed, setFeed] = useState<Feed>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!loading) {
            return;
        }
        zhLastFeedApi().then(res => {
            setLoading(false);
            setFeed(res);
        })
    }, [loading]);

    return {feed, setLoading, loading};
}