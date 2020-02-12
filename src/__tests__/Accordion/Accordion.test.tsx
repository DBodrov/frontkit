import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Accordion, AccordionLineType } from '../../components/Accordion';

const data: React.ComponentProps<typeof Accordion.Details>['data'] = [
    {
        type: AccordionLineType.Header,
        value: 'header',
    },
    {
        type: AccordionLineType.Bold,
        name: 'boldTitle',
        value: 'boldValue',
    },
    { type: AccordionLineType.BigMargin },
    {
        type: AccordionLineType.Regular,
        name: 'title',
        value: 'value',
    },
];

const dataWithTestId: React.ComponentProps<typeof Accordion.Details>['data'] = [
    {
        type: AccordionLineType.Header,
        value: 'header',
        dataTestId: 'header',
    },
    {
        type: AccordionLineType.Bold,
        name: 'boldTitle',
        value: 'boldValue',
        dataTestId: 'bold',
    },
    { type: AccordionLineType.BigMargin },
    {
        type: AccordionLineType.Regular,
        name: 'title',
        value: 'value',
        dataTestId: 'regular',
    },
];

describe('<Accordion.Link />', () => {
    const testId = 'Accoooooooooooordion';

    test('should link rendered', () => {
        const { getByTestId } = render(<Accordion.Link id="test" dataTestId={testId} />);
        expect(() => getByTestId(testId)).not.toThrow();
    });
    test('should link have default dataTestId', () => {
        const { getByTestId } = render(<Accordion.Link id="test" />);
        expect(() => getByTestId('AccordionLink')).not.toThrow();
        expect(() => getByTestId('AccordionLink-text')).not.toThrow();
        expect(() => getByTestId('AccordionLink-arrow-up')).not.toThrow();

        fireEvent.click(getByTestId('AccordionLink'));
        expect(() => getByTestId('AccordionLink-arrow-down')).not.toThrow();
    });
});

describe('<Accordion.Details />', () => {
    const testId = 'Accoooooooooooordion';

    test('should not rendered while closed', () => {
        const { getByTestId } = render(
            <>
                <Accordion.Link id="test" />
                <Accordion.Details id="test" data={data} dataTestId={testId} />
            </>,
        );

        expect(() => getByTestId(testId)).toThrow();
        fireEvent.click(getByTestId('AccordionLink'));
        expect(() => getByTestId(testId)).not.toThrow();
        fireEvent.click(getByTestId('AccordionLink'));
        expect(() => getByTestId(testId)).toThrow();
    });

    test('should details have default dataTestId', () => {
        const { getAllByTestId, getByTestId } = render(
            <>
                <Accordion.Link id="test" />
                <Accordion.Details id="test" data={data} />
            </>,
        );

        fireEvent.click(getByTestId('AccordionLink'));
        expect(() => getByTestId('AccordionDetails')).not.toThrow();
        expect(() => getByTestId('AccordionDetails-header')).not.toThrow();
        expect(() => getAllByTestId('AccordionDetails-name')).not.toThrow();
        expect(() => getAllByTestId('AccordionDetails-value')).not.toThrow();
    });

    test('should details render local dataTestId', () => {
        const { getByTestId } = render(
            <>
                <Accordion.Link id="test" />
                <Accordion.Details id="test" data={dataWithTestId} dataTestId={testId} />
            </>,
        );

        fireEvent.click(getByTestId('AccordionLink'));
        expect(() => getByTestId(testId)).not.toThrow();
        expect(() => getByTestId('header' + testId + '-header')).not.toThrow();
        expect(() => getByTestId('bold' + testId + '-name')).not.toThrow();
        expect(() => getByTestId('bold' + testId + '-value')).not.toThrow();
        expect(() => getByTestId('regular' + testId + '-name')).not.toThrow();
        expect(() => getByTestId('regular' + testId + '-value')).not.toThrow();
    });

    test('align=right', () => {
        const { getByTestId } = render(
            <>
                <Accordion.Link id="test" />
                <Accordion.Details id="test" align="right" data={dataWithTestId} dataTestId={testId} />
            </>,
        );

        fireEvent.click(getByTestId('AccordionLink'));
        expect(() => getByTestId(testId)).not.toThrow();
        expect(getByTestId(testId).className).toContain('right');
    });
});
