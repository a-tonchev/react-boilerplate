import { Button, FormLabel, Input } from '@mui/material';
import { useState, memo, useCallback } from 'react';
import useClasses from '../layout/hooks/useClasses';
import CustomButton from '../inputs/CustomButton';

const styles = {
    form: {
        border: 'solid 1px black',
        padding: '1rem',
    },
};

export default function useMultistepForm(steps) {
    const [stepIndex, setStepIndex] = useState(0);
    const [allFormValues, setAllFormValues] = useState({});
    const classes = useClasses(styles);

    function handleNextStep() {
        if (stepIndex === steps.length - 1) {
            // final step, submit
            handleSubmit();
        } else {
            setStepIndex(prev => prev + 1);
        }
    }

    function handlePrevStep() {
        if (stepIndex > 0) {
            setStepIndex(prev => prev - 1);
        }
    }

    function handleSubmit() {}

    function handleUpdateValue(event) {
        setAllFormValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }));
    }

    const FormStepPage = (
        <form onSubmit={e => e.preventDefault()}>
            <h2>{steps[stepIndex].title}</h2>
            <FormStepInputs
                inputs={steps[stepIndex].inputs}
                allFormValues={allFormValues}
                setAllFormValues={setAllFormValues}
            />
            <CustomButton onClick={handlePrevStep} disabled={!(stepIndex > 0)}>
                Previous
            </CustomButton>
            <CustomButton onClick={handleNextStep}>Next</CustomButton>
        </form>
    );

    return { stepIndex, FormStepPage, allFormValues };
}

function FormStepInputs({ inputs, allFormValues, setAllFormValues }) {
    function handleUpdateValue(event) {
        setAllFormValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    }

    return (
        <>
            {inputs.map(input => (
                <FormLabel key={input.name}>
                    {input.label}
                    <Input {...input} value={allFormValues[input.name] || ''} onChange={handleUpdateValue} />
                </FormLabel>
            ))}
        </>
    );
}
