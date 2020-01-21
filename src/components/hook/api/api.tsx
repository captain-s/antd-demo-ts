import { ajax } from '@/libs/axios';

interface Story {
    id?: number,
    ga_prefix?: string,
    hint?: string,
    image_hue?: string,
    title?: string,
    type?: number,
    url?: string,
    images?: string[]
    image?: string
}

export interface Feed {
    data: string,
    stories: Story[],
    top_stories: Story[]
}

export function zhLastFeedApi(): Promise<Feed> {
    return ajax.get('/api/4/news/latest').then(res => {
        return res.data;
    })
}