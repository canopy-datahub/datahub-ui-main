import Button from '../../../components/Button/Button';
import { ArrowLeftShort, ArrowRightShort, Save2 } from 'react-bootstrap-icons';

export const renderPreviousButton = (activeStep, handlePrevious) => {
    return activeStep === 1
        ? (
            <Button
                label="Previous Page"
                ariaLabel="Previous Page"
                size="medium"
                variant="primary"
                type="submit"
                iconLeft={<ArrowLeftShort />}
                handleClick={handlePrevious}
            />
        )
        : null;
};

export const renderSaveButton = (activeStep, isValidated, handleSave) => {
    return activeStep === 2 && isValidated
        ? (
            <Button
                label="Save"
                ariaLabel="Save validation progress"
                size="medium"
                variant="primary"
                type="submit"
                iconLeft={<Save2 />}
                handleClick={handleSave}
            />
        )
        : null;
};

export const renderNextButton = (activeStep, totalSteps, disabled, handleNextPage) => {
    return activeStep < totalSteps - 1
        ? (
            <Button
                label="Next Page"
                ariaLabel="Next Page"
                size="medium"
                variant="primary"
                type="submit"
                iconRight={<ArrowRightShort />}
                disabled={disabled}
                handleClick={handleNextPage}
            />
        )
        : activeStep === totalSteps - 1
            ? (
                <Button
                    label="Submit"
                    ariaLabel="Submit"
                    size="medium"
                    variant="primary"
                    type="submit"
                    disabled={disabled}
                    handleClick={handleNextPage}
                />
            )
            : null;
};
