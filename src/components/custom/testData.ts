type InputTypes = 'text' | 'email' | 'password' | 'checkbox' | 'radio';

export type FormSteps = {
    title: string;
    inputs: {
        type: InputTypes;
        name: string;
        label: string;
        placeholder?: string;
        required?: boolean;
    }[];
}[];

export const testSteps: FormSteps = [
    {
        title: 'Step One',
        inputs: [
            {
                type: 'text',
                name: 'name',
                label: 'Your Name',
            },
            {
                type: 'text',
                name: 'age',
                label: 'Your Age',
            },
        ],
    },
    {
        title: 'Step Two',
        inputs: [
            {
                type: 'text',
                name: 'email',
                label: 'Your email',
            },
            {
                type: 'text',
                name: 'age',
                label: 'Your Age',
            },
        ],
    },
];
