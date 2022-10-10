export = CustomCheckBox;

type CustomCheckBoxProps = {
    label: string;
    name: string;
    value: string;
    onChange: ({ name, value }: { name: string; value: boolean }) => any;
    error?: string;
    fullWidth?: boolean;
    [x: string]: any;
};

/**
 * Custom checkbox with label
 * @param label Used as key in t(label)
 * @param name Field name on input
 * @param value Value of input (for controlled component)
 * @param onChange Returns {name, value}
 * @param error Error text, used as key in t(error)
 * @param fullWidth Boolean, set width to 100% on small screens
 */
declare function CustomCheckBox({ label, name, value, onChange, error, fullWidth, ...rest }: CustomCheckBoxProps);
