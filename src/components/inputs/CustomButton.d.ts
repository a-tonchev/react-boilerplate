export = CustomButton;

/**
 * Custom Button wrapping MUI Button
 * @param text Text used for aria-label, not displayed on screen
 * @param buttonTheme primary or green
 * @param fullMobile boolean, full width on small screens?
 * @param color button color, overwritten by buttonTheme
 */
declare function CustomButton({
    children,
    text,
    buttonTheme,
    fullMobile,
    color = 'primary',
    ...rest
}: {
    children: string | React.ReactElement;
    text?: string;
    buttonTheme?: string;
    fullMobile?: boolean;
    color?: string;
    [x: string]: any;
}): React.ReactElement;
