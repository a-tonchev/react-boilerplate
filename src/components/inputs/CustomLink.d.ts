export = CustomLink;

type CustomLinkProps = {
    button?: boolean;
    buttonProps?: any;
    text: string;
    tooltip?: boolean;
    children?: string | React.ReactElement;
    plain?: boolean;
    className?: string;
    ref?: any;
    [x: string]: any;
};

/**
 * Custom link with many options
 * Automatically selects between React Router Link and MuiLink depending on address passed to 'to' prop
 * @param button boolean, if true will display link as button
 * @param buttonProps if button is true, these props will be passed to the button
 * @param text Text to display
 * @param tooltip Counterintuitively, if tooltip is set to true, link is wrapped in a button
 * @param children Allows for nesting other content inside link apart from text. Unsure how useful this would be.
 * @param plain If true, use <a> or <Link> instead of <MuiLink>
 * @param className Classes to apply to link
 * @param ref React ref to forward
 */
declare function CustomLink({
    button,
    buttonProps = {},
    text,
    tooltip,
    children,
    plain,
    className = '',
    ref,
    ...rest
}: CustomLinkProps): React.ReactElement;
