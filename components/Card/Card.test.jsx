import { render, screen } from '../../test-utils';
import Card from './Card';
// funding, news, events, contentUpdates
jest.mock('next/router', () => require('next-router-mock'));

it('should render children passed to it', () => {
    render(<Card>Testing This Card</Card>);
    const body = screen.getByText('Testing This Card');

    expect(body).toBeDefined();
});

it('should render a title passed to it', () => {
    render(<Card title="Testing This Card">There is something here</Card>);
    const title = screen.getByText('Testing This Card');

    expect(title).toBeDefined();
});

it('should render a subtitle passed to it', () => {
    render(
        <Card title="Testing This Card" subtitle="This is a subtitle">
            There is something here
        </Card>
    );
    const subtitle = screen.getByText('This is a subtitle');

    expect(subtitle).toBeDefined();
});

it('should render a subtitle passed to it', () => {
    render(
        <Card title="Testing This Card" subtitle="This is a subtitle">
            There is something here
        </Card>
    );
    const text = screen.getByText('This is a subtitle');

    expect(text).toBeDefined();
});
