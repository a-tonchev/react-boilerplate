export = CustomRadio;

type CustomRadioProps = {
    label: string;
    name: string;
    onChange: ({ name, value }: { name: string; value: boolean }) => any;
    error: string;
    checked: boolean;
    [x: string]: any;
};

/**
 * Custom radio input, wraps MUI Radio
 * @param label Used for aria-label, also used as key in t(label)
 * @param name Field value name
 * @param checked Value for controlled components
 * @param onChange Returns {name, value}
 * @param error Error text, used as key in t(error)
 */
declare function CustomRadio({ label, name, onChange, error, checked, ...rest }: CustomRadioProps): React.ReactElement;
