import { format } from 'date-fns';

let today = new Date();
export const weekAgo = format(today.setDate(today.getDate() - 7), 'yyyy-MM-dd');
today = new Date();
export const monthAgo = format(today.setMonth(today.getMonth() - 1), 'yyyy-MM-dd');
today = new Date();

export const menuItems = [
    {
        label: 'Hub Content',
        value: 'HubContent',
    },
    {
        label: 'Harmonization Outcomes',
        value: 'Harmonization',
    },
    {
        label: 'Submission Activities',
        value: 'SubmissionActivities?&aggBy=center&time=LastWeek',
    },
    {
        label: 'User Population',
        value: 'UserPopulation?&aggBy=type&time=LastWeek',
    },
    {
        label: 'User Activities',
        value: `UserActivities?startDate=${monthAgo}&endDate=${format(today, 'yyyy-MM-dd')}`,
    },
];

export const timeDropdownOptions = [
    { label: 'All Time', value: 'AllTime' },
    {
        label: 'Last Week',
        value: 'LastWeek',
    },
    {
        label: 'Last Month',
        value: 'LastMonth',
    },
    {
        label: 'Custom',
        value: 'Custom',
    },
];
