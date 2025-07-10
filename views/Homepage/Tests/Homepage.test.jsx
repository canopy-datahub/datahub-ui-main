import { getStudyLabel } from '../../../lib/utils/getStudyLabel';
import { fireEvent, render, screen, within } from '../../../test-utils';
import Homepage from '../Homepage';
import { contentUpdatesMock, eventsMock, fundingMock, newsMock, statMock } from './MockData';
import mockRouter from 'next-router-mock';
// funding, news, events, contentUpdates
jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Testing API data population within Homepage', () => {
    it('should render funding events', () => {
        render(<Homepage funding={fundingMock} news={newsMock} events={eventsMock} stats={statMock} contentUpdates={contentUpdatesMock} />);
        const fundingText = screen.getByText(
            'New Notice of Special Interest NOT-OD-23-040 and NOT-OD-23-041 Support Secondary Analysis Using the RADx Data Hub'
        );

        expect(fundingText).toBeDefined();
    });

    it('should render news events', () => {
        render(<Homepage funding={fundingMock} news={newsMock} events={eventsMock} stats={statMock} contentUpdates={contentUpdatesMock} />);
        const newsText = screen.getByText('RADx Data Hub opens doors to all researchers');

        expect(newsText).toBeDefined();
    });

    it('should render events', () => {
        render(<Homepage funding={fundingMock} news={newsMock} events={eventsMock} stats={statMock} contentUpdates={contentUpdatesMock} />);
        const eventText = screen.getByText('RADx Start of Summer Town Hall');

        expect(eventText).toBeDefined();
    });

    it('should render stats', () => {
        render(<Homepage funding={fundingMock} news={newsMock} events={eventsMock} stats={statMock} contentUpdates={contentUpdatesMock} />);
        const statTextRad = screen.getByTestId('Rad-dataFiles');
        const statNumberRad = within(statTextRad).getByText('949 Data Files');
        expect(statNumberRad).toBeDefined();
        const documentTextRad = screen.getByTestId('Rad-documents');
        const documentCheckRad = within(documentTextRad).getByText('108 Documents');
        expect(documentCheckRad).toBeDefined();
        const studyTextRad = screen.getByTestId('Rad-studies');
        const studyCheckRad = within(studyTextRad).getByText('39 Studies');
        expect(studyCheckRad).toBeDefined();

        const statTextUP = screen.getByTestId('UP-dataFiles');
        const statNumberUP = within(statTextUP).getByText('152 Data Files');
        expect(statNumberUP).toBeDefined();
        const documentTextUP = screen.getByTestId('UP-documents');
        const documentCheckUP = within(documentTextUP).getByText('170 Documents');
        expect(documentCheckUP).toBeDefined();
        const studyTextUP = screen.getByTestId('UP-studies');
        const studyCheckUP = within(studyTextUP).getByText('100 Studies');
        expect(studyCheckUP).toBeDefined();

        const statTextTech = screen.getByTestId('Tech-dataFiles');
        const statNumberTech = within(statTextTech).getByText('14 Data Files');
        expect(statNumberTech).toBeDefined();
        const documentTextTech = screen.getByTestId('Tech-documents');
        const documentCheckTech = within(documentTextTech).getByText('17 Documents');
        expect(documentCheckTech).toBeDefined();
        const studyTextTech = screen.getByTestId('Tech-studies');
        const studyCheckTech = within(studyTextTech).getByText('9 Studies');
        expect(studyCheckTech).toBeDefined();

        const studyTextDHT = screen.getByTestId('DHT-studies');
        const studyCheckDHT = within(studyTextDHT).getByText('3 Studies');
        expect(studyCheckDHT).toBeDefined();
    });

    it('should render content updates', () => {
        render(<Homepage funding={fundingMock} news={newsMock} events={eventsMock} stats={statMock} contentUpdates={contentUpdatesMock} />);
        const contentText = screen.getByText('COVID-19 Treatment Cascade Optimization Study');
        expect(contentText).toBeDefined();
    });

    it('should use the correct label for one "study" vs multiple "studies"', () => {
        const studyText = getStudyLabel(1);
        expect(studyText).toBe('Study');
        const studiesText = getStudyLabel(10);
        expect(studiesText).toBe('Studies');
    });

    it('should navigate to study explorer when the user uses the search bar', () => {
        render(<Homepage funding={fundingMock} news={newsMock} events={eventsMock} stats={statMock} contentUpdates={contentUpdatesMock} />);
        fireEvent.click(screen.getByLabelText('Search Button'));
        expect(mockRouter).toMatchObject({
            asPath: '/studyExplorer?page=1&size=50',
            pathname: '/studyExplorer',
            query: { page: '1', size: '50' },
        });
    });
});
