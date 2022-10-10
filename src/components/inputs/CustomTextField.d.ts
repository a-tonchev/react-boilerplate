export = CustomTextField;

type CustomTextFieldProps = {
    label: string;
    name: string;
    fieldName?: string;
    value: string;
    onChange: ({ name, fieldName, value }: { name: string; fieldName?: string; value: string }) => void;
    error?: string;
    valid?: boolean;
    endText?: string;
    [x: string]: any;
};

/**
 * Custom <TextField> with <FormHelperText> on error
 * @param label Used as key in t(label)
 * @param name Field value
 * @param fieldName Alternative to name, only used in return value for onChange
 * @param value Value for controlled components
 * @param onChange Returns {name, value, fieldName?}
 * @param error If passed, displays <FormHelperText> with t(error)
 * @param valid If passed, applies classes from 'success'
 * @param endText If passed, adds <InputAdornment> with (untranslated) endText
 */
declare function CustomTextField({
    label,
    name,
    fieldName,
    value,
    onChange,
    error,
    valid,
    endText,
    ...rest
}: CustomTextFieldProps): React.ReactElement;
